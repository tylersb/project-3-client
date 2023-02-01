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
      <div
        key={order._id}
        style={{
          border: '1px solid black',
          margin: '1rem',
          padding: '1rem',
          width: '50%'
        }}
      >
        <Link to={`/orders/${order._id}`}>{order._id}</Link>
      </div>
    )
  })

  return (
    <div>
      <h1>Order History</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        {orderList}
      </div>
    </div>
  )
}
