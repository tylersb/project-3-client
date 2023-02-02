import OrderHistory from './OrderHistory'
import { Typography } from '@mui/material';
import './Profile.css'
import { Card, Grid, Stack, Box } from '@mui/material';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Burger from './Burger.jpg'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react'
import SubHeaderNavigation from '../../SubHeaderNavigation';

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
    <Box style={{ margin: "0 auto" }}>
      <Grid container spacing={2} m={3}>
        <Grid item xs={12} sm={6} md={3} >
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
              <Typography variant='h5' mt={5} color="secondary">
                Account Settings
              </Typography>
              <Typography variant='h6' mt={2} mb={2}>
                Own a restaurant? Join us!
                <Button variant='contained'>
                  <Link to='/newrestaurant'>
                    Add Your Restaurant
                  </Link>
                </Button>
              </Typography>
              <Typography variant='h6' mt={4} mb={2}>
                Our Theme can match your mood.
                <SubHeaderNavigation />
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8} ml={4} >
          <Link to='/restaurants'>
            <Box m={3} className='browseRestaurants'>
              <Card  >
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
            </Box>
          </Link>



          {/* <div className='pastOrders'> */}

          {/* <Grid item xs={12} md={6} ml={4}> */}
          <Box m={3}>
            <Card mt={3}>
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
          </Box>
        </Grid>

        {/* </div> */}
      </Grid>
    </Box>
  )
}
