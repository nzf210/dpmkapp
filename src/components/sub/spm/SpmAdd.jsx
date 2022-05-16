import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
import CurrencyFormat from 'react-currency-format';
import DocSpmAdd from './DocSpm';
import moment from "moment";

//Redux
import { useSelector } from 'react-redux';
import { Button, IconButton, Tooltip } from '@material-ui/core';
//Redux

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import SaveAsIcon from '@mui/icons-material/SaveAs';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import BackupIcon from '@mui/icons-material/Backup';

import DatePicker from '../../DatePicker'

import { blue, green, orange, pink, red } from '@mui/material/colors';
import AlertDialog from '../../DialogAlert';
import InfoDialog from '../../DialogInfo';
import { Loader } from '../Font';

import Pagination from '../../Pagination';

moment.updateLocale('id', {
    weekdaysMin: ["Ahad", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    months: ["Januari", "February", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "Novenber", "Desember"]
});

const SpmAdd = () => {

    const { kd_kampung, kd_lvl1 } = useSelector(state => state.userLogin);
    // const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const gridRef = useRef(); // Optional - for accessing Grid's API
    const gridRef_ = useRef(); // Optional - for accessing Grid's API
    const [rowData, setRowData] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [count, setCount] = useState();
    const [page, setPage] = useState(1);
    const [next, setNext] = useState();
    const [prev, setPrev] = useState();
    const [perpage, setPerpage] = useState(5);
    const [search, setSearch] = useState('');
    const [searchdel, setSearchDel] = useState(false);
    const [dateupdate, setDateUpdate] = useState('');
    const [info, setInfo] = useState('');
    const [dialoginfo, setDialogInfo] = useState(false);
    const [print, setPrint] = useState(false);
    const [viewprint, setViewprint] = useState(false);
    const [viewbtn, setBtn] = useState(false);
    const [dataprint, setDataprint] = useState([]);
    const [dataVprint, setDataVprint] = useState([]);
    const [dataDlprint, setDataDlprint] = useState([]);
    const [dataform, setDataform] = useState({ no_spp: '', tgl_spp: '', no_spm: '', tgl_spm: '', no_sp2d: '', tgl_sp2d: '' });
    const [load, setLoad] = useState(false);

    const [rowData_, setRowData_] = useState(); // Set rowData to Array of Objects, one Object per Row
    const [count_, setCount_] = useState();
    const [page_, setPage_] = useState(1);
    const [next_, setNext_] = useState();
    const [prev_, setPrev_] = useState();
    const [perpage_, setPerpage_] = useState(5);
    const [search_, setSearch_] = useState('');
    const [searchdel_, setSearchDel_] = useState(false);
    const [print_, setPrint_] = useState(false);
    const [dataprint_, setDataprint_] = useState([]);
    const [tgl, setTgl] = useState(new Date());
    let nmpicker = 'SKBK ADD';

    const [columnDefs] = useState([
        { field: 'kampung', filter: true, minWidth: 150, maxWidth: 150, suppressSizeToFit: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true },
        { field: 'distrik', filter: true, minWidth: 150, maxWidth: 150, suppressSizeToFit: true }, //suppressSizeToFit: false 
        { field: 'thp_advis', headerName: 'Kegiatan', width: 270, filter: true, suppressSizeToFit: true },
        { field: 'no_spm', headerName: 'No SKBK', width: 220, filter: true, suppressSizeToFit: true },
        // { field: 'tgl_spp', headerName: 'Tgl SP2SPD', width: 150, cellRenderer: (e) => <span>{e.value}</span> },
        { field: 'tgl_spm', suppressSizeToFit: true, filter: true, headerName: 'Tgl SKBK', width: 150, maxWidth: 150, cellRenderer: (e) => <span>{moment(e.value).locale('id').format("DD MMMM YYYY")}</span> },
        { field: 'pagu', suppressSizeToFit: true, width: 150, maxWidth: 150, cellRenderer: (e) => <CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /> },
        {
            headerName: 'Aksi', cellStyle: { textAlign: "right", alignItems: 'right' }, headerClass: 'ag-theme-text-aksi', width: 80, maxWidth: 80,
            // cellRendererFramework: (e) =>
            //     <div className='-pl-20 -ml-6'>
            //         <Button onClick={() => { handleUpdateForm(e.data) }} style={{ height: 8, alignContent: 'center', marginTop: -6 }} >
            //             <Tooltip title='Edit Data' style={{ height: 8, alignContent: 'center' }} >
            //                 <IconButton style={{ height: 8, alignContent: 'center' }}>
            //                     <EditIcon fontSize="small" sx={{ color: orange[500] }} style={{ alignContent: 'center' }} />
            //                 </IconButton>
            //             </Tooltip>
            //         </Button>
            //         <Button onClick={() => handleDelete(e.data)} style={{ height: 8, alignContent: 'center', marginTop: -6 }}>
            //             <Tooltip title='Hapus Data' style={{ height: 8, alignContent: 'center' }} >
            //                 <IconButton style={{ height: 8, alignContent: 'center' }}>
            //                     <DeleteForeverIcon fontSize="small" sx={{ color: pink[500] }} />
            //                 </IconButton>
            //             </Tooltip>
            //         </Button>
            //     </div>,
            cellRenderer: (e) => (!e.data.sts_sp2d ?
                <div className=' -ml-10 -mt-1'>
                    <Button onClick={() => { handleUpdateForm(e.data); }} style={{ height: 8, alignContent: 'center', marginRight: -10, width: 2, maxWidth: '2px', padding: 0, }}   >
                        <Tooltip title='Edit Data' style={{ height: 8, alignContent: 'center' }} >
                            <IconButton style={{ height: 8, alignContent: 'center' }} >
                                <EditIcon fontSize="small" sx={{ color: orange[500] }} style={{ alignContent: 'center', padding: 0 }} />
                            </IconButton>
                        </Tooltip>
                    </Button>
                    <Button onClick={() => handleDelete(e.data)} style={{ height: 8, alignContent: 'center', marginLeft: -10 }}>
                        <Tooltip title='Hapus Data' style={{ height: 8, alignContent: 'center' }} >
                            <IconButton style={{ height: 8, alignContent: 'center' }} >
                                <DeleteForeverIcon fontSize="small" sx={{ color: pink[500] }} />
                            </IconButton>
                        </Tooltip>
                    </Button>
                </div> : null),
        }
    ]);
    const [columnDefs_] = useState([
        { field: 'kampung', filter: true, minWidth: 150, maxWidth: 150, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true },
        { field: 'distrik', filter: true, minWidth: 150, maxWidth: 150, }, //suppressSizeToFit: true
        { field: 'thp_advis', headerName: 'Kegiatan', width: 280 },
        { field: 'no_spp', headerName: 'No SP2SPD', width: 220, filter: true, suppressSizeToFit: true },
        { field: 'tgl_spp', headerName: 'Tgl SP2SPD', width: 150, cellRenderer: (e) => <span>{moment(e.value).locale('id').format("DD MMMM YYYY")}</span> },
        { field: 'pagu', width: 150, cellRenderer: (e) => <CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /> },
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
        let url = `/anggaran/add?page=${page}&size=${perpage}&sts_spp=true&sts=true&sts_spm=true&kd_keg=4`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        if (search) { url += `&kampung=${search}` }
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

    useEffect(async () => {
        setLoad(true);
        let url = `/anggaran/add?page=${page_}&size=${perpage_}&sts_spp=true&sts=true&sts_spm=false&kd_keg=4`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        if (search_) { url += `&kampung=${search_}` }
        await axios.get(url).then((e) => {
            setRowData_(e.data.result.data.data);
            setCount_(e.data.result.data.count);
            setPage_(e.data.result.data.page);
            setPerpage_(e.data.result.data.per_page);
            setPrev_(e.data.result.pagination.previous_page);
            setNext_(e.data.result.pagination.next_page);
            if (e.status === 200) {
                setLoad(false);
            }
        })

    }, [page_, perpage_, dateupdate]);

    // Example using Grid's API
    // const buttonListener = useCallback(e => {
    //     gridRef.current.api.deselectAll();
    // }, []);
    useEffect(() => { if (search !== '') { setSearchDel(true); } else { setSearchDel(false); } }, [search])
    useEffect(() => { if (search_ !== '') { setSearchDel_(true); } else { setSearchDel_(false); } }, [search_])

    //================= Terbitkan SP2SPD =========================
    /* Funtiom Update Data +++++++++++ PENOMORAN ++++++++*/
    const updateDataChecklist = async () => {
        //console.log(dataprint_, `${moment(tgl).locale('id').format("YYYY-MM-DD")}`)
        let tgl_spm = moment(tgl).locale('id').format("YYYY-MM-DD");
        let counter = 0;
        let len = dataprint_.length;
        try {
            setLoad(true);
            dataprint_.map(async (f, i) => {
                const no = await axios.get(`/nodok/${f.kd_kampung}?kd_keg=4`);
                const nodok_ = parseInt(no.data[0].no_spm);
                // let thp = '';
                // switch (f.id_thp) {
                //     case 2:
                //         thp = 'I'
                //         break;
                //     case 3:
                //         thp = 'II'
                //         break;
                //     default:
                //         thp = 'III'
                // }

                let nomor = '';
                let nodok = parseInt((nodok_ + 1))
                switch (true) {
                    case (nodok < 10):
                        nomor = `000${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`; //00${nodok}/SKBK/${f.opt2}/${f.kampung}/2022
                        console.log('<9', nomor);
                        break;
                    case (9 < nodok < 100):
                        nomor = `00${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`;
                        console.log('>9', nomor);
                        break;
                    case (99 > nodok > 1000):
                        nomor = `0${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`;
                        console.log('>99');
                        break;
                    case (999 > nodok > 9999):
                        nomor = `${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`;
                        console.log('>999');
                        break;
                    default:
                        break;
                }
                counter++
                const update = await axios.patch('/anggaran', { id: f.id, tgl_spm, sts_spm: true, no_spm: nomor })
                if (update.status === 200 && len === counter) {
                    setDateUpdate(new Date())
                }
            })

        } catch (error) {
            console.log(error)
        }
    }
    /* Funtiom Update Data */
    //================= Terbitkan SP2SPD =========================

    //================= Alert Dialog =========================
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); setDialogInfo(false) };
    const onChangeForm = (e) => {
        const { value, id } = e.target;
        //console.log(value, id)
        setDataform({ ...dataform, [id]: value })
    }
    const handleUpdateForm = async (e) => { setDataform(e); handleClickOpen(); }
    const handleDelete = async (e) => {
        const confirm = window.confirm(`Apa Anda Yakin Hapus Data ${e.kampung} Distrik ${e.distrik} ${e.thp_advis} `)
        if (confirm) {
            setLoad(true);
            try {
                const update = await axios.patch('/anggaran', { id: e.id, tgl_spm: '1900-01-01', sts_spm: false, no_spm: `data di hapus ${Date()}` })
                if (update.status === 200) {
                    //console.log(update.data.info)
                    handleClose();
                    setInfo('Data Di Hapus');
                    setDateUpdate(Date());
                    setDialogInfo(true);
                    setTimeout(() => { setDialogInfo(false); }, 2000);
                    setLoad(false);
                } else { setDialogInfo(true); setInfo('Gagal Hapus Data') }
            } catch (error) { console.log('Error Hapus spm reg', error) }
        }
    }
    const handleSubmitForm = async () => {
        const confirm = window.confirm(`Apa Anda Yakin Ubah Data ${dataform.kampung} Distrik ${dataform.distrik} ${dataform.thp_advis} `)
        if (confirm) {
            setLoad(true);
            try {
                // console.log('submit', dataform.id, dataform.tgl_spp, dataform.no_spp)
                const update = await axios.patch('/anggaran', { id: dataform.id, tgl_spm: dataform.tgl_spm, sts_spm: true, no_spm: dataform.no_spm })
                if (update.status === 200) {
                    console.log(update.data.info)
                    handleClose();
                    setInfo(update.data.info);
                    setDateUpdate(Date());
                    setDialogInfo(true);
                    setTimeout(() => { setDialogInfo(false); }, 2000);
                    setLoad(false);
                } else { setDialogInfo(true); setInfo('Gagal Ubah Data') }
            } catch (error) { console.log('Error Update spm reg', error) }
        }
    }
    //================= Alert Dialog =========================

    //================= btn click cari data ==================
    const btnClick = async (e) => {
        setLoad(true);
        ///anggaran/add?page=${page}&size=${perpage}&sts_spp=true&sts=true&sts_spm=true&kd_keg=4
        let url = `/anggaran/add?page=1&size=${perpage}&kampung=${search}&sts_spp=true&sts=true&sts_spm=true&kd_keg=4`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        // if (search) { url += `&kd_advis=${}` }
        await axios.get(url).then((e) => {
            setRowData(e.data.result.data.data);
            setCount(e.data.result.data.count);
            setPage(e.data.result.data.page);
            setPerpage(e.data.result.data.per_page);
            setPrev(e.data.result.pagination.previous_page);
            setNext(e.data.result.pagination.next_page);
            if (e.status === 200) { setDateUpdate(new Date()) }
        })
    }
    const btnClick_ = async (e) => {
        setLoad(true);
        let url = `/anggaran/add?page=1&size=${perpage_}&kampung=${search_}&sts_spp=true&sts=true&sts_spm=false&kd_keg=4`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        // if (search) { url += `&kd_advis=${}` }   
        await axios.get(url).then((e) => {
            setRowData_(e.data.result.data.data);
            setCount_(e.data.result.data.count);
            setPage_(e.data.result.data.page);
            setPerpage_(e.data.result.data.per_page);
            setPrev_(e.data.result.pagination.previous_page);
            setNext_(e.data.result.pagination.next_page);
            if (e.status === 200) { setDateUpdate(new Date()) }
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

    const onSelectionChanged_ = (e) => {
        let selectedRows = e.api.getSelectedRows();
        let data = [...selectedRows]
        if (data.length === 0) {
            setPrint_(false);
        } else {
            setPrint_(true);
            setDataprint_(data);
        }
    }

    const onBtnExport = useCallback(() => { gridRef.current.api.exportDataAsCsv(); }, []);
    const onBtnExport_ = useCallback(() => { gridRef_.current.api.exportDataAsCsv(); }, []);


    return (
        <>
            {viewprint ?
                <div className='fixed  mt-10 w-full z-50 flex'>
                    <div className='flex-none w-14 h-14'></div>
                    <div className='grow'>
                        <div className='mx-auto justify-center items-center h-screen w-[90%]'>
                            <PDFViewer style={{ width: "100%", height: "100vh", alignItems: 'center', alignSelf: 'center' }}
                            ><DocSpmAdd dataselectspp={dataVprint} /></PDFViewer>
                            <span className={`absolute text-red-500 bg-slate-900 rounded-full text-xl cursor-pointer z-20 w-6 m-4 right-20 -top-2 -translate-x-1/2 text-center`}
                                onClick={() => { setViewprint(false); setDataVprint([]) }}>X</span>
                        </div>
                    </div>
                    <div className='flex-none w-14 h-14'></div>
                </div>
                : null}
            <div className='grid grid-flow-row h-0'>
                {load ? <Loader /> : null}
                <div >
                    <div className="h-20"></div>
                    <span className='left-0 w-44 absolute ml-[20%] -z-50 font-semibold text-slate-900'>{nmpicker} TERBIT</span>
                    <div className="flex items-center justify-center z-10">
                        <div className="flex border-2 rounded">
                            <input type="text" className="px-1.5 py-0.5 w-64" placeholder="Cari..." onChange={(e) => setSearch(e.target.value)} value={search} />
                            {searchdel ? <span className='rounded-full mx-1 cursor-pointer text-red-500 font-semibold' onClick={() => { setSearch(''); }}>X</span> : null}
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
                            {viewbtn ?
                                <><PDFDownloadLink placeholder='Print Data PDF' document={<DocSpmAdd dataselectspp={dataDlprint} />} fileName={`doc_spp-reg_${new Date().toLocaleTimeString().slice(0, 16)}`}>
                                    {({ loading }) => loading && !viewbtn ? <Loader /> :
                                        <Tooltip title='SaveAs PDF' style={{ alignContent: 'center', height: 8, width: 8 }} >
                                            <IconButton style={{ alignContent: 'center', height: 8, marginTop: -4, width: 8, paddingLeft: 22 }}>
                                                <Button className='w-8' onClick={() => setTimeout(() => { setDataDlprint([]); setBtn(false) }, 1500)}><SaveAsIcon sx={{ color: green[600] }} /></Button>
                                            </IconButton>
                                        </Tooltip>
                                    }
                                </PDFDownloadLink></> : null}
                            <Tooltip title='Cetak PDF' style={{ height: 8, alignContent: 'center', width: 16 }} >
                                <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22 }}>
                                    <Button onClick={() => { setDataDlprint(dataprint); setBtn(true); }} ><LocalPrintshopIcon sx={{ color: orange[400] }} /></Button>
                                </IconButton>
                            </Tooltip>

                            <Tooltip title='Preview PDF' style={{ height: 8, alignContent: 'center', width: 16 }} >
                                <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22 }}>
                                    <Button style={{ width: 8 }} onClick={() => { setViewprint(true); setDataVprint(dataprint) }} ><PictureAsPdfIcon sx={{ color: red[500] }} /></Button>
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
                                <div className="ag-theme-alpine items-center mx-auto absolute" style={{ width: '100%', height: 215, }}>
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
                                    <AlertDialog open={open} handleClose={handleClose} dataform={dataform} onChange={onChangeForm} handleSubmit={handleSubmitForm} nmpicker={nmpicker} ns={`SKBK`} />
                                    <InfoDialog open={dialoginfo} text={info} handleClose={handleClose} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-72 -z-20'>
                    <span className='left-0 w-44 absolute ml-[20%] -z-50 font-semibold text-slate-900'>{nmpicker} PROSES</span>
                    <div className="flex items-center justify-center z-10">
                        <div className="flex border-2 rounded">
                            <input type="text" className="px-1.5 py-0.5 w-64" placeholder="Cari..." onChange={(e) => setSearch_(e.target.value)} value={search_} />
                            {searchdel_ ? <span className='rounded-full mx-1 cursor-pointer text-red-500 font-semibold' onClick={() => { setSearch_(''); }}>X</span> : null}
                            <Button className="flex items-center justify-center px-1.5 border-l" onClick={btnClick_}>
                                <Tooltip title='Cari / Reload Data' style={{ height: 12 }} >
                                    <IconButton>
                                        <svg className="w-3 h-3 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                            <path d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
                                        </svg>
                                    </IconButton>
                                </Tooltip>
                            </Button>
                        </div>
                        {print_ ? <div>
                            <Tooltip title='Save xlsx' style={{ height: 8, alignContent: 'center', paddingLeft: 22, width: 16, marginTop: -28 }} >
                                <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22, marginTop: -18 }}>
                                    <Button onClick={() => onBtnExport_()} className='mx-4 -mt-6' ><CloudDownloadIcon sx={{ color: green[500] }} /></Button>
                                </IconButton>
                            </Tooltip>
                            {/* =================== Form Tanggal dan button Terbitkan SP2SPD ===============================  */}
                            <Tooltip title='Terbitkan SP2SPD' style={{ height: 8, alignContent: 'center', paddingLeft: 22, width: 16, marginTop: -28 }} >
                                <IconButton style={{ height: 8, alignContent: 'center', width: 16, paddingLeft: 22, marginTop: -18 }}>
                                    <Button onClick={updateDataChecklist} className='mx-4 -mt-6'><BackupIcon sx={{ color: blue[500] }} /></Button>
                                </IconButton>
                            </Tooltip>
                            <div className='h-4 -mb-8'>
                                <DatePicker tgl={tgl} setTgl={(e) => { setTgl(e); }} nmpicker={nmpicker} />
                            </div>
                        </div> : null}
                    </div>
                    <div className='container w-full bg-slate-400 mx-auto -z-40 relative'>
                        <div className='mx-auto'>
                            {/* On div wrapping Grid a) specify theme CSS Class Class and b) sets Grid size */}
                            <div className='mx-auto my-auto'>
                                <div className="ag-theme-alpine items-center mx-auto absolute" style={{ width: '100%', height: 215, }}>
                                    <AgGridReact
                                        ref={gridRef_} // Ref for accessing Grid's API
                                        rowData={rowData_} // Row Data for Rows
                                        columnDefs={columnDefs_} // Column Defs for Columns
                                        defaultColDef={defaultColDef} // Default Column Properties
                                        animateRows={true} // Optional - set to 'true' to have rows animate when sorted
                                        rowSelection='multiple' // Options - allows click selection of rows
                                        //onCellClicked={cellClickedListener} // Optional - registering for Grid Event
                                        gridOptions={{ rowStyle: { padding: 0, }, rowHeight: 22, }}
                                        onGridReady={params => { params.api.sizeColumnsToFit(); params.api.resetRowHeights(); params.api.setHeaderHeight(30); }}
                                        onSelectionChanged={onSelectionChanged_}
                                        suppressRowClickSelection={true} // Option Disable selection saat buutton click
                                        overlayLoadingTemplate={'<span class="ag-overlay-loading-center">Tunggu ... Memuat Data</span>'}
                                        overlayNoRowsTemplate={'<span style="padding: 10px; border: 2px solid #444; background: lightgoldenrodyellow">Data Tidak Tersedia / Tidak Di temukan</span>'}
                                    />
                                    <Pagination
                                        postsPerPage={perpage_} totalPosts={count_} currentPage={page_}
                                        paginateFront={() => { if (next_ != null) { setPage_(parseInt(next_)) } }}
                                        paginateBack={() => { if (prev_ != null) { setPage_(parseInt(prev_)) } }}
                                        // paginateFront={() => { if (page !== (Math.ceil(count / perpage))) { setPage(page + 1) } }}
                                        // paginateBack={() => { if (page !== 1) { setPage(page - 1) } }}
                                        selectChanged={(e) => { setPerpage_(e.target.value) }}
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

