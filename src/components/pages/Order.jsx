import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

export default function Order() {
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const { id } = useParams()

  useEffect(() => {
    const getOrder = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/orders/${id}`
        )
        setOrder(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getOrder()
  }, [id])

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order._id}</p>
      <p>Order Date: {order.createdAt}</p>
      <p>Order Total: ${order.total}</p>
      <p>Order Items:</p>
      <ul>
        {order.items.map((item) => {
          return (
            <li key={item._id}>
              {item.name} - ${item.price}
            </li>
          )
        })}
      </ul>
    </div>
  )
}