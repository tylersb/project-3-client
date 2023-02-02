import OrderHistory from './OrderHistory'
<<<<<<< HEAD
import Typography from '@mui/material/Typography';
=======
import { Typography } from '@mui/material';
import './Profile.css'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Burger from './Burger.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react'

>>>>>>> main
export default function Profile({ currentUser, handleLogout }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getOrders = async () => {
      try {
        if (!currentUser?._id) {
          return
        }
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/orders/user/${currentUser?._id}`
        )
        setOrders(response.data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    getOrders()
  }, [currentUser?._id])

  if (loading) {
    return <div>Loading...</div>
  }
  const orderList = orders.map((order) => {
    return (
      <OrderHistory order={order} />
    )
  })

  return (
    <div className='container'>
      <div className='leftDrawer'>
        <Card>
          <CardContent>
            <Typography variant='h5' color="secondary">
              Account Information
            </Typography>
            <Typography color="secondary">Username: </Typography>
            <Typography>{currentUser?.name}</Typography>
            <Typography color="secondary">Email: </Typography>
            <Typography>{currentUser?.email}</Typography>
            <Typography color="secondary">Address:</Typography>
            <Typography>{currentUser?.address?.street}</Typography>
            <Typography>{currentUser?.address?.city}, {currentUser?.address?.state} {currentUser?.address?.zip}</Typography>
            <Typography color="secondary">Phone:</Typography>
            <Typography>{currentUser?.phone}</Typography>
          </CardContent>
        </Card>
      </div>


      <div className='browseRestaurants'>
        <Link to='/restaurants'>
          <Card >
            <CardMedia
              sx={{ height: 140 }}
              image={Burger}
              title="Burger"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Find what you're craving.
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small">
                Browse Restaurants
              </Button>
            </CardActions>
          </Card>
        </Link>
      </div>


      <div className='pastOrders'>
        <Card>
          <CardContent>
            {orderList.length > 0 ? orderList : 
             <Typography gutterBottom variant="h5" component="div">
             Previous Orders
           </Typography>}
           <Typography gutterBottom variant="h6" component="div" color="secondary">
            Yikes! Don't you eat? You haven't placed any orders.
           </Typography>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
