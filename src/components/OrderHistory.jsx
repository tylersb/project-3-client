import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default function OrderHistory(props) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (!props.userId) {
          return
        }
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/orders/user/${props?.userId}`
        )
        setOrders(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getOrders()
  }, [props.userId])

  if (loading) {
    return <div>Loading...</div>
  }

  const orderList = orders.map((order) => {
    return (
      <li key={order._id}>
        <Link to={`/orders/${order._id}`}>{order._id}</Link>
      </li>
    )
  })

  return (
    <div>
      <h1>Order History</h1>
      <ul>
        {orderList}
      </ul>
    </div>
  )
}
