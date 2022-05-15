import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
//import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { TextField } from '@material-ui/core';
// import { notStrictEqual } from 'assert';



export default function AlertDialog({ open, handleClose, dataform, onChange, handleSubmit, nmpicker, ns }) {
    const { no_spp, tgl_spp, no_spm, tgl_spm, no_sp2d, tgl_sp2d } = dataform;
    let no, tgl, no_, tgl_
    switch (ns) {
        case 'SP2SPD':
            no = no_spp;
            tgl = tgl_spp;
            no_ = 'no_spp';
            tgl_ = 'tgl_spp'
            break;
        case 'SKBK':
            no = no_spm;
            tgl = tgl_spm;
            no_ = 'no_spm';
            tgl_ = 'tgl_spm'
            break;
        case 'SP2D':
            no = no_sp2d;
            tgl = tgl_sp2d;
            no_ = 'no_sp2d';
            tgl_ = 'tgl_sp2d'
            break;
        default:
    }

    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {`Ubah Data ${nmpicker}`}
                </DialogTitle>
                <DialogContent>
                    <form>
                        <TextField onChange={(e) => onChange(e)} value={no} id={no_} label={`No ${nmpicker}`} placeholder='no sp2spd' fullWidth variant='outlined' style={{ marginTop: 6 }} margin='dense' />
                        <TextField onChange={(e) => onChange(e)} value={tgl} id={tgl_} type='date' label={`Tgl ${nmpicker}`} fullWidth variant='outlined' style={{ marginTop: 6 }} margin='dense' />
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
