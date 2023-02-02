import React, { useEffect, useState } from 'react'
import Reviews from '../../Reviews'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import IconButton from '@mui/material/IconButton'
import { Link, useParams } from 'react-router-dom'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import axios from 'axios'
import './Menu.css'
import Checkout from '../Checkout/Checkout'
import { Button } from '@mui/material'

// create function component Menu
export default function Menu(props) {
  // state is menuItems, setMenuItems is the function to update state, same applies to selectedItem, and cart
  const [selectedItem, setSelectedItem] = useState(null)
  const [restaurant, setRestaurant] = useState('')
  const { restaurantId } = useParams()

  const fetchRestaurant = async (restaurantId) => {
    try {
      console.log()
      axios
        .get(`${process.env.REACT_APP_SERVER_URL}/restaurants/${restaurantId}`)
        .then((response) => {
          setRestaurant(response.data)
          console.log(response.data)
        })
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    fetchRestaurant(restaurantId)
  }, [restaurantId])

  const handleSelection = (item) => {
    setSelectedItem(item) // updates the state of selectedItem with the item that was clicked
  }

  const menu = restaurant.menu?.map((section, id) => {
    return (
      <div
        key={section._id}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: '1rem'
        }}
      >
        <Card style={{ width: '80%' }}>
          <CardContent>
            <Typography variant="h5">{section.sectionName}</Typography>
            {section.products.map((item) => (
              <div
                key={item._id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  margin: '0.5rem 0'
                }}
              >
                <img
                  src={item.image}
                  alt={item.description}
                  style={{
                    width: '100px',
                    height: '100px',
                    borderRadius: '10px'
                  }}
                />
                <span
                  onClick={() => handleSelection(item)}
                  style={{ cursor: 'pointer' }}
                >
                  {item.name} - ${item.price}
                  <Typography>{item.description}</Typography>
                </span>
                
                <IconButton
                  color="success"
                  aria-label="add to shopping cart"
                  onClick={() =>
                    props.handleAddToCart({
                      name: item.name,
                      price: item.price
                    })
                  }
                >
                  <AddShoppingCartIcon />
                  <Typography>Add to order</Typography>
                </IconButton>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    )
  })

  return (
    // <div
    //   style={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     margin: '1rem',
    //   }}
    // >
    <div className="container">
      <div className="restaurantInfo">
        <Typography variant="h1" gutterBottom m={3}>
          Menu{' '}
        </Typography>
      </div>
      <div className="menu">
        <div>{menu}</div>
        <Button
      color='secondary'
      variant='contained'>
        <Link to='/Checkout'>
          Checkout
        </Link>
      </Button>
      </div>
      <div className="reviews">
        {selectedItem && (
          <p style={{ margin: '1rem 0' }}>Selected: {selectedItem.name}</p>
        )}
        <Reviews
          restaurantId={restaurant._id}
          currentUser={props.currentUser}
        />
      
      </div>
      

    </div>
  )
  // if selectedItem is not null, display the name of the selected item, && is a conditional operator that checks if the first value is true, if it is, it displays the second value
}
