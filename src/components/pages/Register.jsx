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
		<Box>
			<Typography variant="h2">
			<h1>Register for an account:</h1>
			</Typography>
			<p>{msg}</p>

			<form onSubmit={handleSubmit}>
				<Typography>
				<label htmlFor='name'>Name:</label>
				<input 
					type="text"
					id="name"
					placeholder='your username...'
					onChange={e => setName(e.target.value)}
					value={name}
				/>
				</Typography>
				<label htmlFor='email'>Email:</label>
				<input 
					type="email"
					id="email"
					placeholder='your email...'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>

				<label htmlFor='password'>Password:</label>
				<input 
					type="password"
					id="password"
					placeholder='password...'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
				<h4>Delivery Address</h4>
				<label htmlFor='street'>Street:</label>
				<input 
					type="text"
					id="street"
					placeholder='123 Street...'
					onChange={e => setStreet(e.target.value)}
					value={street}
				/>
				<label htmlFor='city'>City:</label>
				<input 
					type="text"
					id="city"
					placeholder='Los Angeles'
					onChange={e => setCity(e.target.value)}
					value={city}
				/>
				<label htmlFor='state'>State:</label>
				<input 
					type="text"
					id="state"
					placeholder='California'
					onChange={e => setState(e.target.value)}
					value={state}
				/>
				<label htmlFor='zip'>Zip Code:</label>
				<input 
					type="number"
					id="zip"
					placeholder='12345'
					onChange={e => setZip(e.target.value)}
					value={zip}
				/>

				<button type="submit">Register</button>
			</form>
		</Box>
	)
}