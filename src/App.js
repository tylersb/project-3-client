import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import Register from './components/pages/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import Checkout from './components/pages/Checkout'
import OrderDetails from './components/pages/OrderDetails'
import './App.css'
import Menu from './components/pages/Menu'
import jwt_decode from 'jwt-decode'
import CssBaseline from '@mui/material/CssBaseline'
import NotFound from './components/pages/NotFound'
import axios from 'axios'
import Order from './components/pages/Order'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  const [cart, setCart] = useState([]) // cart state
  const [restaurant, setRestaurant] = useState([]) // restaurant state

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: currentUser?.address.street,
    city: currentUser?.address.city,
    state: currentUser?.address.state,
    zip: currentUser?.address.zip
  })
 
  // //order schema for submitting orders to backend
  // const [order, setOrder] = useState({
  //   restaurantId: restaurant._id,
  //   products: cart,
  //   dropOffAddress: deliveryAddress,
  //   totalPrice: 0
  // })

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
      .then((response) => {
        setRestaurant(response.data[0]) // set restaurant state to the first restaurant in the db
      })
  }, [])

  // create a function to add menu items to cart
  const handleAddToCart = (item) => {
    if (cart.find((cartItem) => cartItem.name === item.name)) {
      const newCart = cart.map((cartItem) => {
        if (cartItem.name === item.name) {
            return { 
              name : cartItem.name,
              price : cartItem.price,
              quantity : cartItem.quantity + 1
            }
        } else {
          return {
            name: item.name,
            price: item.price,
            quantity: 1
          }
        }
      })
      setCart(newCart)
    } else {
      setCart([...cart, {
        name: item.name,
        price: item.price,
        quantity: 1
      }])
    }
  }

  // useEffect -- if the user navigates away form the page, we will log them back in
  useEffect(() => {
    // check to see if token is in storage
    const token = localStorage.getItem('jwt')
    if (token) {
      // if so, we will decode it and set the user in app state
      setCurrentUser(jwt_decode(token))
    } else {
      setCurrentUser(null)
    }
  }, []) // happen only once

  // event handler to log the user out when needed
  const handleLogout = () => {
    // check to see if a token exists in local storage
    if (localStorage.getItem('jwt')) {
      // if so, delete it
      localStorage.removeItem('jwt')
      // set the user in the App state to be null
      setCurrentUser(null)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_SERVER_URL}/restaurants`
        )
        setRestaurant(response.data[0])
      } catch (error) {
        console.error(error)
      }
    }
    fetchData()
  }, [])

  // create a function to add menu items to cart
  // const handleAddToCart = (item) => {
  //   // check to see if the item is already in the cart
  //   const itemInCart = cart.find((cartItem) => cartItem.name === item.name)
  //   // if it is, we will increment the quantity
  //   if (itemInCart) {
  //     const newCart = cart.map((cartItem) => {
  //       if (cartItem.name === item.name) {
  //         return { ...cartItem, quantity: cartItem.quantity + 1 }
  //       } else {
  //         return cartItem
  //       }
  //     })
  //     setCart(newCart)
  //   } else {
  //     setCart([...cart, { ...item, quantity: 1 }])
  //   }
  // }

  return (
    <>
      <CssBaseline />
      <Router>
        <header>
          <Navbar currentUser={currentUser} handleLogout={handleLogout} />
        </header>

        <div className="App">
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route
              path="/register"
              element={
                <Register
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            <Route
              path="/login"
              element={
                <Login
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />

            {/*optionally conditionally render auth locked routes */}
            {/* 
			<Route 
			   path="/profile" 
               element={currentUser ? <Profile handleLogout={handleLogout} currentUser={currentUser} setCurrentUser={setCurrentUser} /> : <Navigate to="/login" />}
            /> 
		  */}

            <Route
              path="/profile"
              element={
                <Profile
                  handleLogout={handleLogout}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
              }
            />
            <Route path="/menu" element={<Menu cart={cart} currentUser={currentUser} handleAddToCart={handleAddToCart} restaurant={restaurant} />} />
            <Route
              path="/checkout"
              element={<Checkout cart={cart} currentUser={currentUser} restaurant={restaurant} />}
            />
            <Route
              path="/orders/:id"
              element={<OrderDetails currentUser={currentUser} />}
            />


            {/* Catch all routes that are not defined above. Keep as bottom route */}
            <Route path="/orders/:id" element={<Order />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </>
  )
}

export default App
