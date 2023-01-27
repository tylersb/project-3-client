import React, { useState, useEffect } from 'react'
import axios from 'axios'
// create function component Menu 

export default function Menu() { // state is menuItems, setMenuItems is the function to update state, same applies to selectedItem
    const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
}

useEffect(() => {
    axios.get('/api-v1/menu').then(response => {
        setMenuItems(response.data) //updates the state of menuItems with data from the server
    })
}, [])

const handleSelection = (item) => {
    setSelectedItem(item) // updates the state of selectedItem with the item that was clicked
}

return (
    <div>
        <h1>Menu</h1>
        <div>
            {menuItems.map(item => ( // map over menuItems and create a button for each item
                <button key={item.id} onClick={() => 
                // this is the element that is rendered for each menu item, it is a button that calls the handleSelection function when clicked
                handleSelection(item)}>
                    {item.name}
                </button>
                // the key is the id of the item, the onClick calls the handleSelection function with the item as an argument - name of item is displayed
            ))}
        </div>
         {/* if selectedItem is true, display the name of the selected item */}
        {selectedItem && <p>Selected: {selectedItem.name}</p>}
        </div>
)

