import React, { useEffect, useState } from 'react';
import MaterialTable, { MTableBodyRow, MTableEditRow } from 'material-table';
import tblIcon from '../../TableIcon';



//Redux
import { useSelector } from 'react-redux';
//Redux
import axios from 'axios';
import { makeStyles } from '@mui/styles';


const useStyles = makeStyles({
    tableRow: {
        '& td': {
            // border: '1px solid black !important',
            padding: 0, margin: 0, height: 8
        }
    }
});

const ApbkMonitoring = () => {

    const classes = useStyles();
    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const [data_, setData_] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [changests, setChangests] = useState('');
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedRow_, setSelectedRow_] = useState(null);


    const data = async () => {
        try {
            const respon = await axios.get('/anggaran');
            if (kd_lvl1 === 2) {
                const tes = respon.data.filter((e) => e);
                setData_(tes.filter((e) => e.sts === true && e.kd_kampung === kd_kampung));
                setData_2(tes.filter((e) => e.sts === false && e.kd_kampung === kd_kampung));
            } else {
                setData_(respon.data.filter(e => e.sts === true));
                setData_2(respon.data.filter(e => e.sts === false));
            }
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
                width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1, type: 'currency', currencySetting: { currencyCode: "IDR" }
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
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1, type: 'currency', currencySetting: { currencyCode: "IDR" }
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
        {
            field: 'sts', title: 'Status', editable: () => false, render: (row) => <div className='bg-yellow-200 rounded-md p-2 text-center -translate-x-3'>Proses Verifikasi</div>, align: 'center',
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
        pageSizeOptions: [5, 10, 25, 50, 100], filtering: kd_lvl1 === 2 ? false : true, paging: true, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false, pageSize: 5,
        selectionProps: barisData => ({
            disabled: barisData.sts === true,
        }),
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
        selection: kd_lvl2 === 2 ? false : true,
        selectionProps: barisData => ({
            disabled: barisData.sts === true,
        }),
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
        maxBodyHeight: 280,
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
            emptyDataSourceMessage: ('sedang memuat data atau data sudah tidak tersedia'),
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

    /* Aktion Data Pada saat Select */
    const onSelectionChange = (rows) => rows.map((e) => updateDataChecklist(e));
    /* Aktion Data Pada saat Select */


    return (
        <div>
            <div className='pt-20'>
                <div className='mx-auto'>
                    <div className='container mx-auto'>
                        <div className='relative container -z-40 mx-auto'>
                            <div className='absolute min-w-full mx-auto z-10'>
                                <MaterialTable
                                    title="Daftar APBK Telah Verifikasi "
                                    options={options}
                                    icons={tblIcon}
                                    data={data_}
                                    localization={localisation}
                                    columns={kolom}
                                    onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}

                                />
                                <br />
                                {kd_lvl1 !== 2 ? <p className='text-blue-700'>*Note: Untuk Verifikasi APBK Silahkan Ceklist dan Akan Pindah Ke Daftar Yang Telah Verifikasi </p> : null}
                                <MaterialTable
                                    options={options_}
                                    icons={tblIcon}
                                    columns={kolom_}
                                    data={data_2}
                                    title="Daftar APBK Proses Verifikasi "
                                    localization={localisation}
                                    editable={editable_}
                                    onSelectionChange={onSelectionChange}
                                    onRowClick={((evt, selectedRow_) => setSelectedRow_(selectedRow_.tableData.id))}
                                    components={{
                                        Row: props => <MTableBodyRow {...props} className={classes.tableRow} />,
                                        EditRow: props => <MTableEditRow {...props} className={classes.tableRow} />,
                                    }}
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

export default ApbkMonitoring

