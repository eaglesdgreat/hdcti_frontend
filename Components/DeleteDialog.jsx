import React from 'react'
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@material-ui/core';

const DeleteDialog = ({
  title,
  content,
  action1,
  action2,
  openDeleteDialog,
  closeDeleteDialog,
  handleDelete
}) => {

  return (
    <Box>
      <Dialog
        open={openDeleteDialog}
        onClose={closeDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={closeDeleteDialog} style={{ color: "#FF5C00" }}>
            {action1}
          </Button>
          <Button onClick={handleDelete} style={{ color: "#FF5C00" }} autoFocus>
            {action2}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default DeleteDialog;