import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';



export default function AlertDialog({ open, handleClose, dataform, onChange, handleSubmit }) {
    const { no_spp, tgl_spp } = dataform;

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Ubah Data SP2SPD Dana Reguler"}
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField onChange={(e) => onChange(e)} value={no_spp} id='no_spp' label='No SP2SPD' placeholder='no sp2spd' fullWidth variant='outlined' style={{ marginTop: 6 }} margin='dense' />
                        <TextField onChange={(e) => onChange(e)} value={tgl_spp} type='date' id='tgl_spp' label='Tgl SP2SPD' fullWidth variant='outlined' style={{ marginTop: 6 }} margin='dense' />
                        <></>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary' variant='contained'>Batal</Button>
                    <Button onClick={() => handleSubmit()} autoFocus color='primary' variant='contained'>Ubah</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
