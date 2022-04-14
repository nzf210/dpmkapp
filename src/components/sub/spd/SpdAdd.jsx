import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import BackupIcon from '@mui/icons-material/Backup';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tblIcon from '../../TableIcon';


/* DAte Picker */
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import Stack from '@mui/material/Stack';
import indo from 'date-fns/locale/id';
/* DAte Picker */

//Redux
import { useSelector } from 'react-redux';
//Redux
import axios from 'axios';

/* Data PDF */
import SpdDoc from './SpdDoc';
import { PDFRenderer, PDFViewer, PDFDownloadLink, renderToFile } from '@react-pdf/renderer';
import { Button } from '@mui/material';

/* Data PDF */


const SpdAdd = () => {
    const date = new Date();

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const [data_, setData_] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [changests, setChangests] = useState('');
    const [tgl, setTgl] = useState(date);
    const [dataselect, setDataSelect] = useState('');
    const [dataselectspd, setDataSelectspd] = useState([]);
    const [viewprint, setviewprint] = useState(false);

    const data = async () => {
        try {
            const respon = await axios.get('/anggaran');
            console.log('data spd', respon.data)
            setData_(respon.data.filter(e => e.sts_spd === true && e.kd_keg === 4 && e.sts === true));
            setData_2(respon.data.filter(e => e.sts_spd === false && e.kd_keg === 4 && e.sts === true));
        } catch (e) {
            console.log('error refresh token', e.message);
        }
    }

    useEffect(
        () => data(),
        [changests]
    )



    const kolom = [
        { field: 'thp_advis', title: 'Kegiatan', editable: () => false },
        { field: 'pagu', title: 'Pagu', editable: () => false, type: 'currency', currencySetting: { currencyCode: "IDR" }, align: 'center' },
        { field: 'nama', title: 'Bendahara' },
        { field: 'no_spd', title: 'No SPD' },
        { field: 'tgl_spd', title: 'Tgl SPD', type: "date", dateSetting: { locale: "id-ID" } },
        { field: 'kampung', title: 'Kampung', editable: () => false },
        { field: 'distrik', title: 'Distrik', editable: () => false },
        { field: 'sts_spd', title: 'Status', editable: () => false, render: (row) => row.sts_spd ? <div className='bg-green-400 rounded-md p-2 text-center -translate-x-3'>SPD Terbit</div> : null, align: 'center' },
    ]
    const kolom_ = [{
        field: 'thp_advis', title: 'Kegiatan'
    },
    { field: 'pagu', title: 'Pagu', editable: () => false, type: 'currency', currencySetting: { currencyCode: "IDR" }, align: 'center' },
    { field: 'tgl', title: 'Tgl Verf APBK', type: "date", dateSetting: { locale: "id-ID" } },
    { field: 'kampung', title: 'Kampung', editable: () => false },
    { field: 'distrik', title: 'Distrik', editable: () => false },
    { field: 'sts', title: 'Status', editable: () => false, render: (row) => <div className='bg-yellow-200 rounded-md p-2 text-center -translate-x-3'>Proses SPD</div>, align: 'center' },
    ]


    const options = {
        filtering: true, paging: false, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: true, showTextRowsSelected: false, selection: true,
        // selectionProps: barisData => ({
        //     disabled: barisData.sts === true,
        // }),
        headerStyle: {
            backgroundColor: '', fontWeight: 800
        },
        maxBodyHeight: 500,
    }

    const options_ = {
        rowStyle: (rowData) => ({ fontWeight: rowData.sts === true ? 600 : 300, }),
        pageSizeOptions: [5, 10, 25, 50, 100], filtering: true, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: true, showTextRowsSelected: false,
        selection: true,
        headerStyle: {
            backgroundColor: '', fontWeight: 800
        },
        // selectionProps: brs => ({
        //     disabled: brs.sts,
        // })
    }

    const localisation = {
        header: {
            actions: ['Aksi']
        },

        body: {
            emptyDataSourceMessage: ('sedang memuat data ... '),
            addTooltip: ('tambah data'),
            editTooltip: ('ubah data'),
            deleteTooltip: ('hapus data'),
            editRow: {
                deleteText: 'Anda yakin menghapus data ini, akan menghapus data SPD, SPP, SPM, SP2D ?',
                cancelTooltip: ('Batal'),
                saveTooltip: ('Simpan')
            }
        }

    }

    let editable = {
        onRowUpdate: (e, dataLama) => new Promise(async (reso, rej) => {
            console.log('data edit', e);
            try {
                const update = await axios.patch('/anggaran', {
                    id: e.id, tgl_spd: e.tgl_spd, no_spd: e.no_spd
                })
                setChangests(date);
                console.log('Update SPD', update.data.info);
            } catch (error) {
                console.log(error)
            }
            reso();
        }),
        onRowDelete: (e) => new Promise(async (reso, rej) => {
            console.log('data edit 2', e);
            try {
                const update = await axios.patch('/anggaran', {
                    id: e.id, tgl_spd: '1900-01-01', tgl_spp: '1900-01-01', tgl_spm: '1900-01-01', tgl_sp2d: '1900-01-01', sts_spd: 0, sts_spp: 0, sts_spm: 0, sts_sp2d: 0,
                })
                setChangests(date);
                console.log('Update SPD', update.data.info);

            } catch (error) {
                console.log(error)
            }
            reso();
        })
    }

    let editable_ = {
        onRowUpdate: (dataBaru, dataLama) => new Promise((reso, rej) => {
            //updateData(dataBaru, 1);
            console.log('data edit_', dataBaru);
            reso();
        }),
        onRowDelete: (dataLama) => new Promise((reso, rej) => {
            console.log('data edit 2_', dataLama);
            //hapusDataPejabat(dataLama);
            reso();
        })
    }


    /* Funtiom Update Data */
    const updateDataChecklist = async (e, ee) => {
        try {
            const no = await axios.get('/nodok');
            const nodok_ = parseInt(no.data[0].no_spd);
            let nomor = '';
            e.map(async (f, i) => {
                let nodok = parseInt((nodok_ + 1) + i)
                switch (true) {
                    case (nodok < 10):
                        nomor = `000${nodok}/SPD-DPMK/2022`;
                        console.log('<9', nomor);
                        break;
                    case (9 < nodok < 100):
                        nomor = `00${nodok}/SPD-DPMK/2022`
                        console.log('>9', nomor);
                        break;
                    case (99 > nodok > 1000):
                        nomor = `0${nodok}/SPD-DPMK/2022`
                        console.log('>99');
                        break;
                    case (999 > nodok > 9999):
                        nomor = `${nodok}/SPD-DPMK/2022`
                        console.log('>999');
                        break;
                    default:
                        break;
                }
                const update = await axios.patch('/anggaran', {
                    id: f.id, tgl_spd: ee.toISOString().slice(0, 10), sts_spd: 1, no_spd: nomor
                })
                setChangests(date);
                console.log(update.data.info);
            }
            )

        } catch (error) {
            console.log(error)
        }
    }
    /* Funtiom Update Data */

    /* Aktion Data Pada saat Select */
    const onSelectionChange = (e) => setDataSelectspd(e);
    const onSelectionChange_ = (e) => setDataSelect(e);
    const onRowSelected = (e) => console.log('select', e);
    const onClickTerbitSPD = () => updateDataChecklist(dataselect, tgl);
    const cetakSpd = (e) => '<SPDDocq />'
        ;
    const previewSpd = (e) => setviewprint(true);
    /* Aktion Data Pada saat Select */

    /* Actio Untuk Tambah Tombol dan Event */
    const action = [
        {
            icon: () => <><PDFDownloadLink document={<SpdDoc dataselectspd={dataselectspd} />} fileName={`doc_spd_${new Date().toLocaleTimeString().slice(0, 16)}`}><button type='button' /><LocalPrintshopIcon /></PDFDownloadLink></>,
            tooltip: 'Download Dok SPD',
            onClick: ''
        },
        {
            icon: () => <div className='flex'><button onClick={() => previewSpd()} className="mr-2" > <PictureAsPdfIcon /></button></div>,
            tooltip: 'Preview SPD ... ',
            onClick: ''
        },

    ]
    const action_ = [{
        icon: () => <div className='flex'><button onClick={onClickTerbitSPD} className='mr-2 translate-y-2'><BackupIcon /></button>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Stack spacing={3}>
                    <DatePicker
                        inputFormat="dd-MM-yyyy"
                        mask="__-__-____"
                        views={['day']}
                        label="Tgl SPD"
                        value={tgl}
                        onChange={(newValue) => {
                            setTgl(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} helperText={null} />}
                    />
                </Stack>
            </LocalizationProvider>
        </div>,
        tooltip: 'Terbitkan SPD ... ',
        onClick: ''
    }]
    /* Actio Untuk Tambah Tombol dan Event */

    return (
        <div>
            <div className='container w-full mx-auto items-center justify-center'>
                <div className='mx-auto'>
                    <div className='mx-auto justify-center items-center relative'>
                        <span className={`absolute right-0 text-red-500 bg-slate-400 rounded-full cursor-pointer z-20 w-4 m-4 -translate-x-1/2 items-center text-center ${viewprint ? '' : 'hidden'} `}
                            onClick={() => setviewprint(false)}> X </span>
                        <div className='mx-auto'>
                            {viewprint ?
                                <PDFViewer
                                    style={{ width: "100%", height: "100vh", alignItems: 'center', alignSelf: 'center' }}
                                ><SpdDoc dataselectspd={dataselectspd} /></PDFViewer> : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className='pt-32'>
                <div className='mx-auto'>
                    <div className='container mx-auto'>
                        <div className='relative container -z-40 mx-auto'>
                            <div className='absolute min-w-full mx-auto z-10'>
                                <MaterialTable
                                    title="SPD Terbit  "
                                    options={options}
                                    icons={tblIcon}
                                    data={data_}
                                    localization={localisation}
                                    columns={kolom}
                                    editable={editable}
                                    onSelectionChange={onSelectionChange}
                                    actions={action}
                                />
                                <br />
                                <p className='text-blue-700'>*Note: Silahkan Pilih Kegiatan untuk Penerbitan SPD </p>
                                <MaterialTable
                                    options={options_}
                                    icons={tblIcon}
                                    columns={kolom_}
                                    data={data_2}
                                    title="SPD Dalam Proses"
                                    localization={localisation}
                                    // editable={editable_}
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

export default SpdAdd
