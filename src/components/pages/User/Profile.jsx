import OrderHistory from './OrderHistory'
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

export default function Profile({ currentUser, handleLogout }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  console.log(currentUser)
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
            <Typography variant='h6'>
              Account Information
            </Typography>
            <Typography>Username: {currentUser?.name}</Typography>
            <Typography>Email: {currentUser?.email}</Typography>
            <Typography>Address:</Typography>
            <Typography>{currentUser?.address?.street}</Typography>
            <Typography>{currentUser?.address?.city}, {currentUser?.address?.state} {currentUser?.address?.zip}</Typography>
            <Typography>Phone: {currentUser?.phone}</Typography>
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
            {orderList ? orderList : 
             <Typography gutterBottom variant="h5" component="div">
             Find what you're craving.
           </Typography>}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
