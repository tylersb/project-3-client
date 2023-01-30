import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import DenseTable from '../DenseTable'

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

  // const orderItems = order.products.map((product) => {
  //   return (
  //     <tr key={product._id}>
  //       <td>{product.name}</td>
  //       <td>${product.price}</td>
  //       <td>{product.quantity}</td>
  //     </tr>
  //   )
  // })

  return (
    <div>
      <h1>Order Details</h1>
      <p>Order ID: {order._id}</p>
      <p>
        Order Date:{' '}
        {new Date(order.createdAt).toLocaleDateString('en-US', {
          weekday: 'long',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </p>
      <p>
        Order Total: $
        {order.products.reduce((total, product) => {
          return total + product.price
        }, 0)}
      </p>
      <p>Order Items:</p>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center'
        }}
      >
        <div>
          <DenseTable products={order.products} />
        </div>
      </div>
    </div>
  )
}
