import { useState } from "react"

function UpdateAddress({user, handleConfirmAddress}) {
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
                    />
                <input 
                    type="text" 
                    name="deliveryCity" 
                    value={city} 
                    onChange={(e) =>setCity(e.target.value) }
                    />
                <input 
                    type="text" 
                    name="deliveryState" 
                    value={state} 
                    onChange={(e) =>setState(e.target.value) }
                    />
                <input 
                    type="text" 
                    name="deliveryZip" 
                    value={zip} 
                    onChange={(e) =>setZip(e.target.value) }
                    />
                <button 
                type="submit"
                onClick={handleConfirmAddress}>
                    Confirm Delivery Address
                </button>
                </>
     );
}

export default UpdateAddress;