import { useState } from "react"

function UseAddress({user, deliveryAddress, handleUpdateAddress}) {
    const [street, setStreet] = useState(deliveryAddress ? deliveryAddress.street : '')
    const [city, setCity] = useState(deliveryAddress ? deliveryAddress.city : '')
    const [state, setState] = useState(deliveryAddress ? deliveryAddress.state : '')
    const [zip, setZip] = useState(deliveryAddress ? deliveryAddress.zip : '')
    return ( 
        <>
        <input 
            type="text" 
            name="deliveryStreet" 
            value={street} 
            onChange={(e) =>setStreet(e.target.value) }
            disabled
            />
        <input 
            type="text" 
            name="deliveryCity" 
            value={city} 
            onChange={(e) =>setCity(e.target.value) }
            disabled
            />
        <input 
            type="text" 
            name="deliveryState" 
            value={state} 
            onChange={(e) =>setState(e.target.value) }
            disabled
            />
        <input 
            type="text" 
            name="deliveryZip" 
            value={zip} 
            onChange={(e) =>setZip(e.target.value) }
            disabled
            />
            <button onClick={() => handleUpdateAddress()}>Update Address</button>
        </>
     );
}

export default UseAddress;