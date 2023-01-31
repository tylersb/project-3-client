import { useState } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function UpdateAddress({user, handleConfirmAddress}) {
    const [name, setName] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')
    const [state, setState] = useState('')
    const [zip, setZip] = useState('')
    return ( 
        <>
                <TextField 
                    variant="filled"
                    label="Name"
                    type="text" 
                    name="name" 
                    value={name} 
                    onChange={(e) =>setName(e.target.value) }
                    required
                    />
                <TextField
                    variant="filled"
                    label="Street Address"
                    type="text" 
                    name="deliveryStreet" 
                    value={street} 
                    onChange={(e) =>setStreet(e.target.value) }
                    required
                    />
                <TextField 
                    variant="filled"
                    label="City"
                    type="text" 
                    name="deliveryCity" 
                    value={city} 
                    onChange={(e) =>setCity(e.target.value) }
                    required
                    />
                <TextField
                    variant="filled"
                    label="State"
                    type="text" 
                    name="deliveryState" 
                    value={state} 
                    onChange={(e) =>setState(e.target.value) }
                    required
                    />
                <TextField
                    variant="filled"
                    label="Zip Code"
                    type="number" 
                    max="99999"
                    name="deliveryZip" 
                    value={zip} 
                    onChange={(e) =>setZip(e.target.value) }
                    required
                    />
                <Button 
                type="submit"
                variant="contained"
                onClick={() => handleConfirmAddress({
                    name,
                    street,
                    city,
                    state, 
                    zip
                })}>
                    Confirm Delivery Address
                </Button>
                </>
     );
}

export default UpdateAddress;