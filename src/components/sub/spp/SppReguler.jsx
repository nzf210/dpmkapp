import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import DocSpp_reg from './DocSpp_reg';

//Redux
import { useSelector } from 'react-redux';
import { Button } from '@material-ui/core';
//Redux

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import { render } from 'react-dom';

const SppReguler = () => {

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [gridApi, setGridApi] = useState();
    const [count, setCount] = useState();
    const [page, setPage] = useState(1);
    const [next, setNext] = useState();
    const [prev, setPrev] = useState();
    const [perpage, setPerpage] = useState(5);
    const [search, setSearch] = useState('');
    const [print, setPrint] = useState(false);
    const [viewprint, setViewprint] = useState(false);
    const [dataprint, setDataprint] = useState([]);


    const [columnDefs, setColumnDefs] = useState([
        {
            field: 'kampung', filter: true, minWidth: 150, maxWidth: 150, suppressSizeToFit: true, headerCheckboxSelection: true,
            headerCheckboxSelectionFilteredOnly: true,
            checkboxSelection: true,
        },
        { field: 'distrik', filter: true, width: 150, suppressSizeToFit: true },
        { field: 'thp_advis', headerName: 'Kegiatan', width: 280 },
        { field: 'no_spp', headerName: 'No SP2SPD', width: 150, },
        { field: 'sts_spp', headerName: 'Status SP2SPD', width: 150, },
        { field: 'pagu', width: 110, cellRenderer: (e) => <CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /> },
    ]);


    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true,
        flex: 1,
        minWidth: 100,
    }));

    // Example of consuming Grid Event
    const cellClickedListener = useCallback(event => {
        console.log('cellClicked', event);
    }, []);

    // Example load data from sever
    useEffect(async () => {
        let url = `/anggaran/reg?page=${page}&size=${perpage}&sts_spp=${false}`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        if (search !== '') { url += `&kampung=${search}` }
        await axios.get(url).then((e) => {
            setRowData(e.data.result.data.data);
            setCount(e.data.result.data.count);
            setPage(e.data.result.data.page);
            setPerpage(e.data.result.data.per_page);
            setPrev(e.data.result.pagination.previous_page);
            setNext(e.data.result.pagination.next_page);
            console.log(' pre s', e.data.result, e.data.result.pagination.previous_page, e.data.result.data.next_page)
        })
            .then(e => console.log(e))
    }, [page, perpage]);

    // Example using Grid's API
    const buttonListener = useCallback(e => {
        gridRef.current.api.deselectAll();
    }, []);

    const selectChanged = () => {
        console.log('select Change')
    }

    const btnClick = async (e) => {

        let url = `/anggaran/reg?page=${1}&size=${perpage}&kampung=${search}&sts_spp=${false}`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        // if (search) { url += `&kd_advis=${}` }

        await axios.get(url).then((e) => {
            setRowData(e.data.result.data.data);
            setCount(e.data.result.data.count);
            setPage(e.data.result.data.page);
            setPerpage(e.data.result.data.per_page);
            setPrev(e.data.result.pagination.previous_page);
            setNext(e.data.result.pagination.next_page);
            console.log(' pre', e.data.result.data.previous_page, e.data.result.data.next_page)
        })
    }
    const onSelectionChanged = (e) => {
        let selectedRows = e.api.getSelectedRows();
        let selectedRowsString = '';
        let maxToShow = 5;
        let data = [...selectedRows]
        if (data.length == 0) {
            setPrint(false);
        } else {
            setPrint(true);
            setDataprint(data);
        }
    }
    return (
        <>
            {viewprint ?
                <div className='fixed inset-0 mt-10 w-full bg-red-600 flex '>
                    <div className='flex-none w-14 h-14'></div>
                    <div className='grow'>
                        <div className='bg-red-200 mx-auto justify-center items-center h-screen w-[90%]'>
                            <PDFViewer
                                style={{ width: "100%", height: "100vh", alignItems: 'center', alignSelf: 'center' }}
                            ><DocSpp_reg dataselectspp={dataprint} /></PDFViewer>
                            <span className={`absolute text-red-500 bg-slate-900 rounded-full text-xl cursor-pointer z-20 w-6 m-4 right-20 -top-2 -translate-x-1/2 text-center`}
                                onClick={() => setViewprint(false)}>X</span>

                        </div>
                    </div>
                    <div className='flex-none w-14 h-14'></div>
                </div>
                : null}
            <div>
                <div className="h-20"></div>
                <div className="flex items-center justify-center z-10">
                    <div className="flex border-2 rounded">
                        <input type="text" className="px-1.5 py-0.5 w-64" placeholder="Cari..." onChange={(e) => setSearch(e.target.value)} value={search} />
                        <button className="flex items-center justify-center px-1.5 border-l" onClick={btnClick}>
                            <svg className="w-3 h-3 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                            </svg>
                        </button>
                    </div>
                    {print ? <div>
                        {/* <Button onClick={() => render(<PDFDownloadLink document={<DocSpp_reg dataselectspp={dataprint} />} fileName={`doc_spp_reg_${new Date().toLocaleTimeString().slice(0, 16)}`}></PDFDownloadLink>)} placeholder='Download PDF File' className='placeholder:Download_pdf'><LocalPrintshopIcon /></Button> */}
                        <><PDFDownloadLink document={<DocSpp_reg dataselectspp={dataprint} />} fileName={`doc_spp-reg_${new Date().toLocaleTimeString().slice(0, 16)}`}><LocalPrintshopIcon style={{ marginLeft: 12 }} /></PDFDownloadLink></>
                        <Button onClick={() => setViewprint(true)} placeholder='Preview PDF'><PictureAsPdfIcon /></Button>
                    </div> : null}
                </div>



                <div className='container w-full bg-slate-400 mx-auto -z-40 relative'>
                    <div className='mx-auto inset-0 '>
                        {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                        <div className='mx-auto my-auto'>
                            <div className="ag-theme-alpine items-center mx-auto absolute" style={{ width: '100%', height: 215, }}>
                                <AgGridReact
                                    ref={gridRef} // Ref for accessing Grid's API
                                    rowData={rowData} // Row Data for Rows
                                    columnDefs={columnDefs} // Column Defs for Columns
                                    defaultColDef={defaultColDef} // Default Column Properties
                                    animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                    rowSelection='multiple' // Options - allows click selection of rows
                                    onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                                    gridOptions={{ rowStyle: { padding: 0, }, rowHeight: 22, }}
                                    onGridReady={params => {
                                        params.api.sizeColumnsToFit();
                                        params.api.resetRowHeights();
                                        params.api.setHeaderHeight(30);
                                    }}
                                    onSelectionChanged={onSelectionChanged}
                                />
                                <Pagination
                                    postsPerPage={perpage} totalPosts={count} currentPage={page}
                                    paginateFront={() => { if (next != null) { setPage(parseInt(next)) } }}
                                    paginateBack={() => { if (prev != null) { setPage(parseInt(prev)) } }}
                                    // paginateFront={() => { if (page !== (Math.ceil(count / perpage))) { setPage(page + 1) } }}
                                    // paginateBack={() => { if (page !== 1) { setPage(page - 1) } }}
                                    selectChanged={(e) => { setPerpage(e.target.value) }}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SppReguler

function Pagination({
    postsPerPage, totalPosts, paginateFront, paginateBack, currentPage, selectChanged
}) {


    return (
        <div className='py-2 w-full  flex'>
            <div className='flex-auto'></div>
            <div className='w-[450px] h-6'>
                <div className='flex '>
                    <div className='my-auto mr-2 flex text-center items-center'>
                        <select onChange={(e) => selectChanged(e)} name="reg_sel" id="reg_sel" className='pl-2 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-500'>
                            <option value="5">5</option>
                            <option value="10">10</option>
                            <option value="25">25</option>
                            <option value="50">50</option>
                            <option value="100">100</option>
                            <option value={totalPosts}>All</option>
                        </select>
                    </div>
                    <span onClick={() => { paginateBack(); }}

                        className='relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span>Back</span>
                    </span>
                    <p className='text-sm text-gray-700 pl-2 my-auto'>
                        Halaman
                        {/* <span className='font-medium'>{currentPage * postsPerPage - 10}</span> */}
                        <span className='font-medium px-2'>{currentPage}</span>
                        Dari
                        <span className='font-medium px-2'> {Math.ceil(totalPosts / postsPerPage)} </span>
                        Tot Data
                        <span className='font-medium px-2'> {totalPosts} </span>
                        {/* results */}
                    </p>
                    <span onClick={() => { paginateFront(); }}

                        className='relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50'
                    >
                        <span>Next</span>
                    </span>
                </div>
                {/* <nav className='block'></nav>
                <div>
                    <nav
                        className='relative z-0 inline-flex rounded-md shadow-sm -space-x-px'
                        aria-label='Pagination'
                    >
                    </nav>
                </div> */}
            </div>
        </div>
    );
}