export default SpmAdd


// import React, { useEffect, useState } from 'react';
// import MaterialTable from 'material-table';
// import tblIcon from '../../TableIcon';

// /* DAte Picker */
// import TextField from '@mui/material/TextField';
// import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
// import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import Stack from '@mui/material/Stack';
// //import indo from 'date-fns/locale/id';
// /* DAte Picker */

// //Redux
// import { useSelector } from 'react-redux';
// //Redux
// import axios from 'axios';

// import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
// import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
// import BackupIcon from '@mui/icons-material/Backup';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import DocSpm from './DocSpm';
// import { Loader } from '../Font';

// const SpmAdd = () => {

//     const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
//     const [data_, setData_] = useState([]);
//     const [data_2, setData_2] = useState([]);
//     const [changests, setChangests] = useState('');
//     const [selectedRow, setSelectedRow] = useState(null);
//     const [dataselect, setDataSelect] = useState([]);
//     const [dataselectspp, setDataSelectspp] = useState([]);
//     const date = new Date();
//     const [tgl, setTgl] = useState(date);
//     const [viewprint, setviewprint] = useState(false);
//     const [load, setLoad] = useState(false);

//     const data = async () => {
//         setLoad(true);
//         try {
//             if (kd_lvl1 === 2) {
//                 const respon = await axios.get(`/anggaran/${kd_kampung}?sts=${1}&kd_keg=${4}&sts_spp=${1}`);
//                 console.log('respon data skbk', respon)
//                 const tes = respon.data.filter((e) => e);
//                 setData_(tes.filter((e) => e.sts_spm === true));
//                 setData_2(tes.filter((e) => e.sts_spm === false));

