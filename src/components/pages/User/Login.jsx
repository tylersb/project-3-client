import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { TextField, Card, Grid, CardContent, Container } from '@mui/material';
import Button from '@mui/material/Button';


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
		<Container>
			<Grid container m={3}>
				<Card p={2} elevate={2} style={{ width: "40%", margin: "0 auto" }}>
					<CardContent >
						<Typography variant="h3">
							Login to Your Account
						</Typography>
						<p>{msg}</p>

						<form onSubmit={handleSubmit}>
							<Typography >
								<TextField
									variant="filled"
									color="primary"
									required
									type="email"
									placeholder='Email'
									onChange={e => setEmail(e.target.value)}
									value={email}
								/>
							</Typography>


							<Typography m={2}>
								<TextField
									variant="filled"
									color="primary"
									required
									type="password"
									placeholder='Password'
									onChange={e => setPassword(e.target.value)}
									value={password}
								/>
							</Typography>

							<Button variant="outlined" type="submit">Login</Button>
						</form>
					</CardContent>
				</Card>
			</Grid>
		</Container>
	)
}