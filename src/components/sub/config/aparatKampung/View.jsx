import React, { useEffect } from 'react';
import MaterialTable from '@material-table/core';
import axios from 'axios';


function View() {

    const { useState } = React;
    const [loading, setLoading] = useState(false);
    const [infoedit, setInfoEdit] = useState(false);
    const [data, setData] = useState([]);
    const [trdlload, setTrdlload] = useState('');

    useEffect(() => {
        let e = true;
        const dataBamuskam = async () => {
            setLoading(true);
            try {
                if (e) {
                    const data_ = await axios.get('/mbams');
                    setData([...data_.data]);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                setLoading(true);
            }
        }
        dataBamuskam();
        return () => {
            e = false;
            setLoading(false);
        }
    }, [data, trdlload]);


    const [columns] = useState([
        { title: 'Nama', field: 'nama', },
        { title: 'Jabatan', field: 'jabatan', editable: () => false },
        { title: 'No SK', field: 'no_sk' },
        {
            title: 'Tgl SK', field: 'tgl_sk', type: 'date',
            dateSetting: { locale: "id-ID", format: "dd - MM - yyyy" }
        },
        { title: 'Kampung', field: 'kampung', editable: () => false },
        { title: 'Distrik', field: 'distrik', editable: () => false }
    ]);


    return (
        <div className='container mx-auto'>
            <div className='relative -z-20'>
                {infoedit ? <p> Data Berhasil Di Ubah... </p> : null}
                <div className='absolute'>
                    <MaterialTable
                        title={loading ? 'Mohon Tunggu Sedang Memuat Data ... ' : "Data Bamuskam"}
                        options={{
                            exportButton: true,
                            pageSizeOptions: [5, 10, 25, 50, 100], pageSize: 10, actionsColumnIndex: 0
                        }}
                        columns={columns}
                        data={data}
                        editable={{
                            onRowUpdate: (newData, oldData) =>
                                new Promise((resolve, reject) => {
                                    setTimeout(() => {
                                        const dataUpdate = [...data];
                                        const index = oldData.tableData.id;
                                        dataUpdate[index] = newData;
                                        async function dt() {
                                            try {
                                                await axios.patch(`/mbams`, {
                                                    id: newData.id,
                                                    nama: newData.nama,
                                                    tgl_sk: newData.tgl_sk,
                                                    no_sk: newData.no_sk
                                                })
                                                setTrdlload(newData.id);
                                                setInfoEdit(true);
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        }
                                        setTimeout(() => setInfoEdit(false), 2000)
                                        dt();
                                        setData([...dataUpdate])
                                        resolve();
                                    }, 500);
                                })
                        }}
                    />
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