//             } else {
//                 const respon = await axios.get(`/anggaran?page=${2}&size=${20}&sts=${1}&kd_keg=${4}&sts_spp=${1}`);
//                 console.log('respon data ', respon.data.result)
//                 setData_(respon.data.result.data.data.filter(e => e.sts_spp === true));
//                 setData_2(respon.data.result.data.data.filter(e => e.sts_spp === false));
//             }
//             //console.log('data Anggaran', respon.data.info);
//             setLoad(false);
//         } catch (e) {
//             console.log('error load data SP2SPD', e);
//         }

//         // try {
//         //     setLoad(true);
//         //     const respon = await axios.get('/anggaran/add');
//         //     if (kd_lvl1 === 2) {
//         //         const tes = respon.data.filter((e) => e);
//         //         setData_(tes.filter((e) => e.sts === true && e.sts_spp === true && e.kd_kampung === kd_kampung && e.kd_keg === 4 && e.sts_spm === true));
//         //         setData_2(tes.filter((e) => e.sts === true && e.sts_spp === true && e.kd_kampung === kd_kampung && e.kd_keg === 4 && e.sts_spm === false));
//         //     } else {
//         //         setData_(respon.data.filter(e => e.sts === true && e.sts_spp === true && e.kd_keg === 4 && e.sts_spm === true));
//         //         setData_2(respon.data.filter(e => e.sts === true && e.sts_spp === true && e.kd_keg === 4 && e.sts_spm === false));
//         //     }
//         //     //console.log('data Anggaran', respon.data)
//         //     setLoad(false);
//         // } catch (e) {
//         //     console.log('error refresh token', e.message);
//         // }
//     }

