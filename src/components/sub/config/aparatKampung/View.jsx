import React, { useEffect } from 'react';
//import MaterialTable from '@material-table/core';
import axios from 'axios';
import MaterialTable from 'material-table';
import { forwardRef } from 'react';

import AddBox from '@material-ui/icons/AddBox';
import ArrowDownward from '@material-ui/icons/ArrowDownward';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
};


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


    const onChangePage = {

    }

    return (
        <div className='container mx-auto'>
            <div className='relative -z-20'>
                {infoedit ? <p> Data Berhasil Di Ubah... </p> : null}
                <div className='absolute'>
                    <MaterialTable
                        icons={tableIcons}
                        title={loading ? 'Mohon Tunggu Sedang Memuat Data ... ' : "Data Bamuskam"}
                        onChangePage={onChangePage}
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