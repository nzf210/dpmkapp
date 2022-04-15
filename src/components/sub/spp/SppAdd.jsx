import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tblIcon from '../../TableIcon';

//Redux
import { useSelector } from 'react-redux';
//Redux
import axios from 'axios';

import { PDFRenderer, PDFViewer, PDFDownloadLink, renderToFile } from '@react-pdf/renderer';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import BackupIcon from '@mui/icons-material/Backup';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DocSpp from './DocSpp'

const SppAdd = () => {

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const [data_, setData_] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [changests, setChangests] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [dataselect, setDataSelect] = useState([]);
    const [dataselectspp, setDataSelectspp] = useState([]);

    const data = async () => {
        try {
            const respon = await axios.get('/anggaran');
            if (kd_lvl1 === 2) {
                const tes = respon.data.filter((e) => e);
                setData_(tes.filter((e) => e.sts_spd === true && e.kd_kampung === kd_kampung && e.sts === true));
                setData_2(tes.filter((e) => e.sts_spd === false && e.kd_kampung === kd_kampung && e.sts === true));
            } else {
                setData_(respon.data.filter(e => e.sts_spd === true && e.sts === true));
                setData_2(respon.data.filter(e => e.sts_spd === false && e.sts === true));
            }
            console.log('data Anggaran', respon.data)
        } catch (e) {
            console.log('error refresh token', e.message);
        }
    }

    useEffect(
        () => data(),
        [changests]
    )

    const kolom = [
        {
            title: 'No',
            cellStyle: {
                whiteSpace: 'nowrap',
                width: '5%',
                maxWidth: '5%',
                height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            }, editable: () => false,
            render: rowData => rowData.tableData.id + 1
        },
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
                width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '10%',
            },
        },
        {
            field: 'tgl', title: 'Tgl Verifikasi', type: "date", dateSetting: { locale: "id-ID" }, cellStyle: {
                whiteSpace: 'nowrap',
                width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '10%',
            },
        },
        {
            field: 'sts', title: 'Status', editable: () => false, render: (row) => row.sts ? <div className='bg-green-400 rounded-md p-2 text-center -translate-x-3'>Sudah Verifikasi</div> : null, align: 'center',
            cellStyle: {
                whiteSpace: 'nowrap',
                width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '10%',
            },
        },
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
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            }, type: 'currency', currencySetting: { currencyCode: "IDR" },
        },
        {
            field: 'tgl', title: 'TGL Verf APBK', cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
        {
            field: 'sts', title: 'Status', editable: () => false, render: (row) => <div className='bg-yellow-200 rounded-md p-2 text-center -translate-x-3'>Proses SP3B</div>, align: 'center',
            cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
    ]

    /* Funtiom Update Data */
    const updateDataChecklist = async (e) => {
        try {
            const date = new Date();
            const update = await axios.patch('/anggaran', {
                id: e.id,
                tgl: date,
                sts: 1
            })
            setChangests(date);
        } catch (error) {
            console.log('error update ... ', error)
        }
    }
    /* Funtiom Update Data */

    const options = {
        filtering: kd_lvl1 === 2 ? false : true, paging: true, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false, pageSizeOptions: [5, 10, 25, 50, 100], pageSize: 5,
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
            emptyDataSourceMessage: ('sedang memuat data ... '),
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

    let editable = {};
    if (kd_lvl1 === 2) {
        editable = {
            undefined
        }

    } else {
        editable = {
            onRowUpdate: (dataBaru, dataLama) => new Promise((reso, rej) => {
                //updateData(dataBaru, 1);
                console.log('data', dataBaru);
                reso();
            }),
            onRowDelete: (dataLama) => new Promise((reso, rej) => {
                console.log('data', dataLama);
                //hapusDataPejabat(dataLama);
                reso();
            })
        }
    }
    let editable_ = {};
    if (kd_lvl1 === 2) {
        editable = {

        }

    } else {
        editable = {
            onRowUpdate: (dataBaru, dataLama) => new Promise((reso, rej) => {
                //updateData(dataBaru, 1);
                console.log('data', dataBaru);
                reso();
            }),
            onRowDelete: (dataLama) => new Promise((reso, rej) => {
                console.log('data', dataLama);
                //hapusDataPejabat(dataLama);
                reso();
            })
        }
    }

    const action = [
        {
            icon: () => <><PDFDownloadLink document={<DocSpp />} fileName={`doc_spd_${new Date().toLocaleTimeString().slice(0, 16)}`}> {({ loading }) => loading ? '...' : <LocalPrintshopIcon />}</PDFDownloadLink></>,
            tooltip: 'Download Dok SPD',
            onClick: ''
        },
        {
            icon: () => <div className='flex'><button onClick={() => ''} className="mr-2" > <PictureAsPdfIcon /></button></div>,
            tooltip: 'Preview SPD ... ',
            onClick: ''
        },
    ]

    /* Aktion Data Pada saat Select */
    const onSelectionChange = (e) => setDataSelectspp(e);
    const onSelectionChange_ = (e) => setDataSelect(e);
    /* Aktion Data Pada saat Select */

    return (
        <div>
            <div className='pt-20'>
                <div className='mx-auto'>
                    <div className='container mx-auto'>
                        <div className='relative container -z-40 mx-auto'>
                            <div className='absolute min-w-full mx-auto z-10'>
                                <MaterialTable
                                    title="SP3B Terbit"
                                    options={options}
                                    icons={tblIcon}
                                    data={data_}
                                    localization={localisation}
                                    columns={kolom}
                                    actions={action}
                                    onSelectionChange={onSelectionChange}
                                />
                                <br />
                                {kd_lvl1 !== 2 ? <p className='text-blue-700'>*Note: Silahkan Pilih Kegiatan untuk terbitkan SP3B </p> : null}
                                <MaterialTable
                                    options={options_}
                                    icons={tblIcon}
                                    columns={kolom_}
                                    data={data_2}
                                    title="SP3B Proses"
                                    localization={localisation}
                                    onSelectionChange={onSelectionChange_}
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

export default SppAdd