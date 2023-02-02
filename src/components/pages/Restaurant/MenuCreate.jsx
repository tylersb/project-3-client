// import TextField from '@mui/material/TextField'
// import Button from '@mui/material/Button'
// import Box from '@mui/material/Box'
// import { useState } from 'react'
// import AddSection from './partials/AddSection'
// import AddProduct from './partials/AddProduct'

// export default function MenuCreate({ menu, setMenu }) {
//   // const [addSection, setAddSection] = useState(false)
//   // const [addProduct, setAddProduct] = useState(false)

//   return (
//     <Box
//       component="div"
//       sx={{ p: 2, m: 20, border: '1px dashed grey', width: '35%' }}
//     >
//       <h1>Menu Information:</h1>

//       <div style={{ width: '80%', margin: '0 auto' }}>
//         <div className="MenuSection">
//           <label htmlFor="SectionName">Section Name:</label>
//           <TextField
//             type="text"
//             variant="filled"
//             id="SectionName"
//             placeholder="Main Course"
//             onChange={(e) => setMenu({ ...menu, sectionName: e.target.value })}
//             value={menu.sectionName}
//           />
//         </div>

//         <div className="menuProduct">
//           <label htmlFor="Products">Product Name:</label>
//           <TextField
//             type="text"
//             variant="filled"
//             id="productName"
//             placeholder="Chicken Marsala"
//           />
//           <label htmlFor="Products">Product Price:</label>
//           <TextField
//             type="text"
//             variant="filled"
//             id="productPrice"
//             placeholder="20.00"
//           />
//           <label htmlFor="Products">Product description:</label>
//           <TextField
//             type="text"
//             variant="filled"
//             id="productName"
//             placeholder="Fried chicken in marsala sauce"
//           />

//           {/* Add another product */}
//           {/* <AddProduct
//             />

//             <Button
//             >
//               Add another product
//             </Button> */}
//         </div>

//         {/* Add another section */}
//         <AddSection />
//         <Button>Add a menu section</Button>

//         <Button variant="outlined" type="submit">
//           Register
//         </Button>
//       </div>
//     </Box>
//   )
// }

import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import { useState, useEffect, useRef, Fragment } from 'react'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'

export default function ScrollDialog({ menu, setMenu }) {
  const [open, setOpen] = useState(false)
  const [scroll, setScroll] = useState('paper')
  const [section, setSection] = useState({
    sectionName: '',
    products: []
  })
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: ''
  })
  const [isEditing, setIsEditing] = useState(false)

  const handleClickOpen = (scrollType) => () => {
    setOpen(true)
    setScroll(scrollType)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const descriptionElementRef = useRef(null)
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef
      if (descriptionElement !== null) {
        descriptionElement.focus()
      }
    }
  }, [open])

  const menuSection = (
    <div>
      <div className="MenuSection">
        <label htmlFor="SectionName">Section Name:</label>
        <TextField
          type="text"
          variant="filled"
          id="SectionName"
          placeholder="Main Course"
          onChange={(e) =>
            setSection({ ...section, sectionName: e.target.value })
          }
          value={section.sectionName}
        />
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (section.sectionName === '') return
          setSection({
            ...section,
            products: [...section.products, product]
          })
          setProduct({ name: '', price: '', description: '' })
          setIsEditing(false)
        }}
      >
        <div>
          <label htmlFor="Products">Product Name:</label>
          <TextField
            type="text"
            variant="filled"
            id="productName"
            placeholder="Chicken Marsala"
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
            value={product.name}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label htmlFor="Products">Product Price:</label>
          <TextField
            type="text"
            variant="filled"
            id="productPrice"
            placeholder="20.00"
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            value={product.price}
            disabled={!isEditing}
          />
        </div>
        <div>
          <label htmlFor="Products">Product description:</label>
          <TextField
            type="text"
            variant="filled"
            id="productName"
            placeholder="Fried chicken in marsala sauce"
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
            value={product.description}
            disabled={!isEditing}
          />
        </div>
        <div>
          <Button
            type="button"
            onClick={() =>
              section.sectionName === ''
                ? alert('Please enter a section name')
                : setIsEditing(true)
            }
          >
            Enter New Product
          </Button>
          <Button type="submit">Save Product</Button>
        </div>
      </form>
      <Button>Add a menu section</Button>
      <Button
        variant="outlined"
        type="submit"
        onClick={() => {
          if (section.sectionName === '') return
          setMenu([...menu, section])
          setSection({ sectionName: '', products: [] })
          setProduct({ name: '', price: '', description: '' })
        }}
      >
        Save Section
      </Button>
    </div>
  )

  const currentProduct =
    product.name.length + product.price.length + product.description.length <
    1 ? null : (
      <div>
        <h5>
          {product.price.length > 0 ? '($' + product.price + ')' : ''}{' '}
          {product.name}
        </h5>
        <h5>{product.description}</h5>
      </div>
    )

  const sectionHead = (
    <div>
      <h3>{section.sectionName}</h3>
      {section.products.length > 0
        ? 
        <div>
        {section.products.map((product) => {
            return (
              <div key={product.name}>
                <h5>
                  {product.price.length > 0 ? '($' + product.price + ')' : ''}{' '}
                  {product.name}
                </h5>
                <h5>{product.description}</h5>
              </div>
            )
          })}
          {currentProduct}
        </div>
        : currentProduct}
    </div>
  )

  const emptyMenu = menu.length < 1

  const menuItems = (
    <div>
      {menu.map((s) => {
        return (
          <div key={s.sectionName}>
            <h3>{s.sectionName}</h3>
            {s.products.length < 1
              ? null
              : s.products.map((product) => {
                  return (
                    <div key={product.name}>
                      <h5>
                        {product.price.length > 0
                          ? '($' + product.price + ')'
                          : ''}{' '}
                        {product.name}
                      </h5>
                      <h5>{product.description}</h5>
                    </div>
                  )
                })}
          </div>
        )
      })}
      {section.sectionName.length > 0 ? sectionHead : null}
    </div>
  )

  const menuDisplay = emptyMenu ? sectionHead : menuItems

  return (
    <>
      <Button onClick={handleClickOpen('paper')}>Edit Menu</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle
          id="scroll-dialog-title"
          sx={{ flex: 1, justifyContent: 'center' }}
        >
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            Menu
          </Box>
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Box>{menuSection}</Box>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >{menuDisplay}</Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
