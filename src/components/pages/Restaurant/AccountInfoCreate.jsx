import TextField from '@mui/material/TextField'
import { Button, Card, CardContent, Grid, Typography } from '@mui/material'

export default function AccountInfoCreate({
  restaurantInfo,
  setRestaurantInfo,
  setActiveStep,
  activeStep,
  ChaChaRealSmooth
}) {
  const handleSubmit = (e) => {
    e.preventDefault()
    setActiveStep(1)
    ChaChaRealSmooth()
  }

  return (
    <Grid container m={2}>
      <Card m={3} p={2} elevate={2} style={{ width: '50%', margin: '0 auto' }}>
        <CardContent p={2}>
          <form onSubmit={handleSubmit}>
            <Typography variant="h3">Register Your Restaurant</Typography>

            <Typography m={2}>
              <TextField
                type="text"
                variant="filled"
                id="restaurantName"
                label="Restaurant Name"
                fullWidth
                style={{ display: 'block' }}
                // required
                placeholder="Pizza Galore"
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    restaurantName: e.target.value
                  })
                }
                value={restaurantInfo.restaurantName}
              />
            </Typography>
            <Typography m={2}>
              <TextField
                type="text"
                variant="filled"
                id="accountHolderName"
                label="Account Holder Name"
                fullWidth
                style={{ display: 'block' }}
                placeholder="Mr. Pizza"
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    accountHolderName: e.target.value
                  })
                }
                value={restaurantInfo.accountHolderName}
              />
            </Typography>
            <Typography m={2}>
              <TextField
                type="text"
                variant="filled"
                id="restaurantDescription"
                label="Restaurant Description"
                fullWidth
                style={{ display: 'block' }}
                // required
                multiline
                rows={4}
                placeholder="A real Italian Pizzeria with only the bestest, freshest ingredients"
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    restaurantDescription: e.target.value
                  })
                }
                value={restaurantInfo.restaurantDescription}
              />
            </Typography>
            <Typography m={2}>
              <TextField
                type="email"
                id="email"
                variant="filled"
                label="Email"
                fullWidth
                style={{ display: 'block' }}
                required
                placeholder="your email..."
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    email: e.target.value
                  })
                }
                value={restaurantInfo.email}
              />
            </Typography>
            <Typography m={2}>
              <TextField
                type="Number"
                id="phone"
                variant="filled"
                label="Phone"
                fullWidth
                style={{ display: 'block' }}
                required
                placeholder="your phone..."
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    phone: e.target.value
                  })
                }
                value={restaurantInfo.phone}
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
                style={{ display: 'block' }}
                required
                placeholder="123 Street..."
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    address: {
                      ...restaurantInfo.address,
                      street: e.target.value
                    }
                  })
                }
                value={restaurantInfo.address.street}
              />
            </Typography>
            <Typography m={2}>
              <TextField
                type="text"
                id="city"
                variant="filled"
                label="City"
                fullWidth
                style={{ display: 'block' }}
                required
                placeholder="Los Angeles"
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    address: {
                      ...restaurantInfo.address,
                      city: e.target.value
                    }
                  })
                }
                value={restaurantInfo.address.city}
              />
            </Typography>
            <Typography m={2}>
              <TextField
                type="text"
                id="state"
                variant="filled"
                label="State"
                fullWidth
                style={{ display: 'block' }}
                required
                placeholder="California"
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    address: {
                      ...restaurantInfo.address,
                      state: e.target.value
                    }
                  })
                }
                value={restaurantInfo.address.state}
              />
            </Typography>
            <Typography m={2}>
              <TextField
                type="number"
                id="zip"
                label="Zip"
                fullWidth
                style={{ display: 'block' }}
                required
                variant="filled"
                placeholder="12345"
                onChange={(e) =>
                  setRestaurantInfo({
                    ...restaurantInfo,
                    address: {
                      ...restaurantInfo.address,
                      zip: e.target.value
                    }
                  })
                }
                value={restaurantInfo.address.zip}
              />
            </Typography>
            <Button variant="outlined" type="submit">
              Continue to Menu
            </Button>
          </form>
        </CardContent>
      </Card>
    </Grid>
  )
}
