import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import { useState } from 'react';

function AccountInfoCreate({ handleAddAddress, msg, email, setEmail, phone, setPhone, accountHolderName, setAccountHolderName, restaurantName, setRestaurantName, restaurantDescription, setRestaurantDescription }) {
	const [address, setAddress] = useState({
		street: '',
		city: '',
		state: '',
		zip: ''
	})
	return (
		<Grid container m={2}>
			<Card m={3} p={2} elevate={2} style={{ width: "50%", margin: "0 auto" }}>
				<CardContent p={2}>
					<Typography variant="h3">Regiser Your Restaurant</Typography>

					<Typography m={2}>
						<TextField
							type="text"
							variant="filled"
							id="restaurantName"
							label="Restaurant Name"
							fullWidth
							style={{ display: "block" }}
							required
							placeholder='Pizza Galore'
							onChange={e => setRestaurantName(e.target.value)}
							value={restaurantName}
						/>
					</Typography>
					<Typography m={2}>
						<TextField
							type="text"
							variant="filled"
							id="accountHolderName"
							label="Account Holder Name"
							fullWidth
							style={{ display: "block" }}
							placeholder='Mr. Pizza'
							onChange={e => setAccountHolderName(e.target.value)}
							value={accountHolderName}
						/>
					</Typography>
					<Typography m={2}>
						<TextField
							type="text"
							variant="filled"
							id="restaurantDescription"
							label="Restaurant Description"
							fullWidth
							style={{ display: "block" }}
							required
							multiline
							rows={4}
							placeholder='A real Italian Pizzeria with only the bestest, freshest ingredients'
							onChange={e => setRestaurantDescription(e.target.value)}
							value={restaurantDescription}
						/>
					</Typography>
					<Typography m={2}>
						<TextField
							type="email"
							id="email"
							variant="filled"
							label="Email"
							fullWidth
							style={{ display: "block" }}
							required
							placeholder='your email...'
							onChange={e => setEmail(e.target.value)}
							value={email}
						/>
					</Typography>
					<Typography m={2}>
						<TextField
							type="Number"
							id="phone"
							variant="filled"
							label="Phone"
							fullWidth
							style={{ display: "block" }}
							required
							placeholder='your phone...'
							onChange={e => setPhone(e.target.value)}
							value={phone}
						/>
					</Typography>
					<h4>Restaurant Address</h4>

					<Typography m={2}>
						<TextField
							type="text"
							id="street"
							variant="filled"
							label="Street"
							fullWidth
							style={{ display: "block" }}
							required
							placeholder='123 Street...'
							onChange={e => setAddress({ ...address, street: e.target.value })}
							value={address.street}
						/>
					</Typography>
					<Typography m={2}>
						<TextField
							type="text"
							id="city"
							variant="filled"
							label="City"
							fullWidth
							style={{ display: "block" }}
							required
							placeholder='Los Angeles'
							onChange={e => setAddress({ ...address, city: e.target.value })}
							value={address.city}
						/>
					</Typography>
					<Typography m={2}>
						<TextField
							type="text"
							id="state"
							variant="filled"
							label="State"
							fullWidth
							style={{ display: "block" }}
							required
							placeholder='California'
							onChange={e => setAddress({ ...address, state: e.target.value })}
							value={address.state}
						/>
					</Typography>
					<Typography m={2}>
						<TextField
							type="number"
							id="zip"
							label="Zip"
							fullWidth
							style={{ display: "block" }}
							required
							variant="filled"
							placeholder='12345'
							onChange={e => setAddress({ ...address, zip: e.target.value })}
							value={address.zip}
						/>
					</Typography>
					<Button
						variant="outlined"
						type="submit"
						onClick={() => handleAddAddress(address)}>
						Continue to Menu
					</Button>
				</CardContent>
			</Card>
		</Grid >
	);
}

export default AccountInfoCreate;