//     useEffect(
//         () => data(),
//         [changests]
//     )

//     const kolom = [
//         // {
//         //     title: 'No',
//         //     cellStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '5%',
//         //         maxWidth: '5%',
//         //         height: '10px', paddingTop: 1, paddingBottom: 1
//         //     },
//         //     headerStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '15%',
//         //     }, editable: () => false,
//         //     render: rowData => rowData.tableData.id + 1
//         // },
//         {
//             field: 'kampung', title: 'Kampung',
//             cellStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%',
//                 height: '10px', paddingTop: 1, paddingBottom: 1
//             },
//             headerStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%',
//             }, editable: () => false,
//         }, {
//             field: 'distrik', title: 'Distrik', editable: () => false,
//             cellStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
//             },
//             headerStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%',
//             },
//         }, {
//             field: 'thp_advis', title: 'Kegiatan', cellStyle: {
//                 height: '10px', paddingTop: 1, paddingBottom: 1
//             }, editable: () => false,
//         },
//         // {
//         //     field: 'no_spp', title: 'NO SP2SPD', cellStyle: {
//         //         height: '10px', paddingTop: 1, paddingBottom: 1
//         //     }, editable: () => false,
//         // }, {
//         //     field: 'tgl_spp', title: 'Tgl SP2SPD', type: "date", dateSetting: { locale: "id-ID" }, cellStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
//         //     },
//         //     headerStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '10%',
//         //     }, editable: () => false,
//         // },
//         {
//             field: 'no_spm', title: 'NO SKBK', cellStyle: {
//                 height: '10px', paddingTop: 1, paddingBottom: 1
//             }
//         }, {
//             field: 'tgl_spm', title: 'Tgl SKBK', type: "date", dateSetting: { locale: "id-ID" }, cellStyle: {
//                 whiteSpace: 'nowrap', width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
//             }, headerStyle: { whiteSpace: 'nowrap', width: '10%', },
//         },
//         {
//             field: 'pagu', title: 'Pagu', cellStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1,
//             },
//             headerStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '10%',
//             }, type: 'currency', currencySetting: { currencyCode: "IDR" }, align: 'center', editable: () => false,
//         },
//         // {
//         //     field: 'sts', title: 'Status', editable: () => false, render: (row) => row.sts ? <div className='bg-green-400 rounded-md p-2 text-center -translate-x-3'>SKBK</div> : null, align: 'center',
//         //     cellStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
//         //     },
//         //     headerStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '10%',
//         //     },
//         // },
//     ]
//     const kolom_ = [
//         {
//             title: 'No',
//             cellStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '2%',
//                 height: '10px', paddingTop: 1, paddingBottom: 1
//             },
//             headerStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%',
//             }, editable: () => false,
//             render: rowData => rowData.tableData.id + 1
//         },
//         {
//             field: 'kampung', title: 'Kampung', editable: () => false, cellStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
//             },
//             headerStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%',
//             },
//         },
//         {
//             field: 'distrik', title: 'Distrik', editable: () => false,
//             cellStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
//             },
//             headerStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%',
//             },
//         },
//         {
//             field: 'thp_advis', title: 'Kegiatan', cellStyle: {
//                 height: '10px', paddingTop: 1, paddingBottom: 1
//             },
//         },
//         {
//             field: 'pagu', title: 'Pagu', cellStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1, type: 'currency', currencySetting: { currencyCode: "IDR" },
//             },
//             headerStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%',
//             }, type: 'currency', currencySetting: { currencyCode: "IDR" },
//         },
//         {
//             field: 'no_spp', title: 'NO SP2SPD', cellStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
//             },
//             headerStyle: {
//                 whiteSpace: 'nowrap',
//                 width: '15%',
//             }, editable: () => false,
//         },
//         //  {
//         //     field: 'tgl_spp', title: 'TGL SP2SPD', cellStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
//         //     },
//         //     headerStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '15%',
//         //     }, type: "date", dateSetting: { locale: "id-ID" }, editable: () => false,
//         // },
//         // {
//         //     field: 'sts', title: 'Status', editable: () => false, render: (row) => <div className='bg-yellow-200 rounded-md p-2 text-center -translate-x-3'>Proses SKBK</div>, align: 'center',
//         //     cellStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
//         //     },
//         //     headerStyle: {
//         //         whiteSpace: 'nowrap',
//         //         width: '15%',
//         //     },
//         // },
//     ]

