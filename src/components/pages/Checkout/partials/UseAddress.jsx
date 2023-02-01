import { useState } from "react"
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

function UseAddress({user, deliveryAddress, handleUpdateAddress}) {
    const [name, setName] = useState(deliveryAddress ? deliveryAddress.name : '')
    const [street, setStreet] = useState(deliveryAddress ? deliveryAddress.street : '')
    const [city, setCity] = useState(deliveryAddress ? deliveryAddress.city : '')
    const [state, setState] = useState(deliveryAddress ? deliveryAddress.state : '')
    const [zip, setZip] = useState(deliveryAddress ? deliveryAddress.zip : '')
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
            disabled
            />
        <TextField
            variant="filled"
            label="Street Address"
            type="text" 
            name="deliveryStreet" 
            value={street} 
            onChange={(e) =>setStreet(e.target.value) }
            disabled
            required
            />
        <TextField
            variant="filled"
            label="City"
            type="text" 
            name="deliveryCity" 
            value={city} 
            onChange={(e) =>setCity(e.target.value) }
            disabled
            required
            />
        <TextField
            variant="filled"
            label="State"
            type="text" 
            name="deliveryState" 
            value={state} 
            onChange={(e) =>setState(e.target.value) }
            disabled
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
            disabled
            required
            />
            <Button
            variant="contained"
             onClick={() => handleUpdateAddress()}>
                Update Address
            </Button>
        </>
     );
}

export default UseAddress;