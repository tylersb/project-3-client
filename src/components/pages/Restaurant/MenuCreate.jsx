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
    <>
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
      <form>
        <div>
          <label htmlFor="Products">Product Name:</label>
          <TextField
            type="text"
            variant="filled"
            id="productName"
            placeholder="Chicken Marsala"
          />
        </div>
        <div>
          <label htmlFor="Products">Product Price:</label>
          <TextField
            type="text"
            variant="filled"
            id="productPrice"
            placeholder="20.00"
          />
        </div>
        <div>
          <label htmlFor="Products">Product description:</label>
          <TextField
            type="text"
            variant="filled"
            id="productName"
            placeholder="Fried chicken in marsala sauce"
          />
        </div>
        <Button>Add another product</Button>
      </form>
      <Button>Add a menu section</Button>
    </>
  )

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
        <DialogTitle id="scroll-dialog-title">Menu</DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          {menuSection}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
