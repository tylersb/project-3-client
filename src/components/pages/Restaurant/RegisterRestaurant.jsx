import { useState } from 'react'
import CustomizedStepper from '../../CustomizedStepper'
import ChaChaSlide from '../../ChaChaSlide'
import axios from 'axios'

export default function RegisterRestaurant({ currentUser }) {
  // state for the controlled form
  const [restaurantInfo, setRestaurantInfo] = useState({
    restaurantName: '',
    restaurantDescription: '',
    accountHolderName: '',
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      zip: ''
    }
  })
  const [menu, setMenu] = useState([])
  const [activeStep, setActiveStep] = useState(0)

  const handleSubmit = async (e) => {
    try {
      const payload = {
        restaurantName: restaurantInfo.restaurantName,
        restaurantDescription: restaurantInfo.restaurantDescription,
        accountHolderName: restaurantInfo.accountHolderName,
        email: restaurantInfo.email,
        phone: restaurantInfo.phone,
        address: {
          street: restaurantInfo.address.street,
          city: restaurantInfo.address.city,
          state: restaurantInfo.address.state,
          zip: restaurantInfo.address.zip
        },
        menu: menu
      }
      const response = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/restaurants`,
        payload
      )
      setMenu([])
      setRestaurantInfo({
        restaurantName: '',
        restaurantDescription: '',
        accountHolderName: '',
        email: '',
        phone: '',
        address: {
          street: '',
          city: '',
          state: '',
          zip: ''
        }
      })
      console.log(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  // if (activeStep === 1) {
  //   setActiveStep(0)
  //   handleSubmit()
  // }

  return (
    <>
      <br />
      <CustomizedStepper activeStep={activeStep} />
      <div>
        <ChaChaSlide
          restaurantInfo={restaurantInfo}
          setRestaurantInfo={setRestaurantInfo}
          menu={menu}
          setMenu={setMenu}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
          handleSubmitRestaurant={handleSubmit}
        />
       
      </div>
    </>
  )
}
