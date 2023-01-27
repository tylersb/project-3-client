import React, { useState, useEffect } from 'react'
import axios from 'axios'
// create function component Menu 

export default function Menu() { // state is menuItems, setMenuItems is the function to update state, same applies to selectedItem, and cart
    const [menuItems, setMenuItems] = useState([])
    const [selectedItem, setSelectedItem] = useState(null)
    const [cart, setCart] = useState([])
}

useEffect(() => {
    axios.get('/api-v1/menu').then(response => {
        setMenuItems(response.data) //updates the state of menuItems with data from the server
    })
}, [])

const handleSelection = (item) => {
    setSelectedItem(item) // updates the state of selectedItem with the item that was clicked
}

// create a function to add menu items to cart
const handleAddToCart = (item) => {
    let existingItem = cart.find(cartItem => cartItem.id === item.id) // check if item is already in cart
    if (existingItem) { // if item is already in cart, update the quantity
        existingItem.quantity++
        setCart([...cart]) // update the state of cart
    } else { // if item is not in cart, add it to cart
        setCart([...cart, {...item, quantity: 1}]) // spread operator to add item to cart and update the state of cart
    }
}

return (
    <div>
      <h1>Menu</h1>
      <div>
        
        {menuItems.map((item) => ( // map over menuItems and display each item, and a button to add to cart   
          <div key={item.id}>
            <button onClick={() => handleSelection(item)}>{item.name}</button>
            <button onClick={() => handleAddToCart(item)}>Add to Cart</button>
          </div>
        ))}
        
      </div>
      {selectedItem && <p>Selected: {selectedItem.name}</p>} 
    </div>
  );
  // if selectedItem is not null, display the name of the selected item, && is a conditional operator that checks if the first value is true, if it is, it displays the second value
      



