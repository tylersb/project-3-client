import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import axios from 'axios'

export default function AlertDialog(props) {
  const [open, setOpen] = useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const navigate = useNavigate()

  const handleOrderDelete = async () => {
    try {
      axios.delete(
        `${process.env.REACT_APP_SERVER_URL}/orders/${props.orderId}`
      )
      navigate('/menu')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <Button variant="contained" color="error" onClick={handleClickOpen}>
        {props.value}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you'd like to cancel your order?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-evenly'
          }}
        >
          <Button onClick={handleClose}>Disagree</Button>
          <Button
            onClick={() => {
              handleOrderDelete()
              handleClose()
            }}
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}
