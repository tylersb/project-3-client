import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import SubHeaderNavigation from './SubHeaderNavigation'

export default function Navbar({ currentUser, handleLogout }) {
  const loggedIn = (
    <>
      {/* if the user is logged in... */}
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Button variant="contained" color="inherit">
          <Link to="/profile">
            <p>Profile</p>
          </Link>
        </Button>
        <Button variant="contained" color="inherit">
          <Link to="/checkout">
            <p>Checkout</p>
          </Link>
        </Button>
        <Button variant="contained" color="inherit">
          <Link to="/">
            <p>
              <span onClick={handleLogout}>Logout</span>
            </p>
          </Link>
        </Button>
      </Typography>
    </>
  )

  const loggedOut = (
    <>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        <Button variant="contained" color="inherit">
          {/* if the user is not logged in... */}
          <Link to="/register">Register</Link>
        </Button>
        <Button variant="contained" color="inherit">
          <Link to="/login">Login</Link>
        </Button>
      </Typography>
    </>
  )

  return (
    <nav className="navbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            {/* user always sees this section */}
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Button variant="contained" color="inherit">
                <Link to="/">
                  <p>Home</p>
                </Link>
              </Button>
              <Button variant="contained" color="inherit">
                <Link to="/menu">
                  <p>Menu</p>
                </Link>
              </Button>
            </Typography>
            {currentUser ? loggedIn : loggedOut}
      <SubHeaderNavigation />
          </Toolbar>
        </AppBar>
      </Box>
    </nav>
  )
}
