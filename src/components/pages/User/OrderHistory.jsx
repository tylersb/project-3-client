import { Link } from 'react-router-dom'
import OrderHistoryDetails from './OrderHistoryDetails'

export default function OrderHistory(props) {


  ///checking if orders have been placed\\\\
  const orderProducts =
    props.orders.products ?
      props.orders?.products.map(product => {
        return <OrderHistoryDetails product={product} />
      })
      :
      "You haven't placed any orders yet."

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
        <div
          key={props.order._id}
          style={{
            border: '1px solid black',
            margin: '1rem',
            padding: '1rem',
            width: '50%'
          }}
        >
          <Link to={`/orders/${props.order._id}`}>{props.order._id}</Link>
        </div>
        {orderProducts}
      </div>
    </div>
  )
}
