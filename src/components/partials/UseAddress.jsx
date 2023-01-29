import { useState } from "react"
import UpdateAddress from "./UpdateAddress"

function UseAddress({user}) {
    const [street, setStreet] = useState(user ? user.street : '')
    const [city, setCity] = useState(user ? user.city : '')
    const [state, setState] = useState(user ? user.state : '')
    const [zip, setZip] = useState(user ? user.zip : '')
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
            <button onClick={() => {<UpdateAddress/>}}></button>
        </>
     );
}

export default UseAddress;