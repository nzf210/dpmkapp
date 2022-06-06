import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component

import 'ag-grid-community/dist/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/dist/styles/ag-theme-alpine.css'; // Optional theme CSS
import axios from 'axios';
// import CurrencyFormat from 'react-currency-format';
import DocSp2ddds from './DocSp2ddds';
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

const Sp2dBlt = () => {

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
    let nmpicker = 'SP2D DDS';

    const [columnDefs] = useState([
        { field: 'kampung', filter: true, minWidth: 150, maxWidth: 150, suppressSizeToFit: true, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true },
        { field: 'distrik', filter: true, minWidth: 150, maxWidth: 150, suppressSizeToFit: true }, //suppressSizeToFit: false 
        { field: 'opt1', headerName: 'Tahap Kegiatan', width: 270, filter: true, suppressSizeToFit: true },
        { field: 'no_sp2d', headerName: 'No SP2D', width: 220, filter: true, suppressSizeToFit: true },
        { field: 'tgl_sp2d', headerName: 'TGL SP2D', width: 220, filter: true, suppressSizeToFit: true, cellRenderer: (e) => <span>{moment(e.value).locale('id').format("DD MMMM YYYY")}</span> },
        {
            headerName: 'Aksi', cellStyle: { textAlign: "right", alignItems: 'right' }, headerClass: 'ag-theme-text-aksi', width: 80, maxWidth: 80,
            cellRenderer: (e) =>
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
                </div>,
        }
    ]);
    const [columnDefs_] = useState([
        { field: 'kampung', filter: true, minWidth: 150, maxWidth: 150, headerCheckboxSelection: true, headerCheckboxSelectionFilteredOnly: true, checkboxSelection: true, },
        { field: 'distrik', filter: true, minWidth: 150, maxWidth: 150, }, //suppressSizeToFit: true
        { field: 'opt1', headerName: 'Tahap Kegiatan', width: 280, filter: true },
        // { field: 'no_spm', headerName: 'No SKBK', width: 220, filter: true, suppressSizeToFit: true },
        // { field: 'tgl_spm', headerName: 'Tgl SKBK', width: 150, cellRenderer: (e) => <span>{moment(e.value).locale('id').format("DD MMMM YYYY")}</span> },
        // { field: 'pagu', width: 150, cellRenderer: (e) => <CurrencyFormat value={e.value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} prefix={'Rp '} /> },
    ]);

    const autoGroupColumnDef = useMemo(() => {
        return {
            headerName: 'Kampung',
            minWidth: 220,
            cellRendererParams: {
                suppressCount: true,
                checkbox: true,
            },
        };
    }, []);
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
        let url = `/anggaran/dds_?page=${page}&size=${perpage}&no_sp2d=hapusnull`;
        if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        if (search) { url += `&kampung=${search}` }
        await axios.get(url).then((e) => {
            setRowData(e.data.result.data.data);
            setCount(e.data.result.data.count);
            setPage(e.data.result.data.page);
            setPerpage(e.data.result.data.per_page);
            setPrev(e.data.result.pagination.previous_page);
            setNext(e.data.result.pagination.next_page);
            //console.log(e.status, 'eeeeeeeeffffff')
            if (e.status === 200) {
                setLoad(false);
            }
        })
        // .then(e => console.log(e))
    }, [page, perpage, dateupdate]);


    // var array = ['John', 'Make', 'Mac', 'David', 'Smith', 'John', 'Mac', 'Make']
    // var filterArray = array.filter(function (item, index) { return array.indexOf(item) >= index; });
    // document.write('Output :- ' + filterArray);


    useEffect(async () => {
        setLoad(true);
        let url = `/anggaran/dds?page=${page_}&size=${perpage_}`;
        //let url = `/anggaran/blt?page=${page_}&size=${perpage_}&sts_spp=true&sts=true&sts_spm=true&kd_keg=2&sts_sp2d=false`;
        //if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        if (search_) { url += `&kampung=${search_}` }
        await axios.get(url).then((e) => {
            // const data = e.data.result.data.data.filter(function (item, pos) {
            //     return item.kd_kampung;
            // })
            //let da = [...new Set(data)];
            // console.log('data new', e.data.result.data.data);
            setRowData_(e.data.result.data.data);
            setCount_(e.data.result.data.count);
            setPage_(e.data.result.data.page);
            setPerpage_(e.data.result.data.per_page);
            setPrev_(e.data.result.pagination.previous_page);
            setNext_(e.data.result.pagination.next_page);
            //console.log(e.status, 'eeeeeeee')
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
        let len = dataprint_.length;
        setLoad(true);
        const nomor = await axios.get(`/nodok/sp2d`);
        const nor = parseInt(nomor.data[0].no_sp2d_gab) + 1;
        try {
            let tgl_sp2d = moment(tgl).locale('id').format("YYYY-MM-DD");
            for (let i = 0; i < len; i++) {
                const { kd_kampung, j_kk, kampung, distrik, nama, no_sk, no_sk_kepala, tgl_sk,
                    nama_kepala, tgl_sk_kepala, bank, rek, no_rek, opt1, sub } = dataprint_[i];
                let sub_ = JSON.stringify(sub);
                console.log('data print i', dataprint_[i], opt1, 'Numbering', numbering(nor, opt1), 'tgl=>', tgl_sp2d)
                //await axios.patch('/anggaran', { id, tgl_sp2d, sts_sp2d: true, no_sp2d: numbering(nor + i, opt1) })
                const hasil = await axios.post('/anggaran/dds', {
                    kd_kampung, j_kk, kampung, distrik, nama, no_sk, no_sk_kepala,
                    tgl_sk, nama_kepala, tgl_sk_kepala, bank, rek, no_rek, opt1, tgl_sp2d, no_sp2d: numbering(nor + i, opt1), sub: sub_
                })
                if ((i + 1) === len) {
                    setLoad(false);
                    setDateUpdate(new Date());
                    console.log('hasil', hasil)
                }
            }
        } catch (error) { console.log(error) }
    }

    const numbering = (v, vv) => {
        let no;
        switch (true) {
            case vv === 'Tahap I':
                no = 'THPI';
                break;
            case vv === 'Tahap II':
                no = 'THPII';
                break;
            default:
                no = 'THPIII'
        }

        switch (true) {
            case v < 10:
                return `000${v}/SP2D-DD/${no}/2022`; //......./SP2D-DD/${no}/2022
            case v < 100:
                return `00${v}/SP2D-DD/${no}/2022`;
            case v < 1000:
                return `0${v}/SP2D-DD/${no}/2022`;
            default:
                return `${v}/SP2D-DD/${no}/2022`;
            //break;
        }
    }
    //================= Terbitkan SP2SPD =========================

    //================= Alert Dialog =========================
    const [open, setOpen] = React.useState(false);
    const handleClickOpen = () => { setOpen(true); };
    const handleClose = () => { setOpen(false); setDialogInfo(false) };
    const onChangeForm = (e) => {
        const { value, id } = e.target;
        console.log(value, id)
        setDataform({ ...dataform, [id]: value })
    }
    const handleUpdateForm = async (e) => { setDataform(e); handleClickOpen(); }
    //========================space Handle Delete===============================
    const handleSubmitForm = async () => {
        const confirm = window.confirm(`Apa Anda Yakin Ubah Data ${dataform.kampung} Distrik ${dataform.distrik} ${dataform.thp_advis} `)
        if (confirm) {
            setLoad(true);
            const tgl_sp2d_ = moment(dataform.tgl_sp2d).locale('id').format("YYYY-MM-DD")
            try {
                console.log('submit', dataform.id, tgl_sp2d_, dataform.no_sp2d)
                const update = await axios.patch('/anggaran/dds', { id: dataform.id, tgl_sp2d: tgl_sp2d_, no_sp2d: dataform.no_sp2d })
                if (update.status === 200) {
                    console.log(update.data.info)
                    handleClose();
                    setInfo(update.data.info);
                    setDateUpdate(Date());
                    setDialogInfo(true);
                    setTimeout(() => {
                        setDialogInfo(false);
                    }, 2000);
                    setLoad(false);
                } else { setDialogInfo(true); setInfo('Gagal Ubah Data') }
            } catch (error) { console.log('Error Update spm reg', error) }
        }
    }
    //================= Alert Dialog =========================
    const handleDelete = async (e) => {
        const confirm = window.confirm(`Apa Anda Yakin Hapus Data ${e.kampung} Distrik ${e.distrik} ${e.thp_advis} `)
        if (confirm) {
            setLoad(true);
            const tgl_sp2d_ = moment(new Date()).locale('id').format("YYYY-MM-DD")
            try {
                console.log('submit', e, 'xxx', e.id)
                const update = await axios.patch('/anggaran/dds', { id: e.id, tgl_sp2d: tgl_sp2d_, no_sp2d: null })
                if (update.status === 200) {
                    //console.log(update.data.info)
                    handleClose();
                    setInfo('Data Berhasil Di Hapus');
                    setDateUpdate(Date());
                    setDialogInfo(true);
                    setTimeout(() => {
                        setDialogInfo(false);
                    }, 2000);
                    setLoad(false);
                } else { setDialogInfo(true); setInfo('Gagal Di Hapus') }
            } catch (error) { console.log('Error Hapus Data', error) }
        }
    }
    //================= btn click cari data ==================
    const btnClick = async () => {
        //setLoad(true);
        let url = `/anggaran/dds_?page=${1}&size=${perpage}&no_sp2d=hpsnull`;
        // let url = `/anggaran/dds_?page=${1}&size=${perpage}&kampung=${search}&sts_spp=${true}&sts=${true}&sts_spm=true&kd_keg=2&sts_sp2d=true`;
        //if (kd_lvl1 === 2) { url += `&kd_kampung=${kd_kampung}` }
        //console.log('urlll', url)
        if (search) { url += `&kampung=${search}` }
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
    const btnClick_ = async () => {
        setLoad(true);
        let url = `/anggaran/dds?page=${1}&size=${perpage_}`;
        // let url = `/anggaran/dds?page=${1}&size=${perpage_}&kampung=${search_}&sts_spp=${true}&sts=${true}&sts_spm=true&kd_keg=2&sts_sp2d=false`;
        if (search_) { url += `&kampung=${search_}` }
        await axios.get(url).then((e) => {
            setRowData_(e.data.result.data.data);
            setCount_(e.data.result.data.count);
            setPage_(e.data.result.data.page);
            setPerpage_(e.data.result.data.per_page);
            setPrev_(e.data.result.pagination.previous_page);
            setNext_(e.data.result.pagination.next_page);
            if (e.status === 200) {
                setDateUpdate(new Date())
            }
        })
    }
    //================= btn click cari data ==================

    const onSelectionChanged = (e) => {
        let selectedRows = e.api.getSelectedRows();
        let data = [...selectedRows]
        // if (data[0].sub !== undefined) {
        //     var arr = JSON.parse(data[0].sub);
        //     console.log('onselect', arr)
        // }
        //if (JSON.parse(data[0].sub)[0].pagu) {
        let a;
        a = JSON.parse((data[0] && data[0].sub) ? data[0].sub : '[{}]')[0].pagu;
        console.log(a)
        console.log(data)

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
                            ><DocSp2ddds dataselectspp={dataVprint} /></PDFViewer>
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
                                <><PDFDownloadLink placeholder='Print Data PDF' document={<DocSp2ddds dataselectspp={dataDlprint} />} fileName={`doc_spp-reg_${new Date().toLocaleTimeString().slice(0, 16)}`}>
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
                                    <AlertDialog open={open} handleClose={handleClose} dataform={dataform} onChange={onChangeForm} handleSubmit={handleSubmitForm} nmpicker={nmpicker} ns={`SP2D`} />
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
                                <DatePicker tgl={tgl} setTgl={(e) => { setTgl(e); console.log(e) }} nmpicker={nmpicker} />
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
                                        autoGroupColumnDef={autoGroupColumnDef}
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

export default Sp2dBlt
