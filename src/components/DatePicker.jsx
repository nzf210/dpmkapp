import React from "react";
import AdapterDateFn from '@date-io/date-fns';
// import AdapterDateFn from '@date-io/moment';
import ind from 'date-fns/locale/id'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
function DatePicker_({ tgl, setTgl, nmpicker }) {
    //const [selectedDate, handleDateChange] = useState(new Date());

    return (

        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} style={{ height: 8, position: 'absolute', marginLeft: 82, marginTop: -53, maxHeight: 14, padding: 0 }}>
                <MuiPickersUtilsProvider utils={AdapterDateFn} locale={ind}>

                    {/* <DatePicker
                variant="inline"
                label="Basic example"
                value={selectedDate}
                onChange={handleDateChange}
            />
            <DatePicker
                disableToolbar
                variant="inline"
                label="Only calendar"
                helperText="No year selection"
                value={selectedDate}
                onChange={handleDateChange}
            /> */}

                    <KeyboardDatePicker
                        autoOk
                        variant="inline"
                        inputVariant="outlined"
                        label={`TGL ${nmpicker}`}
                        format="dd-MM-yyyy"
                        margin="dense"

                        value={tgl}
                        InputAdornmentProps={{ position: "start" }}
                        onChange={date => setTgl(date)}
                        style={{ width: 200, height: 12, paddingBottom: -8, marginBottom: -9 }}
                    />
                </MuiPickersUtilsProvider>
            </Stack>
        </LocalizationProvider>

    );
}

export default DatePicker_;
