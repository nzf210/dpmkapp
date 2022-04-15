import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MaterialTable from 'material-table';
import tableIcons from '../../../TableIcon';

//Redux
import { useSelector } from 'react-redux';
//Redux

function View() {

    const [loading, setLoading] = useState(false);
    const [infoedit, setInfoEdit] = useState(false);
    const [data, setData] = useState([]);
    const [trdlload, setTrdlload] = useState('');

    const { nama, kd_kampung, kd_distrik, kd_lvl1, kd_lvl2, token } = useSelector(state => state.userLogin);

    const data_ = async () => {
        try {
            const respon = await axios.get('/mbams');
            if (kd_lvl1 === 2) {
                setData(respon.data.filter((e) => e.id_kam === kd_kampung))
            } else {
                setData(respon.data.filter(e => e));
            }
        } catch (e) {
            console.log('error refresh token', e.message);
        }
    }

    useEffect(() => {
        data_();
    }, [trdlload]);


    const [columns] = useState([
        { title: 'Nama', field: 'nama', },
        { title: 'Jabatan', field: 'jabatan', editable: () => false },
        { title: 'No SK', field: 'no_sk' },
        {
            title: 'Tgl SK', field: 'tgl_sk', type: 'date',
            dateSetting: { locale: "id-ID", format: "dd-MM-yyyy" }
        },
        { title: 'Kampung', field: 'kampung', editable: () => false },
        { title: 'Distrik', field: 'distrik', editable: () => false }
    ]);


    let editable = () => '';

    if (kd_lvl1 === 1)
        editable =
        {
            onRowUpdate: (newData, oldData) =>
                new Promise((resolve, reject) => {
                    async function dt() {
                        try {
                            await axios.patch(`/mbams`, {
                                id: newData.id,
                                nama: newData.nama,
                                tgl_sk: newData.tgl_sk,
                                no_sk: newData.no_sk
                            })
                            setTrdlload(new Date());
                            setInfoEdit(true);
                        } catch (error) {
                            console.log(error)
                        }
                    }
                    function tg() {
                        setTimeout(() => setInfoEdit(false), 2000)
                    }
                    dt(); tg(); resolve();
                })
        }



    return (
        <div>
            <div>
                <div className='mx-auto'>
                    <div className='container mx-auto'>
                        <div className='relative container -z-40 mx-auto'>
                            <div className='absolute min-w-full mx-auto z-10'>
                                {infoedit ? <p> Data Berhasil Di Ubah... </p> : null}
                                <MaterialTable
                                    icons={tableIcons}
                                    title={loading ? 'Mohon Tunggu Sedang Memuat Data ... ' : "Data Bamuskam"}
                                    options={{
                                        exportButton: true,
                                        pageSizeOptions: [5, 10, 25, 50, 100], pageSize: 10, actionsColumnIndex: 0,
                                        editable: false
                                    }}
                                    columns={columns}
                                    data={data}
                                    editable={editable}

                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default View;

// const CustomDatePicker = (props) => {
//     const [date, setDate] = useState(null);
//     const DateFnsUtils = '2020'
//     return (
//         <MuiPickersUtilsProvider utils={DateFnsUtils}>
//             <KeyboardDatePicker
//                 margin="normal"
//                 id="date-picker-dialog"
//                 label="Date picker"
//                 format="dd/MM/yyyy"
//                 clearable
//                 value={date}
//                 onChange={(event) => {
//                     console.log("Date picker value: ", event);
//                     console.log(props.columnDef.tableData.id);

//                     setDate(event);
//                     props.onFilterChanged(props.columnDef.tableData.id, event);
//                 }}
//                 KeyboardButtonProps={{
//                     "aria-label": "change date"
//                 }}
//             />
//         </MuiPickersUtilsProvider>
//     );
// };