//     /* Funtiom Update Data */
//     const updateDataChecklist = async (e, ee, eee) => {
//         try {
//             setLoad(true);
//             e.map(async (f, i) => {
//                 const no = await axios.get(`/nodok/${f.kd_kampung}`);
//                 const nodok_ = parseInt(no.data[0].no_spm);
//                 let nomor = '';
//                 let nodok = parseInt((nodok_ + 1))
//                 switch (true) {
//                     case (nodok < 10):
//                         nomor = `000${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`; ///SKBK/ADD1/IBIROMA/2022
//                         console.log('<9', nomor);
//                         break;
//                     case (9 < nodok < 100):
//                         nomor = `00${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`;
//                         console.log('>9', nomor);
//                         break;
//                     case (99 > nodok > 1000):
//                         nomor = `0${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`;
//                         console.log('>99');
//                         break;
//                     case (999 > nodok > 9999):
//                         nomor = `${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`;
//                         console.log('>999');
//                         break;
//                     default:
//                         break;
//                 }
//                 const update = await axios.patch('/anggaran', {
//                     id: f.id, tgl_spm: ee.toISOString().slice(0, 10), sts_spm: eee, no_spm: nomor
//                 })
//                 setChangests(new Date().toISOString());
//                 console.log(update.data.info);
//                 setLoad(false);
//             }
//             )

