import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Register({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')
	const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				name,
				email, 
				password,
				address: {
					street,
					city,
					state,
					zip
				}
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/register`, reqBody)

			// save the token in localstorage
			const { token } = response.data
			localStorage.setItem('jwt', token)

			// decode the token
			const decoded = jwt_decode(token)

			// set the user in App's state to be the decoded token
			setCurrentUser(decoded)

		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
 	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<Box component="div" sx={{ p: 2, m: 20, width: '35%', margin: '0 auto' }}>

			<h1>Register for an account:</h1>

			<p>{msg}</p>
			<div style={{ width: '80%', margin: '0 auto' }}>
			<form onSubmit={handleSubmit}>
				<label htmlFor='name' style={{
          display: 'block'
        }}>Name:</label>
				<TextField 
					type="text"
					id="name"
					placeholder='your username...'
					onChange={e => setName(e.target.value)}
					value={name}
				/>

				<label htmlFor='email' style={{
          display: 'block'
        }}>Email:</label>
				<TextField  
					type="email"
					id="email"
					placeholder='your email...'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>

				<label htmlFor='password' style={{
          display: 'block'
        }}>Password:</label>
				<TextField  
					type="password"
					id="password"
					placeholder='password...'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
				<h4>Delivery Address</h4>
				<label htmlFor='street' style={{
          display: 'block'
        }}>Street:</label>
				<TextField  
					type="text"
					id="street"
					placeholder='123 Street...'
					onChange={e => setStreet(e.target.value)}
					value={street}
				/>
				<label htmlFor='city' style={{
          display: 'block'
        }}>City:</label>
				<TextField  
					type="text"
					id="city"
					placeholder='Los Angeles'
					onChange={e => setCity(e.target.value)}
					value={city}
				/>
				<label htmlFor='state' style={{
          display: 'block'
        }}>State:</label>
				<TextField  
					type="text"
					id="state"
					placeholder='California'
					onChange={e => setState(e.target.value)}
					value={state}
				/>
				<label htmlFor='zip' style={{
          display: 'block'
        }}>Zip Code:</label>
				<TextField  
					type="number"
					id="zip"
					placeholder='12345'
					onChange={e => setZip(e.target.value)}
					value={zip}
				/>
        <br />
				<Button variant="outlined" type="submit">Register</Button>
			</form>
			</div>
		</Box>
	)
}