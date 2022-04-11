import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tblIcon from '../../TableIcon';

//Redux
import { useSelector } from 'react-redux';
//Redux
import axios from 'axios';

const ConfigPejabatPengesahan = () => {

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
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

    const kolom = [{
        field: 'nama', title: 'Nama'
    },
    {
        field: 'jabatan', title: 'Jabatan', editable: () => false
    },
    {
        field: 'no_sk', title: 'No SK'
    },
    {
        field: 'tgl_sk', title: 'Tgl SK', type: "date", dateSetting: { locale: "id-ID" }

    },
    {
        field: 'kampung', title: 'Kampung', editable: () => false
    },
    {
        field: 'distrik', title: 'Distrik', editable: () => false
    },
    ]


    /*  Update data Pejabat Pengesahan */
    const updateData = async (e, ee) => {
        try {
            const update = await axios.patch('/ppengesahan', {
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
            const tambah = await axios.post('/ppengesahan', {
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

    const option = {
        rowStyle: (rowData) => ({
            backgroundColor:
                rowData.sts === true ? "#6ABAC9" : "#FFF",
            text: rowData.sts === true ? "#6ABAC9" : "#FFF",
        }),
        pageSizeOptions: [5], filtering: kd_lvl1 === 2 ? false : true, paging: false, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false,
        selection: true,
        selectionProps: barisData => ({
            disabled: barisData.sts === true,
        })
    }
    const option_ = {
        rowStyle: (rowData) => ({
            backgroundColor:
                rowData.sts === true ? "#6ABAC9" : "#FFF",
            text: rowData.sts === true ? "#6ABAC9" : "#FFF",
        }),
        pageSizeOptions: [5], filtering: kd_lvl1 === 2 ? false : true, paging: false, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false,
        selection: true,
        selectionProps: barisData => ({
            disabled: barisData.sts === true,
        })
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
                updateData(dataBaru);
                reso();
            }),
            onRowDelete: (dataLama) => new Promise((reso, rej) => {
                console.log('data', dataLama);
                hapusDataPejabat(dataLama);
                reso();
            })
        }
    }


    return (
        <div>
            <div className='pt-32'>
                <div className='mx-auto'>
                    <div className='container mx-auto'>
                        <div className='relative container -z-40 mx-auto'>
                            <div className='absolute min-w-full mx-auto z-10'>
                                <MaterialTable
                                    title="Kepala Kampung"
                                    columns={kolom}
                                    icons={tblIcon}
                                    options={option}
                                    data={data_}
                                    editable={editable}
                                    onSelectionChange={onSelectionChange}
                                />
                                <br />
                                <MaterialTable
                                    columns={kolom}
                                    title="Bendahara Kampung"
                                    icons={tblIcon}
                                    options={option_}
                                    data={data_2}
                                    editable={editable_}
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

export default ConfigPejabatPengesahan