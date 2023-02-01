import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'

export default function AccountInfoCreate({
  restaurantInfo,
  setRestaurantInfo,
  setAccountInfoComplete
}) {

  const handleSubmit = (e) => {
    e.preventDefault()
    setAccountInfoComplete(true)
  }

  return (
    <Box
      component="div"
      sx={{ p: 2, m: 20, border: '1px dashed grey', width: '35%' }}
    >
      <h1>Restaurant Account Information:</h1>

      <div style={{ width: '80%', margin: '0 auto' }}>
        <form
          onSubmit={handleSubmit}
        >
        <label htmlFor="restaurantName">Restaurant Name:</label>
        <TextField
          type="text"
          variant="filled"
          id="restaurantName"
          placeholder="Pizza Galore"
          onChange={(e) =>
            setRestaurantInfo({
              ...restaurantInfo,
              restaurantName: e.target.value
            })
          }
          value={restaurantInfo.restaurantName}
        />

        <label htmlFor="accountHolderName">Account Holder Name:</label>
        <TextField
          type="text"
          variant="filled"
          id="accountHolderName"
          placeholder="Mr. Pizza"
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, accountHolderName: e.target.value })}
          value={restaurantInfo.accountHolderName}
        />
        <label htmlFor="restaurantDescription">Restaurant Description:</label>
        <TextField
          type="text"
          variant="filled"
          id="restaurantDescription"
          multiline
          rows={4}
          placeholder="A real Italian Pizzeria with only the bestest, freshest ingredients"
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, restaurantDescription: e.target.value })}
          value={restaurantInfo.restaurantDescription}
        />

        <label htmlFor="email">Email:</label>
        <TextField
          type="email"
          id="email"
          variant="filled"
          placeholder="your email..."
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, email: e.target.value })}
          value={restaurantInfo.email}
        />
        <label htmlFor="phone">Phone:</label>
        <TextField
          type="Number"
          id="phone"
          variant="filled"
          placeholder="your phone..."
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, phone: e.target.value })}
          value={restaurantInfo.phone}
        />
        <h4>Restaurant Address</h4>
        <label htmlFor="street">Street:</label>
        <TextField
          type="text"
          id="street"
          variant="filled"
          placeholder="123 Street..."
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, street: e.target.value })}
          value={restaurantInfo.street}
        />
        <label htmlFor="city">City:</label>
        <TextField
          type="text"
          id="city"
          variant="filled"
          placeholder="Los Angeles"
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, city: e.target.value })}
          value={restaurantInfo.city}
        />
        <label htmlFor="state">State:</label>
        <TextField
          type="text"
          id="state"
          variant="filled"
          placeholder="California"
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, state: e.target.value })}
          value={restaurantInfo.state}
        />
        <label htmlFor="zip">Zip Code:</label>
        <TextField
          type="number"
          id="zip"
          variant="filled"
          placeholder="12345"
          onChange={(e) => setRestaurantInfo({ ...restaurantInfo, zip: e.target.value })}
          value={restaurantInfo.zip}
        />
        <Button
          variant="outlined"
          type="submit"
        >
          Continue to Menu
        </Button>
        </form>
      </div>
    </Box>
  )
}
