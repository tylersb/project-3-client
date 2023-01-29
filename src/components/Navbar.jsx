import { Link } from 'react-router-dom'

export default function Navbar({ currentUser, handleLogout }) {
  const loggedIn = (
    <>
      {/* if the user is logged in... */}
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
    <nav>
      {/* user always sees this section */}
      <Link to="/">
        <p>Home</p>
      </Link>

	  <Link to="/menu">
		<p>Menu</p>
	  </Link>
      {currentUser ? loggedIn : loggedOut}
    </nav>
  )
}
