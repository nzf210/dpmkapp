import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
// import DocSppreg from './DocSpp_reg';
import moment from "moment";

//Redux
import { useSelector } from 'react-redux';
import { Button, IconButton, Tooltip } from '@material-ui/core';
//Redux

// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
// import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackupIcon from '@mui/icons-material/Backup';

// import DatePicker from '../../DatePicker'

import { blue, green, pink } from '@mui/material/colors';
// import AlertDialog from '../../DialogAlert';
// import InfoDialog from '../../DialogInfo';
import { Loader } from '../Font';

import Pagination from '../../Pagination';

moment.updateLocale('id', {
    weekdaysMin: ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    months: ["Januari", "February", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Novenber", "Desember"]
});

const ApbkMonitoring = () => {

    const { kd_kampung, kd_lvl1 } = useSelector(state => state.userLogin);
    // const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const gridRef = useRef(); // Optional - for accessing Grid's API
    // const gridRef_ = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [count, setCount] = useState();
    const [page, setPage] = useState(1);
    const [next, setNext] = useState();
    const [prev, setPrev] = useState();
    const [perpage, setPerpage] = useState(15);
    const [search, setSearch] = useState('');
    const [searchdel, setSearchDel] = useState(false);
    const [dateupdate, setDateUpdate] = useState('');
    const [info, setInfo] = useState('');
    const [dialoginfo, setDialogInfo] = useState(false);
    const [print, setPrint] = useState(false);
    //const [viewprint, setViewprint] = useState(false);
    //const [viewbtn, setBtn] = useState(false);
    const [dataprint, setDataprint] = useState([]);
    //const [dataVprint, setDataVprint] = useState([]);
    //const [dataDlprint, setDataDlprint] = useState([]);
    const [load, setLoad] = useState(false);

    const [tgl, setTgl] = useState(new Date());
    //const nmpicker = 'SP2SPD REG';


    const [columnDefs] = useState([
        { field: 'kampung', filter: true, minWidth: 150, maxWidth: 150, suppressSizeToFit: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true },
        { field: 'distrik', filter: true, minWidth: 150, maxWidth: 150, suppressSizeToFit: true }, //suppressSizeToFit: false 
        { field: 'thp_advis', headerName: 'Kegiatan', width: 270, filter: true, suppressSizeToFit: true },
        //{ field: 'no_spp', headerName: 'No SP2SPD', width: 220, filter: true, suppressSizeToFit: true },
        // { field: 'tgl_spp', headerName: 'Tgl SP2SPD', width: 150, cellRenderer: (e) => <span>{e.value}</span> },
        { field: 'tgl', suppressSizeToFit: true, filter: true, headerName: 'Tgl Verf', width: 150, maxWidth: 150, cellRenderer: (e) => <span>{moment(e.value).locale('id').format("DD MMMM YYYY")}</span> },
        {
            field: 'sts', suppressSizeToFit: true, filter: true, headerName: 'Status APBK', width: 150, maxWidth: 150, cellRenderer: (e) => (e.data.sts ? <span className='bg-green-500 text-center justify-center w-10'>OK</span>
                : <span className='bg-yellow-500 text-center justify-center w-20 p-1 rounded-sm h-2  align-top content-center items-center'>PROSES</span>)
        },
        { field: 'pagu', suppressSizeToFit: true, width: 150, maxWidth: 150, cellRenderer: (e) => <CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /> },
        {
            headerName: 'Aksi', cellStyle: { textAlign: "right", alignItems: 'right' }, headerClass: 'ag-theme-text-aksi', width: 80, maxWidth: 80,

            cellRenderer: (e) => (!e.data.sts || e.data.sts_spp ? null :
                <div className=' -ml-10 -mt-1'>
                    {/* <Button onClick={() => { handleUpdateForm(e.data); }} style={{ height: 8, alignContent: 'center', marginRight: -10, width: 2, maxWidth: '2px', padding: 0, }}   >
                        <Tooltip title='Edit Data' style={{ height: 8, alignContent: 'center' }} >
                            <IconButton style={{ height: 8, alignContent: 'center' }} >
                                <EditIcon fontSize="small" sx={{ color: orange[500] }} style={{ alignContent: 'center', padding: 0 }} />
                            </IconButton>
                        </Tooltip>
                    </Button> */}
                    <Button onClick={() => handleDelete(e.data)} style={{ height: 8, alignContent: 'center', marginLeft: -10 }}>
                        <Tooltip title='Hapus Data' style={{ height: 8, alignContent: 'center' }} >
                            <IconButton style={{ height: 8, alignContent: 'center' }} >
                                <DeleteForeverIcon fontSize="small" sx={{ color: pink[500] }} />
                            </IconButton>
                        </Tooltip>
                    </Button>
                </div>),
        }
    ]);


    // DefaultColDef sets props common to all Columns
    const defaultColDef = useMemo(() => ({
        sortable: true, flex: 1, minWidth: 100,
    }));

    // Example of consuming Grid Event
    // const cellClickedListener = useCallback(event => {
    //     console.log('cellClicked', event.data);
    // }, []);

    // Example load data from sever
    useEffect(async () => {
        setLoad(true);
        let url = `/anggaran?page=${page}&size=${perpage}`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        if (search !== '') { url += `&kampung=${search}` }
        await axios.get(url).then((e) => {
            setRowData(e.data.result.data.data);
            setCount(e.data.result.data.count);
            setPage(e.data.result.data.page);
            setPerpage(e.data.result.data.per_page);
            setPrev(e.data.result.pagination.previous_page);
            setNext(e.data.result.pagination.next_page);
            if (e.status === 200) {
                setLoad(false);
            }
        })
        // .then(e => console.log(e))
    }, [page, perpage, dateupdate]);

    useEffect(() => { if (search !== '') { setSearchDel(true); } else { setSearchDel(false); } }, [search])

    //================= Terbitkan SP2SPD =========================
    /* Funtiom Update Data +++++++++++ PENOMORAN ++++++++*/
    const updateDataChecklist = () => {
        //console.log(dataprint_, `${moment(tgl).locale('id').format("YYYY-MM-DD")}`)
        const confirm = window.confirm(`Dengan Memverifikasi Data Yang Di Pilih akan Mengubah Status APBK OK`)
        let tgl = moment(new Date()).locale('id').format("YYYY-MM-DD");
        if (confirm) {
            setLoad(true);
            dataprint.map(async (e, i) => {
                await axios.patch('/anggaran', { id: e.id, sts: true, tgl })
                if (dataprint.length === i + 1) {
                    setLoad(false);
                    setDateUpdate(new Date());
                }
            })
        }


    }
    /* Funtiom Update Data */
    //================= Terbitkan SP2SPD =========================

    //================= Alert Dialog =========================
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); setDialogInfo(false) };
    // const onChangeForm = (e) => { const { value, id } = e.target; setDataform({ ...dataform, [id]: value }) }
    // const handleUpdateForm = async (e) => { setDataform(e); handleClickOpen(); }
    const handleDelete = async (e) => {
        const confirm = window.confirm(`Dengan Menghapus Akan Mengembalikan Status APBK ${e.kampung} Distrik ${e.distrik} ${e.thp_advis} kembali ke PROSES dan Tidak Dapat Terbitkan SP2SPD`)
        if (confirm) {
            setLoad(true);
            try {
                const update = await axios.patch('/anggaran', { id: e.id, sts: false, tgl: null })
                if (update.status === 200) {
                    // console.log(update.data.info)
                    handleClose();
                    setInfo('Data Di Hapus');
                    setDateUpdate(Date());
                    setDialogInfo(true);
                    setTimeout(() => {
                        setDialogInfo(false);
                    }, 2000);
                    setLoad(false);
                } else { setDialogInfo(true); setInfo('Gagal Hapus Data') }
            } catch (error) { console.log('Error Hapus spp reg', error) }
        }
    }
    // const handleSubmitForm = async () => {
    //     const confirm = window.confirm(`Apa Anda Yakin Ubah Data ${dataform.kampung} Distrik ${dataform.distrik} ${dataform.thp_advis} `)
    //     if (confirm) {
    //         setLoad(true);
    //         try {
    //             // console.log('submit', dataform.id, dataform.tgl_spp, dataform.no_spp)
    //             const update = await axios.patch('/anggaran', { id: dataform.id, tgl_spp: dataform.tgl_spp, sts_spp: true, no_spp: dataform.no_spp })
    //             if (update.status === 200) {
    //                 console.log(update.data.info)
    //                 handleClose();
    //                 setInfo(update.data.info);
    //                 setDateUpdate(Date());
    //                 setDialogInfo(true);
    //                 setTimeout(() => {
    //                     setDialogInfo(false);
    //                 }, 2000);
    //                 setLoad(false);
    //             } else { setDialogInfo(true); setInfo('Gagal Ubah Data') }
    //         } catch (error) { console.log('Error Update spp reg', error) }
    //     }
    // }
    //================= Alert Dialog =========================

    //================= btn click cari data ==================
    const btnClick = async (e) => {
        setLoad(true);
        let url = `/anggaran?page=${1}&size=${perpage}&kampung=${search}`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
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
            }
        })
    }

    //================= btn click cari data ==================

    const onSelectionChanged = (e) => {
        let selectedRows = e.api.getSelectedRows();
        let data = [...selectedRows]
        if (data.length === 0) {
            setPrint(false);
        } else {
            setPrint(true);
            setDataprint(data);
        }
    }



    const onBtnExport = useCallback(() => { gridRef.current.api.exportDataAsCsv(); }, []);

    const isRowSelectable = (nd) => {
        // console.log(nd)
        return nd.data.sts ? !nd.data.sts : true
    }

    return (
        <>
            <div className='grid grid-flow-row h-0'>
                {load ? <Loader /> : null}
                <div >
                    <div className="h-20"></div>
                    <span className='left-0 w-44 absolute ml-[20%] -z-50 font-semibold text-slate-900'>VALIDASI APBK</span>
                    <div className="flex items-center justify-center z-10">
                        <div className="flex border-2 rounded">
                            <input type="text" className="px-1.5 py-0.5 w-64" placeholder="Cari..." onChange={(e) => setSearch(e.target.value)} value={search} />
                            {searchdel ? <span className='rounded-full mx-1 cursor-pointer text-red-500 font-semibold pt-[6px]' onClick={() => { setSearch(''); }}>X</span> : null}
                            <Button className="flex items-center justify-center px-1.5 border-l" onClick={btnClick}>
                                <Tooltip title='Cari / Reload Data' style={{ height: 12 }} >
                                    <IconButton>
                                        <svg className="w-3 h-3 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        </div>
                        {print ? <div>
                            {/* <Tooltip title='Cetak PDF' style={{ height: 8, alignContent: 'center', width: 16 }} >
                                <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22 }}>
                                    <Button onClick={() => { setDataDlprint(dataprint); setBtn(true); }} ><LocalPrintshopIcon sx={{ color: orange[400] }} /></Button>
                                </IconButton>
                            </Tooltip> */}
                            {/* <Tooltip title='Verifikasi APBK' style={{ height: 8, alignContent: 'center', width: 16 }} >
                                <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22 }}>
                                    <Button style={{ width: 8 }} onClick={() => { setViewprint(true); setDataVprint(dataprint) }} ><PictureAsPdfIcon sx={{ color: red[500] }} /></Button>
                                </IconButton>
                            </Tooltip> */}
                            <Tooltip title='Verifikasi APBK' style={{ height: 8, alignContent: 'center', paddingLeft: 22, width: 16, }} >
                                <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22, }}>
                                    <Button onClick={updateDataChecklist} className='mx-4 -mt-6'><BackupIcon sx={{ color: blue[500] }} /></Button>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Save xlsx' style={{ height: 8, alignContent: 'center', width: 16 }} >
                                <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22 }}>
                                    <Button style={{ width: 8 }} onClick={() => onBtnExport()} ><CloudDownloadIcon sx={{ color: green[500] }} /></Button>
                                </IconButton>
                            </Tooltip>
                        </div> : null}
                    </div>
                    <div className='container w-full bg-slate-400 mx-auto -z-40 relative'>
                        <div className='mx-auto'>
                            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                            <div className='mx-auto my-auto'>
                                <div className="ag-theme-alpine items-center mx-auto absolute" style={{ width: '100%', height: 435, }}>
                                    <AgGridReact
                                        ref={gridRef} // Ref for accessing Grid's API
                                        rowData={rowData} // Row Data for Rows
                                        columnDefs={columnDefs} // Column Defs for Columns
                                        defaultColDef={defaultColDef} // Default Column Properties
                                        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                        rowSelection='multiple' // Options - allows click selection of rows
                                        //onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                                        gridOptions={{ rowStyle: { padding: 0, }, rowHeight: 22, }}
                                        onGridReady={params => { params.api.sizeColumnsToFit(); params.api.resetRowHeights(); params.api.setHeaderHeight(30); }}
                                        onSelectionChanged={onSelectionChanged}
                                        suppressRowClickSelection={true} // Option Disable selection saat buutton click
                                        isRowSelectable={isRowSelectable}
                                        overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Tunggu ... Memuat Data</span>'}
                                        overlayNoRowsTemplate={'<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">Data Tidak Tersedia / Tidak Di temukan</span>'}
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
            </div>

        </>
    )
}

export default ApbkMonitoring

