import React from "react";
//import AdapterDateFn from '@date-io/date-fns';
// import AdapterDateFn from '@date-io/moment';
import ind from 'date-fns/locale/id'
// import { KeyboardDatePicker, MuiPickersUtilsProvider, DatePicker } from "@material-ui/pickers";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import TextField from '@mui/material/TextField';
import { TextField } from "@material-ui/core";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
//import moment from "moment";

function DatePicker_({ tgl, setTgl, nmpicker }) {

    return (

        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ind}>
            <Stack spacing={3} style={{ height: 20 }}>
                <DatePicker
                    // disableFuture
                    // disablePast
                    label={`TGL ${nmpicker}`}
                    // openTo="day"
                    //mask={`__-__-____`}
                    views={['day']}
                    // views={['year', 'month', 'day']}
                    // tgl={tgl}
                    value={tgl}
                    onChange={(newtgl) => {
                        setTgl(newtgl);
                    }}
                    renderInput={(params) => <TextField {...params} variant='outlined' margin="dense" style={{ width: 160, marginTop: -43, marginLeft: 74 }} />}
                />
            </Stack>
        </LocalizationProvider>

    );
}

export default DatePicker_;
