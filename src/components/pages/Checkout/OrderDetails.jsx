import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ScrollDialog from '../../ScrollDialog'
import AlertDialog from '../../AlertDialog'

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
      <h2>Your order is confirmed! Prepare for a delicious delivery!</h2>
      {deliveryAddress}
      <p>Order Number: {order?._id}</p>
      <h3>Order Items</h3>
      {products}
      <p>
        Order Total: $
        {order?.products.reduce((acc, item) => {
          return acc + item.price * item.quantity
        }, 0)}
      </p>
      <div>
        <ScrollDialog order={order} setOrder={setOrder} />
        <br />
        <br />
        <AlertDialog orderId={order?._id} value={'Cancel Order'} />
      </div>
    </>
  )
}

export default OrderDetails
