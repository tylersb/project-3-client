import Box from '@mui/material/Box'
import Collapse from '@mui/material/Collapse'
import List from '@mui/material/List'
import { TransitionGroup } from 'react-transition-group'
import { useState, useEffect } from 'react'
import Menu from './Menu'
import Section from './Section'
import Product from './Product'
import { IconButton, ListItem, ListItemText } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

function renderItem({ item }) {
  return (
    <ListItem
      secondaryAction={
        <IconButton edge="end" aria-label="delete">
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText primary={item} />
    </ListItem>
  )
}

export default function TransitionFood({ menu, section, product }) {
  // checks if any of the product inputs fields have any text in them, if so, it will render the current product
  const currentProduct =
    product.name.length + product.price.length + product.description.length <
    1 ? null : (
      <Product product={product} />
    )

  // renders the section header and the current product if there are any products currently in the section, after it maps through them it will also attempt to render any products that are currently being edited
  const sectionHead = (
    <Section section={section} currentProduct={currentProduct} />
  )

  // returns true if the menu array is empty / hasn't been pushed to yet
  const emptyMenu = menu.length < 1

  const menuItems = (
    <Menu menu={menu} section={section} currentProduct={currentProduct} />
  )

  // checks if the menu is empty, if so, it will render the section header, if not, it will render the menu items

  useEffect(() => {
    let newMenu = [...menu]
    if (emptyMenu) {
      newMenu = [...newMenu, sectionHead]
    } else {
      newMenu = [...newMenu, menuItems]
    }
    setCurrentMenu(newMenu)
  }, [menu, section, product])

  const [currentMenu, setCurrentMenu] = useState([])
  console.log(currentMenu)

  // const handleAddCurrentMenu = () => {
  //   const nextHiddenItem = FRUITS.find((i) => !currentMenu.includes(i))
  //   if (nextHiddenItem) {
  //     setCurrentMenu((prev) => [nextHiddenItem, ...prev])
  //   }
  // }

  // const handleRemoveFruit = (item) => {
  //   setCurrentMenu((prev) => [...prev.filter((i) => i !== item)])
  // }

  // const addFruitButton = (
  //   <Button
  //     variant="contained"
  //     disabled={currentMenu?.length >= FRUITS?.length}
  //     onClick={handleAddCurrentMenu}
  //   >
  //     Add fruit to basket
  //   </Button>
  // )

  return (
    <div>
      {/* {addFruitButton} */}
      <Box sx={{ mt: 1 }}>
        <List>
          <TransitionGroup>
            {currentMenu?.map((item) => (
              <Collapse key={item}>
                {renderItem({ item })}
              </Collapse>
            ))}
          </TransitionGroup>
        </List>
      </Box>
    </div>
  )
}
