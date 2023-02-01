import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ScrollDialog from '../../ScrollDialog'
import AlertDialog from '../../AlertDialog'
import { Grid, Paper, Container, Button } from '@mui/material';

function OrderDetails() {
  const [order, setOrder] = useState(null)

  const { id } = useParams()

  const fetchOrder = async (oId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/orders/${oId}`
      )
      setOrder(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    fetchOrder(id)
  }, [id])

  const products = order?.products.map((product) => {
    return (
      <div key={product._id}>
        <span>${product.price}</span> <span>{product.name}</span> (
        {product.quantity})
      </div>
    )
  })

  if (!order) return <h2>Order not found</h2>

  const deliveryAddress = order?.dropOffAddress ? (
    <div>
      Delivery Address: <span>{order?.dropOffAddress?.street}</span>,{' '}
      <span>{order?.dropOffAddress?.city}</span>,{' '}
      <span>{order?.dropOffAddress?.state}</span>,{' '}
      <span>{order?.dropOffAddress?.zip}</span>
    </div>
  ) : null


  return (
    <>
    <Container>
      <Grid container>
        <Grid item xs={12} style={{margin: "5px"}}>
          <Paper style={{margin: "5px", padding: "10px"}}>
            <h2>Your order is confirmed! Prepare for a delicious delivery!</h2>
          </Paper>
        </Grid>
        <Grid item xs={12} style={{margin: "5px"}}>
          <Paper style={{margin: "5px", padding: "10px"}}>
            {deliveryAddress}
            <p>Order Number: {order?._id}</p>
            <h3>Order Items</h3>
            {products}
          </Paper>
        </Grid>
        <Grid item xs={12} style={{margin: "5px"}}>
          <Paper style={{margin: "5px", padding: "10px"}}>
            <p>
              Order Total: $
              {order?.products.reduce((acc, item) => {
                return acc + item.price * item.quantity
              }, 0)}
            </p>
          </Paper>
        </Grid>

        <Grid item xs={12} style={{margin: "5px"}}>
          <Paper style={{margin: "5px", padding: "10px"}}>
            <ScrollDialog order={order} setOrder={setOrder} />
            <AlertDialog orderId={order?._id} value={'Cancel Order'} />
          </Paper>
        </Grid>
      </Grid>
      </Container>
    </>
  )
}

export default OrderDetails
