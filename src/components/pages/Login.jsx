import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';

export default function Login({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [msg, setMsg] = useState('')

	// submit event handler
	const handleSubmit = async e => {
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				email, 
				password
			}
			const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/login`, reqBody)

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
			<h1>Login to Your Account:</h1>

			<p>{msg}</p>

			<form onSubmit={handleSubmit}>
				<Typography>
				<label htmlFor='email'>Email:</label>
				<TextField id="outlined-basic" variant="outlined" color="primary" required 
					type="email"
					
					placeholder='your email...'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
				</Typography>

				<label htmlFor='password'>Password:</label>
				<Typography>
				<TextField id="outlined-basic" variant="outlined" color="primary" required 
					type="password"
				
					placeholder='password...'
					onChange={e => setPassword(e.target.value)}
					value={password}
				/>
				</Typography>

				<Button variant="outlined" type="submit">Login</Button>
			</form>
		</Box>
	)
}