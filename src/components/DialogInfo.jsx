import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


export default function InfoDialog({ open, text, handleClose }) {


    return (
        <div>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="info-dialog-title"
                aria-describedby="info-dialog-description"
            >
                <DialogTitle id="info-dialog-title">
                    {"INFO DATA"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {text}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color='secondary' variant='outlined'>OK</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
