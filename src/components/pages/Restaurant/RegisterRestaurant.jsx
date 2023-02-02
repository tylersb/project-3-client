import { useState } from 'react'
import AccountInfoCreate from './AccountInfoCreate'
import MenuCreate from './MenuCreate'
import CustomizedStepper from '../../CustomizedStepper'
import ChaChaSlide from '../../ChaChaSlide'

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

  return (
    <>
      <br />
      {/* <CustomizedStepper 
        activeStep={activeStep}
      /> */}
      <div>
        <ChaChaSlide
          restaurantInfo={restaurantInfo}
          setRestaurantInfo={setRestaurantInfo}
          menu={menu}
          setMenu={setMenu}
          activeStep={activeStep}
          setActiveStep={setActiveStep}
         />

      </div>
    </>
  )
}
