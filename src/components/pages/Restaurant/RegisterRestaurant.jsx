import { useState } from 'react'
import axios from 'axios'
import AccountInfoCreate from './AccountInfoCreate'
import MenuCreate from './MenuCreate'
import CustomizedStepper from '../../CustomizedStepper'

export default function RegisterRestaurant({ currentUser }) {
  // state for the controlled form
  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurantName: '',
    restaurantDescription: '',
    accountHolderName: '',
    email: '',
    password: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  })
  const [menu, setMenu] = useState([])
  const [accountInfoComplete, setAccountInfoComplete] = useState(false)

  return (
    <>
      <br />
      <CustomizedStepper />
      <div>
        <AccountInfoCreate
          setAccountInfoComplete={setAccountInfoComplete}
          restaurantInfo={restaurantInfo}
          setRestaurantInfo={setRestaurantInfo}
          style={{ width: '50%' }}
        />
        <MenuCreate menu={menu} setMenu={setMenu} />
      </div>
    </>
  )
}
