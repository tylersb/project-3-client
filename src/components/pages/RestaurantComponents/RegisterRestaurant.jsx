import { useState } from 'react'
import axios from 'axios'
import { Navigate } from 'react-router-dom'
import AccountInfoCreate from './AccountInfoCreate';
import MenuCreate from './MenuCreate';

export default function RegisterRestaurant({ currentUser, setCurrentUser }) {
	// state for the controlled form
	const [restaurantName, setRestaurantName] = useState('')
	const [restaurantDescription, setRestaurantDescription] = useState('')
	const [accountHolderName, setAccountHolderName] = useState('')
	const [address, setAddress] = useState({
		street: '',
		city: '',
		state: '',
		zip: ''
	})
	const [email, setEmail] = useState('')
	const [phone, setPhone] = useState('')
	const [msg, setMsg] = useState('')
    const [products, setProducts] = useState(
		{
        name: '',
        price: '',
        description: ''
		})
	const [sectionName, setSectionName] = useState({
		sectionName: '',
		products: [products]
	})
    const [menu, setMenu] = useState([sectionName])
	const [accountInfoComplete, setAccountInfoComplete] = useState(false)

	// submit event handler
	const handleSubmit = async e => {
		console.log('handleSubmit clicked')
		e.preventDefault()
		try {
			// post fortm data to the backend
			const reqBody = {
				restaurantName,
                accountHolderName,
				restaurantDescription,
				email, 
                phone,
				address: {
					street: address.street,
					city: address.city,
					state: address.state,
					zip: address.zip
				},
				menu
			}
			await axios.post(`${process.env.REACT_APP_SERVER_URL}/restaurants`, reqBody)
			.then(response => {
				console.log("axios response",response)
				// navigate(`/orders/${response.data._id}/confirmed`)
			})
			.catch(console.warn)
		} catch (err) {
			console.warn(err)
			if (err.response) {
				setMsg(err.response.data.msg)
			}
		}
 	}

	//handleMenu name - check for section name, add a section
	function handleSetMenu(section) {
		// check each section against array
		if(menu.sectionName.includes(section)) {
			//already have this section name... need to update
		} else {
			setSectionName(section)
		}
	}

	//returns from AccountInfoCreate component
	function handleAddAddress(address) {
		setAddress(address)
		setAccountInfoComplete(true)
	}

	// conditionally render a navigate component
	if (currentUser) {
		return <Navigate to="/profile" />
	}

	return (
		<div>
			{ accountInfoComplete ? 
			<MenuCreate 
				menu={menu}
				setMenu={setMenu}
				products={products}
				setProducts={setProducts}
				handleSubmit={handleSubmit}
			/> 
			:
			<AccountInfoCreate 
				handleAddAddress={handleAddAddress}
				msg={msg}
				email={email}
				setEmail={setEmail}
				phone={phone}
				setPhone={setPhone}
				accountHolderName={accountHolderName}
				setAccountHolderName={setAccountHolderName}
				restaurantName={restaurantName}
				setRestaurantName={setRestaurantName}
				restaurantDescription={restaurantDescription}
				setRestaurantDescription={setRestaurantDescription}
			/>
			}
		</div>
	)
}