//         } catch (error) {
//             console.log(error)
//         }
//     }
//     /* Funtiom Update Data */

//     const options = {
//         filtering: kd_lvl1 === 2 ? false : true, paging: true, addRowPosition: "first", actionsColumnIndex: -1,
//         showSelectAllCheckbox: kd_lvl1 === 1 ? true : false, showTextRowsSelected: false, pageSizeOptions: [5, 10, 25, 50, 100], pageSize: 5, selection: true,
//         // selectionProps: barisData => ({
//         //     " disabled: barisData.sts === true",columnsButton:true,
//         // }),
//         columnsButton: true,
//         headerStyle: {
//             fontWeight: 500,
//             height: 10,
//             maxHeight: 10,
//             paddingBottom: 0,
//             paddingTop: -3, position: 'sticky', marginTop: -4
//         },
//         rowStyle: {
//             fontSize: 10, height: 7,
//             maxHeight: 7,
//             padding: 0,
//             margin: 0,
//             rowData: (rowData) => ({
//                 backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
//             })
//         },
//         cellStyle: {
//             height: 8, paddingBottom: 0, paddingTop: 0, margin: 0,
//         },
//         maxBodyHeight: 300,
//         filterCellStyle: {
//             height: 5, paddingTop: 0, margin: 0, paddingBottom: 0
//         },
//         actionsCellStyle: { height: 5 }
//     }
//     const options_ = {
//         filtering: kd_lvl1 === 2 ? false : true, paging: true, addRowPosition: "first", actionsColumnIndex: -1,
//         showSelectAllCheckbox: kd_lvl1 === 1 ? true : false, showTextRowsSelected: false, pageSizeOptions: [5, 10, 25, 50, 100], pageSize: 5,
//         selection: true,
//         // selectionProps: barisData => ({
//         //     disabled: barisData.sts === true,
//         // }),
//         headerStyle: {
//             fontWeight: 600,
//             height: 10,
//             maxHeight: 10,
//             paddingBottom: 0,
//             paddingTop: -3, position: 'sticky', marginTop: -4
//         },
//         rowStyle: {
//             fontSize: 10, height: 7,
//             maxHeight: 7,
//             padding: 0,
//             margin: 0,
//             rowData: (rowData) => ({
//                 backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
//             })
//         },
//         cellStyle: {
//             height: 8, paddingBottom: 0, paddingTop: 0, margin: 0,
//         },
//         maxBodyHeight: 310,
//         filterCellStyle: {
//             height: 5, paddingTop: 0, margin: 0, paddingBottom: 0
//         },
//         actionsCellStyle: { height: 5, padding: 0, margin: 0 }
//     }

