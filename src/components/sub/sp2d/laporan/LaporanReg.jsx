import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import Pagination from '../../../Pagination';
import axios from 'axios';
import { Button, IconButton, Tooltip } from '@mui/material';
import { Loader } from '../../Font';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { green } from '@mui/material/colors';
import CurrencyFormat from 'react-currency-format';

const LaporanSp2dReg = () => {

    const gridRef = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [count, setCount] = useState();
    const [page, setPage] = useState(1);
    const [next, setNext] = useState();
    const [prev, setPrev] = useState();
    const [perpage, setPerpage] = useState(25);
    const [load, setLoad] = useState(false);
    const [search, setSearch] = useState('');
    const [dateupdate, setDateUpdate] = useState('');
    const [searchdel, setSearchDel] = useState(false);

    const [columnDefs] = useState([
        { headerName: 'No', minWidth: 60, maxWidth: 60, valueGetter: "node.rowIndex + 1" },
        { headerName: 'ID', minWidth: 60, maxWidth: 60, field: 'kd_kampung' },
        { field: 'kampung', filter: true, minWidth: 150, maxWidth: 150 },
        { field: 'distrik', filter: true, minWidth: 150, maxWidth: 150, }, //suppressSizeToFit: false 
        { field: 'pagu_thp1', headerName: 'Tahap I', width: 120, filter: true, suppressSizeToFit: true, cellRenderer: (e) => (e.data.pagu_thp1 === null ? <span className='bg-red-400 px-2 rounded-sm text-red-300'>Proses.....</span> : <CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />) },
        { field: 'pagu_thp2', headerName: 'Tahap II', width: 120, filter: true, suppressSizeToFit: true, cellRenderer: (e) => (e.data.pagu_thp2 === null ? <span className='bg-red-400 px-2 rounded-sm text-red-300'>Proses.....</span> : <CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />) },
        { field: 'pagu_thp3', headerName: 'Tahap III', width: 120, filter: true, suppressSizeToFit: true, cellRenderer: (e) => (e.data.pagu_thp3 === null ? <span className='bg-red-400 px-2 rounded-sm text-red-300'>Proses.....</span> : <CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} />) },

    ]);

    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true, flex: 1, minWidth: 100,
    }));

    useEffect(() => {
        let a = true;
        async function geT() {
            setLoad(true);
            let url = `/laporan/reg?page=${page}&size=${perpage}`;
            // if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
            if (search) { url += `&kampung=${search}` }
            await axios.get(url).then((e) => {
                //console.log('eeeeeeee', e)
                if (a) {
                    setRowData(e.data.result.data.data);
                    setCount(e.data.result.data.count);
                    setPage(e.data.result.data.page);
                    setPerpage(e.data.result.data.per_page);
                    setPrev(e.data.result.pagination.previous_page);
                    setNext(e.data.result.pagination.next_page);
                    if (e.status === 200) {
                        setLoad(false);
                    }
                }
            })
        }
        geT();
        return () => { a = false; };
    }, [page, perpage, dateupdate]);


    // ++++++++++++ Search Trigger +++++++++++
    useEffect(() => { if (search !== '') { setSearchDel(true); } else { setSearchDel(false); } }, [search])
    // ++++++++++++ Search Trigger +++++++++++

    // ++++++++++++ Cari Data ++++++++++++++++
    const btnSearch = async () => {
        setLoad(true);
        let url = `/laporan/reg?page=${page}&size=${perpage}`;
        //if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        // if (search) { url += `&kd_advis=${}` }
        await axios.get(url).then((e) => {
            setRowData(e.data.result.data.data);
            setCount(e.data.result.data.count);
            setPage(e.data.result.data.page);
            setPerpage(e.data.result.data.per_page);
            setPrev(e.data.result.pagination.previous_page);
            setNext(e.data.result.pagination.next_page);
            if (e.status === 200) {
                setDateUpdate(new Date())
                setLoad(false);
            }
        })
    }
    // ++++++++++++ Cari Data ++++++++++++++++

    const onBtnExport = useCallback(() => { gridRef.current.api.exportDataAsCsv(); }, []);

    return (
        <>
            <div className='grid grid-flow-row h-0'>
                {load ? <Loader /> : null}
                <div >
                    <div className="h-20"></div>
                    <div className="flex flex-row items-center justify-center z-10">
                        <span className='font-semibold mr-4'>Laporan SP2D Reguler</span>
                        <div className="flex border-2 rounded ml-5">
                            <input type="text" className="px-1.5 py-0.5 w-64" placeholder="Cari..." onChange={(e) => setSearch(e.target.value)} value={search} />
                            {searchdel ? <span className='rounded-full mx-1 my-auto cursor-pointer text-red-500 font-semibold' onClick={() => { setSearch(''); }}>X</span> : null}
                            <Button className="flex items-center justify-center px-1.5 border-l" onClick={btnSearch}>
                                <Tooltip title='Cari / Refresh Data' style={{ height: 12 }} >
                                    <IconButton>
                                        <svg className="w-3 h-3 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        </div>
                        <Tooltip title='Save xlsx' style={{ height: 8, alignContent: 'center', width: 16 }} >
                            <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22 }}>
                                <Button style={{ width: 8 }} onClick={() => onBtnExport()} ><CloudDownloadIcon sx={{ color: green[500] }} /></Button>
                            </IconButton>
                        </Tooltip>
                    </div>
                    <div className='container w-full bg-slate-400 mx-auto -z-40 relative'>
                        <div className='mx-auto'>
                            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                            <div className='mx-auto my-auto relative'>
                                <div className="ag-theme-alpine items-center mx-auto absolute" style={{ width: '100%', height: 630, }}>
                                    <AgGridReact
                                        ref={gridRef} // Ref for accessing Grid's API
                                        defaultColDef={defaultColDef} // Default Column Properties
                                        columnDefs={columnDefs} // Column Defs for Columns
                                        rowData={rowData} // Row Data for Rows
                                        gridOptions={{ rowStyle: { padding: 0, }, rowHeight: 22, }}
                                        onGridReady={params => { params.api.sizeColumnsToFit(); params.api.resetRowHeights(); params.api.setHeaderHeight(30); }}
                                        // onSortChanged={(e) => e.api.refreshCells()}
                                        //rowBuffer={this.state.rowBuffer}
                                        ensureDomOrder={true}
                                        suppressColumnVirtualisation={true}
                                    />
                                    <Pagination
                                        postsPerPage={perpage} totalPosts={count} currentPage={page}
                                        paginateFront={() => { if (next != null) { setPage(parseInt(next)) } }}
                                        paginateBack={() => { if (prev != null) { setPage(parseInt(prev)) } }}
                                        selectChanged={(e) => { setPerpage(e.target.value) }}
                                    />

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default LaporanSp2dReg

