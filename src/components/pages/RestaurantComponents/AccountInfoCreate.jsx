import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';

function AccountInfoCreate({handleAddAddress, msg, email, setEmail, phone, setPhone, accountHolderName, setAccountHolderName, restaurantName, setRestaurantName}) {
	const [address, setAddress] = useState({
		street: '',
		city: '',
		state: '',
		zip: ''
	})
	return ( 
        <Box component="div" sx={{ p: 2, m: 20, border: '1px dashed grey', width: '35%' }}>
			<p>{msg}</p>

			<h1>Restaurant Account Information:</h1>

			<div style={{ width: '80%', margin: '0 auto' }}>
				<label htmlFor='restaurantName'>Restaurant Name:</label>
				<TextField 
					type="text"
					variant="filled"
					id="restaurantName"
					placeholder='Pizza Galore'
					onChange={e => setRestaurantName(e.target.value)}
					value={restaurantName}
				/>

				<label htmlFor='accountHolderName'>Account Holder Name:</label>
				<TextField 
					type="text"
					variant="filled"
					id="accountHolderName"
					placeholder='Pizza Galore'
					onChange={e => setAccountHolderName(e.target.value)}
					value={accountHolderName}
				/>

				<label htmlFor='email'>Email:</label>
				<TextField  
					type="email"
					id="email"
					variant="filled"
					placeholder='your email...'
					onChange={e => setEmail(e.target.value)}
					value={email}
				/>
				<label htmlFor='phone'>Phone:</label>
				<TextField  
					type="phone"
					id="phone"
					variant="filled"
					placeholder='your phone...'
					onChange={e => setPhone(e.target.value)}
					value={phone}
				/>
				<h4>Restaurant Address</h4>
				<label htmlFor='street'>Street:</label>
				<TextField  
					type="text"
					id="street"
					variant="filled"
					placeholder='123 Street...' 
					onChange={e => setAddress({...address, street: e.target.value})}
					value={address.street}
				/>
				<label htmlFor='city'>City:</label>
				<TextField  
					type="text"
					id="city"
					variant="filled"
					placeholder='Los Angeles'
					onChange={e => setAddress({...address, city: e.target.value})}
					value={address.city}
				/>
				<label htmlFor='state'>State:</label>
				<TextField  
					type="text"
					id="state"
					variant="filled"
					placeholder='California'
					onChange={e => setAddress({...address, state: e.target.value})}
					value={address.state}
				/>
				<label htmlFor='zip'>Zip Code:</label>
				<TextField  
					type="number"
					id="zip"
					variant="filled"
					placeholder='12345'
					onChange={e => setAddress({...address, zip: e.target.value})}
					value={address.zip}
				/>
				<Button 
					variant="outlined" 
					type="submit" 
					onClick={() => handleAddAddress(address)}>
					Continue to Menu
				</Button>
			</div>
		</Box>
     );
}

export default AccountInfoCreate;