//     const localisation = {
//         header: {
//             actions: ['Aksi']
//         },
//         body: {
//             emptyDataSourceMessage: ('Data belum tersedia ... '),
//             addTooltip: ('tambah data'),
//             editTooltip: ('ubah data'),
//             deleteTooltip: ('hapus data'),
//             editRow: {
//                 deleteText: 'Anda yakin menghapus data ini ?',
//                 cancelTooltip: ('Batal'),
//                 saveTooltip: ('Simpan')
//             }
//         }

//     }

//     const editable = {
//         // isEditable: rowData => rowData.sts_spm === false, // only name(a) rows would be editable
//         isEditHidden: rowData => rowData.sts_sp2d === true,
//         // isDeletable: rowData => rowData.sts_spm === false, // only name(b) rows would be deletable,
//         isDeleteHidden: rowData => rowData.sts_sp2d === true,

//         onRowUpdate: (f, dataLama) => new Promise(async (reso, rej) => {
//             setLoad(true);
//             const update = await axios.patch('/anggaran', {
//                 id: f.id, tgl_spm: f.tgl_spm, no_spm: f.no_spm
//             })
//             setChangests(new Date().toISOString());
//             console.log('update ', update.data.info)
//             reso();
//             setLoad(false);
//         }),
//         onRowDelete: (f) => new Promise(async (reso, rej) => {
//             setLoad(true);
//             const del = await axios.patch('/anggaran', {
//                 id: f.id, no_spm: `Dihapus ${new Date().toLocaleString()}`, tgl_spm: '1900-01-01', sts_spm: false, no_sp2d: '', tgl_sp2d: '1900-01-01'
//             })
//             setChangests(new Date().toISOString());
//             console.log('Delete ', del.data.info)
//             reso();
//             setLoad(false);
//         })
//     }



