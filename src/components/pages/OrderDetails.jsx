import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams } from 'react-router-dom'

function OrderDetails() {
  const [order, setOrder] = useState(null)

  const { id } = useParams()

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_SERVER_URL}/orders/${id}`)
      .then((response) => {
        setOrder(response.data)
        console.log(response.data)
      })
  }, [id])

  return (
    <>
      <h2>Your order is confirmed! Prepare for a delicious delivery!</h2>
      <h3>Order Details</h3>
      <p>Order Number: {order?._id}</p>
      <p>Order Total: ${
        order?.products.reduce((acc, item) => {
          return acc + item.price * item.quantity
        }
        , 0)
      }</p>
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
      </div>
    </>
  )
}

export default OrderDetails
