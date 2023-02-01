import TextField from '@mui/material/TextField'

function AddMoreProduct({ products, setProducts }) {
  return (
    <div className="menuProduct">
      <label htmlFor="Products">Product Name:</label>
      <TextField
        type="text"
        variant="filled"
        id="productName"
        placeholder="Chicken Marsala"
        onChange={(e) => setProducts({ ...products, name: e.target.value })}
        value={products?.name}
      />
      <label htmlFor="Products">Product Price:</label>
      <TextField
        type="text"
        variant="filled"
        id="productPrice"
        placeholder="20.00"
        onChange={(e) => setProducts({ ...products, price: e.target.value })}
        value={products?.price}
      />
      <label htmlFor="Products">Product description:</label>
      <TextField
        type="text"
        variant="filled"
        id="productName"
        placeholder="Fried chicken in marsala sauce"
        onChange={(e) =>
          setProducts({ ...products, description: e.target.value })
        }
        value={products?.description}
      />
    </div>
  )
}

export default AddMoreProduct