//     const action = [
//         {
//             icon: () => <><PDFDownloadLink document={<DocSpm dataselectspp={dataselectspp} />} fileName={`doc_spd_${new Date().toLocaleTimeString().slice(0, 16)}`}><LocalPrintshopIcon /></PDFDownloadLink></>,
//             tooltip: 'Download Dok SKBK',
//             onClick: ''
//         },
//         {
//             icon: () => <div className='flex'><button onClick={() => previewSpd()} className="mr-2" > <PictureAsPdfIcon /></button></div>,
//             tooltip: 'Preview SKBK',
//             onClick: ''
//         },
//     ]

//     /* Aktion Data Pada saat Select */
//     const onSelectionChange = (e) => setDataSelectspp(e);
//     const onSelectionChange_ = (e) => setDataSelect(e);
//     const onClickTerbitSPP = () => updateDataChecklist(dataselect, tgl, 1);
//     const previewSpd = (e) => setviewprint(true);
//     /* Aktion Data Pada saat Select */

//     /* Actio Untuk Tambah Tombol dan Event */
//     const action_ = [{
//         icon: () => <div className='flex'><button onClick={onClickTerbitSPP} className='mr-2'><BackupIcon /></button>
//             <LocalizationProvider dateAdapter={AdapterDateFns}>
//                 <Stack spacing={3}>
//                     <DatePicker
//                         inputFormat="dd-MM-yyyy"
//                         mask="__-__-____"
//                         views={['day']}
//                         label="Tgl SKBK"
//                         value={tgl}
//                         onChange={(newValue) => {
//                             setTgl(newValue);
//                         }}
//                         renderInput={(params) => <TextField {...params} helperText={null} />}
//                     />
//                 </Stack>
//             </LocalizationProvider>
//         </div>,
//         tooltip: 'Terbitkan SKBK',
//         onClick: ''
//     }]
//     /* Actio Untuk Tambah Tombol dan Event */

//     return (
//         <div>
//             <div>
//                 {load ? <Loader /> : null}
//             </div>
//             <div className='container w-full mx-auto items-center justify-center'>
//                 <div className='mx-auto fixed z-20 w-[70%]'>
//                     <div className='mx-auto justify-center items-center relative'>
//                         <span className={`absolute right-0 text-red-500 bg-slate-400 rounded-full cursor-pointer z-20 w-4 m-4 -translate-x-1/2 items-center text-center ${viewprint ? '' : 'hidden'} `}
//                             onClick={() => setviewprint(false)}> X </span>
//                         <div className='mx-auto'>
//                             {viewprint ?
//                                 <PDFViewer
//                                     style={{ width: "100%", height: "100vh", alignItems: 'center', alignSelf: 'center' }}
//                                 ><DocSpm dataselectspp={dataselectspp} /></PDFViewer> : null}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className='pt-20'>
//                 <div className='mx-auto'>
//                     <div className='container mx-auto'>
//                         <div className='relative container -z-40 mx-auto'>
//                             <div className='absolute min-w-full mx-auto z-10'>
//                                 <MaterialTable
//                                     title="SKBK Terbit"
//                                     options={options}
//                                     icons={tblIcon}
//                                     data={data_}
//                                     localization={localisation}
//                                     columns={kolom}
//                                     actions={action}
//                                     onSelectionChange={onSelectionChange}
//                                     editable={editable}
//                                 />
//                                 <br />
//                                 {kd_lvl1 !== 2 ? <p className='text-blue-700'>*Note: Silahkan Pilih Kegiatan untuk terbitkan SKBK </p> : null}
//                                 <MaterialTable
//                                     options={options_}
//                                     icons={tblIcon}
//                                     columns={kolom_}
//                                     data={data_2}
//                                     title="SKBK Proses"
//                                     localization={localisation}
//                                     onSelectionChange={onSelectionChange_}
//                                     actions={action_}
//                                 />
//                             </div>
//                             <div className='absolute min-w-full mx-auto pt-[440px] z-0'>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default SpmAdd