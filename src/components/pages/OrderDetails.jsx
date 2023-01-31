import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import ScrollDialog from '../ScrollDialog'

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

  return (
    <>
      <h2>Your order is confirmed! Prepare for a delicious delivery!</h2>
      <h3>Order Details</h3>
      <p>Order Number: {order?._id}</p>
      <p>
        Order Total: $
        {order?.products.reduce((acc, item) => {
          return acc + item.price * item.quantity
        }, 0)}
      </p>
      <>{order?.totalPrice}</>
      <h3>Order Items</h3>
      <ul>
        {order?.products.map((item) => {
          return (
            <li key={item._id}>
              <p>{item.name}</p>
              <p>${item.price}</p>
              <p>Quantity: {item.quantity}</p>
            </li>
          )
        })}
      </ul>
      <div>
        <h3>Delivery Address</h3>
        <p>{order?.name}</p>
        <p>{order?.dropOffAddress.street}</p>
        <p>{order?.dropOffAddress.city}</p>
        <p>{order?.dropOffAddress.state}</p>
        <p>{order?.dropOffAddress.zip}</p>
        <ScrollDialog order={order} fetchOrder={fetchOrder}/>
      </div>
    </>
  )
}

export default OrderDetails
