import React, { useState } from 'react';
import {
  Typography,
  Button,
  Dialog,
  DialogContent,
  DialogTitle
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

const DialogComponent = ({
  openDialog,
  handleDialogClose,
  scroll,
  children
}) => {
  return (
    <Dialog
      open={openDialog}
      onClose={handleDialogClose}
      scroll={scroll}
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">
        <Button style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
          borderRadius: "2px",
          width: "4.2rem",
          padding: 0,
          margin: "1rem 0"
        }}
          size="large"
          disableRipple
          onClick={handleDialogClose}
        >
          <Close style={{
            fontWeight: 500, fontSize: "1.2rem",
            color: "#000000", marginRight: "0.3rem"
          }} />
          <Typography style={{ fontWeight: 400, color: "#242120" }}>
            Close
          </Typography>
        </Button>
        Order Details
        </DialogTitle>
      <DialogContent dividers={scroll === 'paper'}>
        {children}
      </DialogContent>
    </Dialog>
  )
}

export default DialogComponent;