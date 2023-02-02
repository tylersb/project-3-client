import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import { Button, Card, CardContent, Grid } from '@mui/material'
import { useState } from 'react'
import Transitionfood from '../../TransitionFood'


export default function MenuCreate({
  setMenu,
  menu,
  activeStep,
  setActiveStep,
  handleSubmitRestaurant
}) {
  const [section, setSection] = useState({
    sectionName: '',
    products: []
  })
  const [product, setProduct] = useState({
    name: '',
    price: '',
    description: ''
  })
  const [isEditingProduct, setIsEditingProduct] = useState(false)

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
      {section.products.length > 0 ? (
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
      ) : (
        currentProduct
      )}
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
    <Grid container m={2}>
      <Card m={3} p={2} elevate={2} style={{ margin: '0 auto' }}>
        <CardContent p={2}>
          <Typography variant="h3">Your Menu Information</Typography>

          <div className="MenuSection">
            <Typography m={2}>
              <TextField
                type="text"
                variant="filled"
                id="SectionName"
                label="Menu Section"
                fullWidth
                style={{ display: 'block' }}
                required
                placeholder="Main Course"
                onChange={(e) =>
                  setSection({ ...section, sectionName: e.target.value })
                }
                value={section.sectionName}
              />
            </Typography>
            {section.sectionName.length > 0 ? (
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
            ) : null}
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
              setIsEditingProduct(false)
            }}
          >
            <div>
              <Grid m={3}>
                <Typography m={2}>
                  <TextField
                    type="text"
                    variant="filled"
                    id="productName"
                    label="Product Name"
                    fullWidth
                    style={{ display: 'block' }}
                    required
                    placeholder="Chicken Marsala"
                    onChange={(e) =>
                      setProduct({ ...product, name: e.target.value })
                    }
                    value={product.name}
                    disabled={!isEditingProduct}
                  />
                </Typography>
                <Typography m={2}>
                  <TextField
                    type="text"
                    variant="filled"
                    id="productPrice"
                    label="Product Price"
                    fullWidth
                    style={{ display: 'block' }}
                    required
                    placeholder="20.00"
                    onChange={(e) =>
                      setProduct({ ...product, price: e.target.value })
                    }
                    value={product.price}
                    disabled={!isEditingProduct}
                  />
                </Typography>
                <Typography m={2}>
                  <TextField
                    type="text"
                    variant="filled"
                    label="Product Description"
                    fullWidth
                    style={{ display: 'block' }}
                    required
                    id="productDesc"
                    placeholder="Fried chicken in marsala sauce"
                    onChange={(e) =>
                      setProduct({ ...product, description: e.target.value })
                    }
                    value={product.description}
                    disabled={!isEditingProduct}
                  />
                </Typography>
              </Grid>
            </div>
            <div>
              {!isEditingProduct ? (
                <Button
                  type="button"
                  onClick={() =>
                    section.sectionName === ''
                      ? alert('Please enter a section name')
                      : setIsEditingProduct(true)
                  }
                >
                  Add New Product
                </Button>
              ) : (
                <Button type="submit">Save Product</Button>
              )}
            </div>
          </form>
        </CardContent>
      <Transitionfood 
        menu={menu}
        section={section}
        product={product}
      />
      <Button onClick={() => {handleSubmitRestaurant()}}>Register Restaurant</Button>
      </Card>
    </Grid>
  )
}
