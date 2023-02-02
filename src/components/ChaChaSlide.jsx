import Box from '@mui/material/Box'
import Switch from '@mui/material/Switch'
import Slide from '@mui/material/Slide'
import { useState, useRef } from 'react'
import AccountInfoCreate from './pages/Restaurant/AccountInfoCreate'
import MenuCreate from './pages/Restaurant/MenuCreate'
import Accordian from './Accordians'

export default function ChaChaSlide({
  restaurantInfo,
  setRestaurantInfo,
  menu,
  setMenu,
  activeStep,
  setActiveStep,
  handleSubmit
}) {
  const [checked, setChecked] = useState(false)
  const containerRef = useRef(null)

  const handleChange = () => {
    setChecked((prev) => !prev)
  }

  return (
    <Box ref={containerRef}>
      <Box>
        <Box
          sx={{
            w: '50vw'
          }}
        >
          <Slide
            direction="right"
            in={!checked}
            container={containerRef.current}
            appear={false}
            unmountOnExit
            {...(checked ? { timeout: 300 } : {})}
          >
            <Box>
              <AccountInfoCreate
                activeStep={activeStep}
                setActiveStep={setActiveStep}
                restaurantInfo={restaurantInfo}
                setRestaurantInfo={setRestaurantInfo}
                ChaChaRealSmooth={handleChange}
              />
              {/* <Accordian /> */}
            </Box>
          </Slide>
          <Slide
            direction="left"
            in={checked}
            container={containerRef.current}
            mountOnEnter
            appear={true}
            {...(checked ? { timeout: 600 } : {})}
          >
            <Box>
              <MenuCreate menu={menu} setMenu={setMenu} 
                activeStep={activeStep}
                setActiveStep={setActiveStep}
              />
            </Box>
          </Slide>
          <Slide
            direction="left"
            in={checked}
            container={containerRef.current}
            mountOnEnter
            appear={true}
            {...(checked ? { timeout: 600 } : {})}
          >
            <Box>
              <Accordian />
            </Box>
          </Slide>
        </Box>
      </Box>
    </Box>
  )
}
