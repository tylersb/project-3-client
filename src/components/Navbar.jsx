import { Link } from 'react-router-dom'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import index from '../index.css';
export default function Navbar({ currentUser, handleLogout }) {
  const loggedIn = (
    <>
	
      {/* if the user is logged in... */}
	  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
			<Link to="/profile">
				<p>Profile</p>
			</Link>

			<Link to="/checkout">
				<p>Checkout</p>
			</Link>

			<Link to="/">
				<p>
					<span onClick={handleLogout}>Logout</span>
				</p>
			</Link>
			</Typography>
	
    </>
  )

  const loggedOut = (
    <>
      {/* if the user is not logged in... */}
      <Link to="/register">Register</Link>

      <Link to="/login">Login</Link>
    </>
  )

  return (
    <nav className='navbar'>
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					{/* user always sees this section */}
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Link to="/">
							<p>Home</p>
						</Link>

						<Link to="/menu">
							<p>Menu</p>
						</Link>
					</Typography>
					{currentUser ? loggedIn : loggedOut}
				</Toolbar>
			</AppBar>
		</Box>
    </nav>
  )
}
