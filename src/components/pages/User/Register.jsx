import { useState } from 'react'
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import { Navigate } from 'react-router-dom'
import Typography from '@mui/material/Typography';
import { TextField, Card, Grid, CardContent, Container } from '@mui/material';
import Button from '@mui/material/Button';


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
		<Grid container m={2}>
			<Card m={3} p={2} elevate={2} style={{ width: "50%", margin: "0 auto" }}>
				<CardContent p={2}>
					<Typography variant="h3">
						Sign up for an account
					</Typography>
					<p>{msg}</p>

					<form onSubmit={handleSubmit}>
						<Typography m={2}>
							<TextField
								variant="filled"
								color="primary"
								type="text"
								id="name"
								label="Name"
								fullWidth
								style={{ display: "block" }}
								required
								onChange={e => setName(e.target.value)}
								value={name}
							/>
						</Typography>
						<Typography m={2}>
							<TextField
								variant="filled"
								color="primary"
								type="email"
								id="email"
								label="Email"
								fullWidth
								style={{ display: "block" }}
								required
								onChange={e => setEmail(e.target.value)}
								value={email}
							/>
						</Typography>
						<Typography m={2}>
							<TextField
								variant="filled"
								color="primary"
								type="password"
								id="password"
								label="Password"
								fullWidth
								style={{ display: "block" }}
								required
								onChange={e => setPassword(e.target.value)}
								value={password}
							/>
						</Typography>
						<Typography m={2}>
							<TextField
								variant="filled"
								color="primary"
								type="number"
								id="phone"
								label="Phone Number"
								fullWidth
								style={{ display: "block" }}
								required
								onChange={e => setPassword(e.target.value)}
								value={password}
							/>
						</Typography>
						<h4>Delivery Address</h4>
						<Typography m={2}>
							<TextField
								variant="filled"
								color="primary"
								type="text"
								id="street"
								label="Street Address"
								fullWidth
								style={{ display: "block" }}
								required
								onChange={e => setStreet(e.target.value)}
								value={street}
							/>
						</Typography>
						<Typography m={2}>
							<TextField
								variant="filled"
								color="primary"
								type="text"
								id="city"
								label="City"
								fullWidth
								style={{ display: "block" }}
								required
								onChange={e => setCity(e.target.value)}
								value={city}
							/>
						</Typography>
						<Typography m={2}>
							<TextField
								variant="filled"
								color="primary"
								type="text"
								id="state"
								label="State"
								fullWidth
								style={{ display: "block" }}
								required
								onChange={e => setState(e.target.value)}
								value={state}
							/>
						</Typography>
						<Typography m={2}>
							<TextField
								variant="filled"
								color="primary"
								type="number"
								id="zip"
								label="Zip"
								fullWidth
								style={{ display: "block" }}
								required
								onChange={e => setZip(e.target.value)}
								value={zip}
							/>
						</Typography>
						<Button variant="outlined" type="submit">Register</Button>
					</form>
				</CardContent>
			</Card>
		</Grid>

	)
}