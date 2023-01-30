import React, { useState } from 'react'
import Reviews from '../Reviews'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import IconButton from '@mui/material/IconButton'
import { width } from '@mui/system'

// create function component Menu
export default function Menu(props) {
  // state is menuItems, setMenuItems is the function to update state, same applies to selectedItem, and cart
  const [selectedItem, setSelectedItem] = useState(null)

  const handleSelection = (item) => {
    setSelectedItem(item) // updates the state of selectedItem with the item that was clicked
  }

  const menu = props.restaurant.menu?.map((section, idx) => {
    return (
      <div key={section._id}>
        <h3>{section.sectionName}</h3>
        <div>
          {section.products.map((item) => (
            <div key={item._id}>
              <span
                onClick={() => handleSelection(item)}
                style={{ cursor: 'pointer' }}
              >
                {item.name} - ${item.price}
              </span>
              <IconButton
                color="primary"
                aria-label="add to shopping cart"
                onClick={() =>
                  props.handleAddToCart({
                    name: item.name,
                    price: item.price
                  })
                }
              >
                <AddShoppingCartIcon />
              </IconButton>
            </div>
          ))}
        </div>
      </div>
    )
  })

  return (
    <div
      style={{
        margin: '0 auto',
        width: '40vw',
      }}
    >
      <h1>Menu</h1>
      <div>{menu}</div>
      {selectedItem && <p>Selected: {selectedItem.name}</p>}
      <Reviews
        restaurantId={props.restaurant._id}
        currentUser={props.currentUser}
      />
    </div>
  )
  // if selectedItem is not null, display the name of the selected item, && is a conditional operator that checks if the first value is true, if it is, it displays the second value
}
