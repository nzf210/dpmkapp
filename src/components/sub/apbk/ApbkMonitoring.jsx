import React, { useEffect, useState } from 'react';
import MaterialTable from 'material-table';
import tblIcon from '../../TableIcon';

//Redux
import { useSelector } from 'react-redux';
//Redux
import axios from 'axios';

const ApbkMonitoring = () => {

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);
    const [data_, setData_] = useState([]);
    const [data_2, setData_2] = useState([]);
    const [changests, setChangests] = useState('');


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
            console.log('data Anggaran', respon.data)
        } catch (e) {
            console.log('error refresh token', e.message);
        }
    }


    useEffect(
        () => data(),
        [changests]
    )


    const kolom = [{
        field: 'thp_advis', title: 'Kegiatan'
    },
    {
        field: 'pagu', title: 'Pagu'
    },
    {
        field: 'tgl', title: 'Tgl Verifikasi', type: "date", dateSetting: { locale: "id-ID" }

    },
    {
        field: 'kampung', title: 'Kampung', editable: () => false
    },
    {
        field: 'distrik', title: 'Distrik', editable: () => false
    },
    {
        field: 'sts', title: 'Status', editable: () => false, render: (row) => row.sts ? <div className='bg-green-400 rounded-md p-2 text-center -translate-x-3'>Sudah Verifikasi</div> : null, align: 'center'
    },
    ]
    const kolom_ = [{
        field: 'thp_advis', title: 'Kegiatan'
    },
    {
        field: 'pagu', title: 'Pagu'
    },
    {
        field: 'tgl', title: 'Tgl Verifikasi', type: "date", dateSetting: { locale: "id-ID" }

    },
    {
        field: 'kampung', title: 'Kampung', editable: () => false
    },
    {
        field: 'distrik', title: 'Distrik', editable: () => false
    },
    {
        field: 'sts', title: 'Status', editable: () => false, render: (row) => <div className='bg-yellow-200 rounded-md p-2 text-center -translate-x-3'>Proses Verifikasi</div>, align: 'center'
    },
    ]


    const options = {
        pageSizeOptions: [5], filtering: kd_lvl1 === 2 ? false : true, paging: false, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false,
        selectionProps: barisData => ({
            disabled: barisData.sts === true,
        }),
        headerStyle: {
            backgroundColor: '', fontWeight: 800
        },
        maxBodyHeight: 500,
    }

    const options_ = {
        rowStyle: (rowData) => ({

            fontWeight:
                rowData.sts === true ? 600 : 300,

        }),
        pageSizeOptions: [5, 10, 25, 50, 100], filtering: kd_lvl1 === 2 ? false : true, addRowPosition: "first", actionsColumnIndex: -1,
        showSelectAllCheckbox: false, showTextRowsSelected: false,
        selection: true,

        headerStyle: {
            backgroundColor: '', fontWeight: 800
        },
        selectionProps: brs => ({
            disabled: kd_lvl2 === 2 ? true : false,
        })
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


    return (
        <div>
            <div className='pt-32'>
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