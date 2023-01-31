import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState, useEffect, useRef, Fragment } from 'react'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import DeleteIcon from '@mui/icons-material/Delete'
import Box from '@mui/material/Box'
import axios from 'axios'

export default function ScrollDialog(props) {
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('paper')
  const [updatedProducts, setUpdatedProducts] = useState([])

  const newProducts = props.order?.products.map((product) => {
    return {
      _id: product._id,
      name: product.name,
      price: product.price,
      quantity: product.quantity
    }
  })

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
    setUpdatedProducts(newProducts)
  }

  const handleClose = () => {
    setOpen(false)
  }

  useEffect(() => {
    if (props.order?.products) setUpdatedProducts(newProducts)
  }, [props.order?.products])

  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const handleProductDelete = (index) => {
    const updatedProductsCopy = [...updatedProducts]
    updatedProductsCopy.splice(index, 1)
    setUpdatedProducts(updatedProductsCopy)
  }

  const handleOrderUpdate = async () => {
    try {
      const response = await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/orders/${props.order._id}`,
        {
          _id: props.order._id,
          products: updatedProducts
        }
      )
      props.setOrder(response.data)
      setOpen(false)
    } catch (error) {
      console.error(error)
    }
  }

  const products = updatedProducts.map((product, index) => {
    return (
      <Fragment key={index}>
        <span>${product.price}</span> <span>{product.name}</span> (
        {product.quantity})
        <br />
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(style)': { m: 1 },
            justifyContent: 'space-evenly'
          }}
        >
          <RemoveIcon
            onClick={() => {
              if (updatedProducts[index].quantity === 1) return
              const updatedProductsCopy = [...updatedProducts]
              updatedProductsCopy[index].quantity -= 1
              setUpdatedProducts(updatedProductsCopy)
            }}
          />
          <DeleteIcon
            onClick={() => {
              handleProductDelete(index)
            }}
          />
          <AddIcon
            onClick={() => {
              const updatedProductsCopy = [...updatedProducts]
              updatedProductsCopy[index].quantity += 1
              setUpdatedProducts(updatedProductsCopy)
            }}
          />
        </Box>
        <br />
      </Fragment>
    )
  })

  return (
    <>
      <Button onClick={handleClickOpen('paper')}>Edit Order</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Order Details</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>{products}</DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleOrderUpdate}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
