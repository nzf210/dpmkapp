import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tblIcon from '../../TableIcon';

/* DAte Picker */
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
//import indo from 'date-fns/locale/id';
/* DAte Picker */

//Redux
import { useSelector } from 'react-redux';
//Redux
import axios from 'axios';

import { PDFDownloadLink, PDFViewer } from '@react-pdf/renderer';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import BackupIcon from '@mui/icons-material/Backup';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DocSpm from './DocSpm';
import { Loader } from '../Font';

const SpmAdd = () => {

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const [data_, setData_] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [changests, setChangests] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [dataselect, setDataSelect] = useState([]);
    const [dataselectspp, setDataSelectspp] = useState([]);
    const date = new Date();
    const [tgl, setTgl] = useState(date);
    const [viewprint, setviewprint] = useState(false);
    const [load, setLoad] = useState(false);

    const data = async () => {
        try {
            setLoad(true);
            const respon = await axios.get('/anggaran/add');
            if (kd_lvl1 === 2) {
                const tes = respon.data.filter((e) => e);
                setData_(tes.filter((e) => e.sts === true && e.sts_spp === true && e.kd_kampung === kd_kampung && e.kd_keg === 4 && e.sts_spm === true));
                setData_2(tes.filter((e) => e.sts === true && e.sts_spp === true && e.kd_kampung === kd_kampung && e.kd_keg === 4 && e.sts_spm === false));
            } else {
                setData_(respon.data.filter(e => e.sts === true && e.sts_spp === true && e.kd_keg === 4 && e.sts_spm === true));
                setData_2(respon.data.filter(e => e.sts === true && e.sts_spp === true && e.kd_keg === 4 && e.sts_spm === false));
            }
            //console.log('data Anggaran', respon.data)
            setLoad(false);
        } catch (e) {
            console.log('error refresh token', e.message);
        }
    }

    useEffect(
        () => data(),
        [changests]
    )

    const kolom = [
        // {
        //     title: 'No',
        //     cellStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '5%',
        //         maxWidth: '5%',
        //         height: '10px', paddingTop: 1, paddingBottom: 1
        //     },
        //     headerStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '15%',
        //     }, editable: () => false,
        //     render: rowData => rowData.tableData.id + 1
        // }, 
        {
            field: 'kampung', title: 'Kampung',
            cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
                height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            }, editable: () => false,
        }, {
            field: 'distrik', title: 'Distrik', editable: () => false,
            cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        }, {
            field: 'thp_advis', title: 'Kegiatan', cellStyle: {
                height: '10px', paddingTop: 1, paddingBottom: 1
            }, editable: () => false,
        },
        // {
        //     field: 'no_spp', title: 'NO SP2SPD', cellStyle: {
        //         height: '10px', paddingTop: 1, paddingBottom: 1
        //     }, editable: () => false,
        // }, {
        //     field: 'tgl_spp', title: 'Tgl SP2SPD', type: "date", dateSetting: { locale: "id-ID" }, cellStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
        //     },
        //     headerStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '10%',
        //     }, editable: () => false,
        // }, 
        {
            field: 'no_spm', title: 'NO SKBK', cellStyle: {
                height: '10px', paddingTop: 1, paddingBottom: 1
            }
        }, {
            field: 'tgl_spm', title: 'Tgl SKBK', type: "date", dateSetting: { locale: "id-ID" }, cellStyle: {
                whiteSpace: 'nowrap', width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
            }, headerStyle: { whiteSpace: 'nowrap', width: '10%', },
        },
        {
            field: 'pagu', title: 'Pagu', cellStyle: {
                whiteSpace: 'nowrap',
                width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1,
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '10%',
            }, type: 'currency', currencySetting: { currencyCode: "IDR" }, align: 'center', editable: () => false,
        },
        // {
        //     field: 'sts', title: 'Status', editable: () => false, render: (row) => row.sts ? <div className='bg-green-400 rounded-md p-2 text-center -translate-x-3'>SKBK</div> : null, align: 'center',
        //     cellStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
        //     },
        //     headerStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '10%',
        //     },
        // },
    ]
    const kolom_ = [
        {
            title: 'No',
            cellStyle: {
                whiteSpace: 'nowrap',
                width: '2%',
                height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            }, editable: () => false,
            render: rowData => rowData.tableData.id + 1
        },
        {
            field: 'kampung', title: 'Kampung', editable: () => false, cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
        {
            field: 'distrik', title: 'Distrik', editable: () => false,
            cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
        {
            field: 'thp_advis', title: 'Kegiatan', cellStyle: {
                height: '10px', paddingTop: 1, paddingBottom: 1
            },
        },
        {
            field: 'pagu', title: 'Pagu', cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1, type: 'currency', currencySetting: { currencyCode: "IDR" },
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            }, type: 'currency', currencySetting: { currencyCode: "IDR" },
        },
        {
            field: 'no_spp', title: 'NO SP2SPD', cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            }, editable: () => false,
        },
        //  {
        //     field: 'tgl_spp', title: 'TGL SP2SPD', cellStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
        //     },
        //     headerStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '15%',
        //     }, type: "date", dateSetting: { locale: "id-ID" }, editable: () => false,
        // },
        // {
        //     field: 'sts', title: 'Status', editable: () => false, render: (row) => <div className='bg-yellow-200 rounded-md p-2 text-center -translate-x-3'>Proses SKBK</div>, align: 'center',
        //     cellStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
        //     },
        //     headerStyle: {
        //         whiteSpace: 'nowrap',
        //         width: '15%',
        //     },
        // },
    ]

    /* Funtiom Update Data */
    const updateDataChecklist = async (e, ee, eee) => {
        try {
            setLoad(true);
            e.map(async (f, i) => {
                const no = await axios.get(`/nodok/${f.kd_kampung}`);
                const nodok_ = parseInt(no.data[0].no_spm);
                let nomor = '';
                let nodok = parseInt((nodok_ + 1))
                switch (true) {
                    case (nodok < 10):
                        nomor = `000${nodok}/SKBK/${f.opt2}/${f.kampung}/2022`; ///SKBK/ADD1/IBIROMA/2022
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
                const update = await axios.patch('/anggaran', {
                    id: f.id, tgl_spm: ee.toISOString().slice(0, 10), sts_spm: eee, no_spm: nomor
                })
                setChangests(new Date().toISOString());
                console.log(update.data.info);
                setLoad(false);
            }
            )

        } catch (error) {
            console.log(error)
        }
    }
    /* Funtiom Update Data */

    const options = {
        filtering: kd_lvl1 === 2 ? false : true, paging: true, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false, pageSizeOptions: [5, 10, 25, 50, 100], pageSize: 5, selection: true,
        // selectionProps: barisData => ({
        //     " disabled: barisData.sts === true",
        // }),
        headerStyle: {
            fontWeight: 600,
            height: 10,
            maxHeight: 10,
            paddingBottom: 0,
            paddingTop: -3, position: 'sticky', marginTop: -4
        },
        rowStyle: {
            fontSize: 10, height: 7,
            maxHeight: 7,
            padding: 0,
            margin: 0,
            rowData: (rowData) => ({
                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
            })
        },
        cellStyle: {
            height: 8, paddingBottom: 0, paddingTop: 0, margin: 0,
        },
        maxBodyHeight: 300,
        filterCellStyle: {
            height: 5, paddingTop: 0, margin: 0, paddingBottom: 0
        },
        actionsCellStyle: { height: 5 }
    }
    const options_ = {
        filtering: kd_lvl1 === 2 ? false : true, paging: true, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false, pageSizeOptions: [5, 10, 25, 50, 100], pageSize: 5,
        selection: true,
        // selectionProps: barisData => ({
        //     disabled: barisData.sts === true,
        // }),
        headerStyle: {
            fontWeight: 600,
            height: 10,
            maxHeight: 10,
            paddingBottom: 0,
            paddingTop: -3, position: 'sticky', marginTop: -4
        },
        rowStyle: {
            fontSize: 10, height: 7,
            maxHeight: 7,
            padding: 0,
            margin: 0,
            rowData: (rowData) => ({
                backgroundColor: (selectedRow === rowData.tableData.id) ? '#EEE' : '#FFF'
            })
        },
        cellStyle: {
            height: 8, paddingBottom: 0, paddingTop: 0, margin: 0,
        },
        maxBodyHeight: 310,
        filterCellStyle: {
            height: 5, paddingTop: 0, margin: 0, paddingBottom: 0
        },
        actionsCellStyle: { height: 5, padding: 0, margin: 0 }
    }

    const localisation = {
        header: {
            actions: ['Aksi']
        },
        body: {
            emptyDataSourceMessage: ('Data belum tersedia ... '),
            addTooltip: ('tambah data'),
            editTooltip: ('ubah data'),
            deleteTooltip: ('hapus data'),
            editRow: {
                deleteText: 'Anda yakin menghapus data ini ?',
                cancelTooltip: ('Batal'),
                saveTooltip: ('Simpan')
            }
        }

    }

    const editable = {
        // isEditable: rowData => rowData.sts_spm === false, // only name(a) rows would be editable
        isEditHidden: rowData => rowData.sts_sp2d === true,
        // isDeletable: rowData => rowData.sts_spm === false, // only name(b) rows would be deletable,
        isDeleteHidden: rowData => rowData.sts_sp2d === true,

        onRowUpdate: (f, dataLama) => new Promise(async (reso, rej) => {
            setLoad(true);
            const update = await axios.patch('/anggaran', {
                id: f.id, tgl_spm: f.tgl_spm, no_spm: f.no_spm
            })
            setChangests(new Date().toISOString());
            console.log('update ', update.data.info)
            reso();
            setLoad(false);
        }),
        onRowDelete: (f) => new Promise(async (reso, rej) => {
            setLoad(true);
            const del = await axios.patch('/anggaran', {
                id: f.id, no_spm: `Dihapus ${new Date().toLocaleString()}`, tgl_spm: '1900-01-01', sts_spm: false, no_sp2d: '', tgl_sp2d: '1900-01-01'
            })
            setChangests(new Date().toISOString());
            console.log('Delete ', del.data.info)
            reso();
            setLoad(false);
        })
    }



    const action = [
        {
            icon: () => <><PDFDownloadLink document={<DocSpm dataselectspp={dataselectspp} />} fileName={`doc_spd_${new Date().toLocaleTimeString().slice(0, 16)}`}><LocalPrintshopIcon /></PDFDownloadLink></>,
            tooltip: 'Download Dok SKBK',
            onClick: ''
        },
        {
            icon: () => <div className='flex'><button onClick={() => previewSpd()} className="mr-2" > <PictureAsPdfIcon /></button></div>,
            tooltip: 'Preview SKBK',
            onClick: ''
        },
    ]

    /* Aktion Data Pada saat Select */
    const onSelectionChange = (e) => setDataSelectspp(e);
    const onSelectionChange_ = (e) => setDataSelect(e);
    const onClickTerbitSPP = () => updateDataChecklist(dataselect, tgl, 1);
    const previewSpd = (e) => setviewprint(true);
    /* Aktion Data Pada saat Select */

    /* Actio Untuk Tambah Tombol dan Event */
    const action_ = [{
        icon: () => <div className='flex'><button onClick={onClickTerbitSPP} className='mr-2'><BackupIcon /></button>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DatePicker
                        inputFormat="dd-MM-yyyy"
                        mask="__-__-____"
                        views={['day']}
                        label="Tgl SKBK"
                        value={tgl}
                        onChange={(newValue) => {
                            setTgl(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>,
        tooltip: 'Terbitkan SKBK',
        onClick: ''
    }]
    /* Actio Untuk Tambah Tombol dan Event */

    return (
        <div>
            <div>
                {load ? <Loader /> : null}
            </div>
            <div className='container w-full mx-auto items-center justify-center'>
                <div className='mx-auto fixed z-20 w-[70%]'>
                    <div className='mx-auto justify-center items-center relative'>
                        <span className={`absolute right-0 text-red-500 bg-slate-400 rounded-full cursor-pointer z-20 w-4 m-4 -translate-x-1/2 items-center text-center ${viewprint ? '' : 'hidden'} `}
                            onClick={() => setviewprint(false)}> X </span>
                        <div className='mx-auto'>
                            {viewprint ?
                                <PDFViewer
                                    style={{ width: "100%", height: "100vh", alignItems: 'center', alignSelf: 'center' }}
                                ><DocSpm dataselectspp={dataselectspp} /></PDFViewer> : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-20'>
                <div className='mx-auto'>
                    <div className='container mx-auto'>
                        <div className='relative container -z-40 mx-auto'>
                            <div className='absolute min-w-full mx-auto z-10'>
                                <MaterialTable
                                    title="SKBK Terbit"
                                    options={options}
                                    icons={tblIcon}
                                    data={data_}
                                    localization={localisation}
                                    columns={kolom}
                                    actions={action}
                                    onSelectionChange={onSelectionChange}
                                    editable={editable}
                                />
                                <br />
                                {kd_lvl1 !== 2 ? <p className='text-blue-700'>*Note: Silahkan Pilih Kegiatan untuk terbitkan SKBK </p> : null}
                                <MaterialTable
                                    options={options_}
                                    icons={tblIcon}
                                    columns={kolom_}
                                    data={data_2}
                                    title="SKBK Proses"
                                    localization={localisation}
                                    onSelectionChange={onSelectionChange_}
                                    actions={action_}
                                />
                            </div>
                            <div className='absolute min-w-full mx-auto pt-[440px] z-0'>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SpmAdd