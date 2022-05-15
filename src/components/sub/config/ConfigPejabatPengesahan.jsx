import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tblIcon from '../../TableIcon';

//Redux
import { useSelector } from 'react-redux';
//Redux
import axios from 'axios';

const ConfigPejabatPengesahan = () => {

    const { kd_kampung, kd_lvl1 } = useSelector(state => state.userLogin);
    // const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const [data_, setData_] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [changests, setChangests] = useState('');


    const data = async () => {
        try {
            const respon = await axios.get('/ppengesahan');
            const tes = respon.data.filter((e) => e.kd_kampung === kd_kampung);
            if (kd_lvl1 === 2) {
                setData_(tes.filter((e) => e.kd_jbtn === 1));
                setData_2(tes.filter((e) => e.kd_jbtn === 3));
            } else {
                setData_(respon.data.filter(e => e.kd_jbtn === 1));
                setData_2(respon.data.filter(e => e.kd_jbtn === 3));
            }
        } catch (e) {
            console.log('error refresh token', e.message);
        }
    }


    // console.log('datadata lebve', kd_lvl1, 'data', data(), 'dattttt ')

    const kolom = [
        { field: 'nama', title: 'Nama' }, {
            field: 'jabatan', title: 'Jabatan', editable: () => false, cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
        { field: 'kampung', title: 'Kampung', editable: () => false },
        { field: 'distrik', title: 'Distrik', editable: () => false },
        {
            field: 'no_sk', title: 'No SK', cellStyle: {
                whiteSpace: 'nowrap',
                width: '15%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
        {
            field: 'tgl_sk', title: 'Tgl SK', type: "date", dateSetting: { locale: "id-ID" }, cellStyle: {
                whiteSpace: 'nowrap',
                width: '8%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
        {
            field: 'sts', title: 'Status', editable: () => false, render: (row) => row.sts ? <div className='bg-green-400 rounded-md p-2 text-center -translate-x-3'>Aktif</div> : null, align: 'center',
            cellStyle: {
                whiteSpace: 'nowrap',
                width: '10%', height: '10px', paddingTop: 1, paddingBottom: 1
            },
            headerStyle: {
                whiteSpace: 'nowrap',
                width: '15%',
            },
        },
    ]


    /*  Update data Pejabat Pengesahan */
    const updateData = async (e, ee) => {
        try {
            await axios.patch('/ppengesahan', {
                id: e.id,
                nama: e.nama,
                no_sk: e.no_sk,
                kd_jbtn: ee,
                kd_kampung: e.kd_kampung,
                tgl_sk: e.tgl_sk,
                sts: 1
            })
            const date = new Date();
            setChangests(date);
        } catch (error) {
            console.log('error update ... ', error)
        }
    }
    const onSelectionChange = (rows) => updateData(rows[0], 1);
    const onSelectionChange_ = (rows) => updateData(rows[0], 3);

    useEffect(
        () => data(),
        [changests]
    )

    /*  Update data Pejabat Pengesahan */

    /* Tambah Data Pejabat Pengesahan */
    const tambahData = async (e, ee) => {
        try {
            await axios.post('/ppengesahan', {
                nama: e.nama,
                no_sk: e.no_sk,
                kd_jbtn: ee,
                kd_kampung: kd_kampung,
                tgl_sk: e.tgl_sk,
                sts: 1
            })
            const date = new Date();
            setChangests(date);
        } catch (error) {
            console.log('error tambah Kepala Kampung', error);
        }
    }
    /* Tambah Data Pejabat Pengesahan */


    /* Hapus Data Pejabat Pengesahan */
    const hapusDataPejabat = async (e) => {
        try {
            const hapus = await axios.delete('/ppengesahan', {
                data: {
                    id: e.id,
                    kd_jbtn: e.kd_jbtn,
                    kd_kampung: e.kd_kampung
                }
            })
            const date = new Date();
            setChangests(date);
            console.log(hapus.data.info)
        } catch (error) {
            console.log(error);
        }
    }
    /* Hapus Data Pejabat Pengesahan */

    // const actions = [{
    //     icon: 'delete',
    //     tooltip: 'Hapus data'
    // }]

    const option = {
        rowStyle: (rowData) => ({
            // backgroundColor:
            //     rowData.sts === true ? 'rgb(176, 196, 222)' : "#FFF",
            fontWeight:
                rowData.sts === true ? 600 : 300,
            height: 8, fontSize: 10,

        }),
        pageSizeOptions: [5], filtering: kd_lvl1 === 2 ? false : true, paging: false, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false,
        selection: true,
        selectionProps: barisData => ({
            disabled: barisData.sts === true,
        }),
        headerStyle: {
            fontWeight: 600,
            height: 10,
            maxHeight: 10,
            paddingBottom: 0,
            paddingTop: -13, position: 'sticky', marginTop: -14
        },
        maxBodyHeight: 500,
    }

    let editable = {};
    if (kd_lvl1 === 2) {
        editable = {
            onRowAdd: (barisBaru) =>
                new Promise((reso, rej) => {
                    try {
                        tambahData(barisBaru, 1);
                    } catch (error) {
                        console.log(error)
                    }
                    reso();
                }),
            onRowUpdate: (dataBaru, dataLama) => new Promise((reso, rej) => {
                updateData(dataBaru, 1);
                reso();
            }),
            onRowDelete: (dataLama) => new Promise((reso, rej) => {
                hapusDataPejabat(dataLama);
                reso();
            })
        }

    } else {
        editable = {
            onRowUpdate: (dataBaru, dataLama) => new Promise((reso, rej) => {
                updateData(dataBaru, 1);
                reso();
            }),
            onRowDelete: (dataLama) => new Promise((reso, rej) => {
                console.log('data', dataLama);
                hapusDataPejabat(dataLama);
                reso();
            })
        }
    }
    let editable_ = {};
    if (kd_lvl1 === 2) {
        editable_ = {
            onRowAdd: (barisBaru) =>
                new Promise((reso, rej) => {
                    try {
                        tambahData(barisBaru, 3);
                    } catch (error) {
                        console.log(error)
                    }
                    reso();
                }),
            onRowUpdate: (dataBaru, dataLama) => new Promise((reso, rej) => {
                updateData(dataBaru, 3);
                reso();
            }),
            onRowDelete: (dataLama) => new Promise((reso, rej) => {
                hapusDataPejabat(dataLama);
                reso();
            })
        }

    } else {
        editable_ = {
            onRowUpdate: (dataBaru, dataLama) => new Promise((reso, rej) => {
                updateData(dataBaru, 3);
                reso();
            }),
            onRowDelete: (dataLama) => new Promise((reso, rej) => {
                console.log('data', dataLama);
                hapusDataPejabat(dataLama);
                reso();
            })
        }
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


    return (
        <div>
            <div className='pt-20'>
                <div className='mx-auto'>
                    <div className='container mx-auto'>
                        <div className='relative container -z-40 mx-auto'>
                            <p className='font-thin text-slate-700'>* Note: Status Aktif dan text Bold adalah Pejabat yang tampil dalam dokument</p>
                            <div className='absolute min-w-full mx-auto z-10'>
                                <MaterialTable
                                    title="Kepala Kampung"
                                    columns={kolom}
                                    icons={tblIcon}
                                    options={option}
                                    data={data_}
                                    editable={editable}
                                    onSelectionChange={onSelectionChange}
                                    localization={localisation}
                                />
                                <br />
                                <MaterialTable
                                    columns={kolom}
                                    title="Bendahara Kampung"
                                    icons={tblIcon}
                                    options={option}
                                    data={data_2}
                                    editable={editable_}
                                    onSelectionChange={onSelectionChange_}
                                    localization={localisation}
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

export default ConfigPejabatPengesahan