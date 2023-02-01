import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useMemo } from 'react'
import Login from './components/pages/User/Login'
import Profile from './components/pages/User/Profile'
import Register from './components/pages/User/Register'
import Welcome from './components/pages/Welcome'
import Navbar from './components/Navbar'
import Checkout from './components/pages/Checkout/Checkout'
import OrderDetails from './components/pages/Checkout/OrderDetails'
import './App.css'
import Menu from './components/pages/Restaurant/Menu'
import jwt_decode from 'jwt-decode'
import CssBaseline from '@mui/material/CssBaseline'
import NotFound from './components/pages/NotFound'
import axios from 'axios'
import Order from './components/pages/Checkout/Order'
import { ThemeProvider, createTheme } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { ColorModeContext } from './components/contexts/ColorModeContext'
import Layout from './components/pages/Checkout/partials/Layout'
import RegisterRestaurant from './components/pages/Restaurant/RegisterRestaurant'
import AllRestaurants from './components/pages/Restaurant/AllRestaurants'

function App() {
  // the currently logged in user will be stored up here in state
  const [currentUser, setCurrentUser] = useState(null)
  const [cart, setCart] = useState([]) // cart state
  const [restaurant, setRestaurant] = useState([]) // restaurant state

  const [deliveryAddress, setDeliveryAddress] = useState({
    street: currentUser?.address?.street,
    city: currentUser?.address?.city,
    state: currentUser?.address?.state,
    zip: currentUser?.address?.zip
  })

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = useState()

  useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      }
    }),
    []
  )

  const lightTheme = createTheme({
    palette: {
      mode: 'light',
      primary: {
        light: '#fdd835',
        main: '#fbc02d',
        dark: '#c49000'
      },
      secondary: {
        light: '#ffa726',
        main: '#fb8c00',
        dark: '#ef6c00'
      },
      action: {
        active: '#fb8c00'
      },
      background: {
        default: '#fff',
        paper: '#fff'
      }
    },
    typography: {
      fontFamily: 'Open Sans, sans-serif',
      h1: {
        fontWeight: 400,
        fontSize: '2.5rem'
      },
      h2: {
        fontWeight: 400,
        fontSize: '2rem'
      },
      h3: {
        fontWeight: 400,
        fontSize: '1.5rem'
      },
      body1: {
        fontWeight: 300,
        fontSize: '1rem'
      },
      body2: {
        fontWeight: 300,
        fontSize: '1rem'
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': ['Open Sans']
        }
      }
    }
  })

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
      primary: {
        light: '#c49000',
        main: '#fbc02d',
        dark: '#fdd835'
      },
      secondary: {
        light: '#ef6c00',
        main: '#fb8c00',
        dark: '#ffa726'
      },
      action: {
        active: '#fb8c00'
      },
      background: {
        default: '#333',
        paper: '#333'
      }
    },
    typography: {
      fontFamily: 'Open Sans, sans-serif',
      h1: {
        fontWeight: 400,
        fontSize: '2.5rem'
      },
      h2: {
        fontWeight: 400,
        fontSize: '2rem'
      },
      h3: {
        fontWeight: 400,
        fontSize: '1.5rem'
      },
      body1: {
        fontWeight: 300,
        fontSize: '1rem'
      },
      body2: {
        fontWeight: 300,
        fontSize: '1rem'
      }
    },
    overrides: {
      MuiCssBaseline: {
        '@global': {
          '@font-face': ['Open Sans']
        }
      }
    }
  })

  const theme = mode === 'light' ? lightTheme : darkTheme

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

  // useEffect to get the restaurant data
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
  const handleAddToCart = (item) => {
    // check to see if the item is already in the cart
    const itemInCart = cart.find((cartItem) => cartItem.name === item.name)
    // if it is, we will increment the quantity
    if (itemInCart) {
      const newCart = cart.map((cartItem) => {
        if (cartItem.name === item.name) {
          return { ...cartItem, quantity: cartItem.quantity + 1 }
        } else {
          return cartItem
        }
      })
      setCart(newCart)
    } else {
      setCart([...cart, { ...item, quantity: 1 }])
    }
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* <Layout> */}
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
                <Route
                  path="/menu"
                  element={
                    <Menu
                      cart={cart}
                      currentUser={currentUser}
                      handleAddToCart={handleAddToCart}
                      restaurant={restaurant}
                    />
                  }
                />
                <Route
                  path="/checkout"
                  element={
                    <Checkout
                      cart={cart}
                      currentUser={currentUser}
                      restaurant={restaurant}
                      deliveryAddress={deliveryAddress}
                    />
                  }
                />

                <Route
                  path="/cartnav"
                  element={
                    <Checkout
                      cart={cart}
                      currentUser={currentUser}
                      restaurant={restaurant}
                      deliveryAddress={deliveryAddress}
                    />
                  }
                />
                <Route
                  path="/restaurants"
                  element={<AllRestaurants currentUser={currentUser} />}
                />
                <Route
                  path="/newrestaurant"
                  element={<RegisterRestaurant currentUser={currentUser} />}
                />

                <Route
                  path="/orders/:id/confirmed"
                  element={<OrderDetails currentUser={currentUser} />}
                />

                <Route path="/orders/:id" element={<Order />} />

                {/* Catch all routes that are not defined above. Keep as bottom route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </Router>
        {/* </Layout> */}
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}

export default App
