import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useState } from 'react';
import AddSection from './partials/AddSection';
import AddProduct from './partials/AddProduct';

function MenuCreate({products, setProducts, setMenu,  menu, handleSubmit}) {

    const [addSection, setAddSection] = useState(false)
    const [addProduct, setAddProduct] = useState(false)
    
    return (
        <Box component="div" sx={{ p: 2, m: 20, border: '1px dashed grey', width: '35%' }}>

        <h1>Menu Information:</h1>

        <div style={{ width: '80%', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
            <div className='MenuSection'>
                <label htmlFor='SectionName'>Section Name:</label>
                <TextField 
                    type="text"
                    variant="filled"
                    id="SectionName"
                    placeholder='Main Course'
                    onChange={e => setMenu({...menu, sectionName: e.target.value})}
                    value={menu.sectionName}
                />
            </div>

            <div className='menuProduct'>
                <label htmlFor='Products'>Product Name:</label>
                <TextField 
                    type="text"
                    variant="filled"
                    id="productName"
                    placeholder='Chicken Marsala'
                    onChange={e => setProducts({...products, name: e.target.value})}
                    value={products?.name}
                />
                <label htmlFor='Products'>Product Price:</label>
                <TextField 
                    type="text"
                    variant="filled"
                    id="productPrice"
                    placeholder='20.00'
                    onChange={e => setProducts({...products, price: e.target.value})}
                    value={products?.price}
                />
                <label htmlFor='Products'>Product description:</label>
                <TextField 
                    type="text"
                    variant="filled"
                    id="productName"
                    placeholder='Fried chicken in marsala sauce'
                    onChange={e => setProducts({...products, description: e.target.value})}
                    value={products?.description}
                />

                {/* Add another product */}
                {addProduct ? 
                <AddProduct
                    addSection={addSection} 
                    setAddSection={setAddSection} 
                    addProduct={addProduct} 
                    setAddProduct={setAddProduct} 
                    menu={menu}
                    setMenu={setMenu}
                    products={products}
                    setProducts={setProducts}/>
                    : 
                <Button onClick={() => {
                    
                    setAddProduct(true)
                    }}>
                    Add another product
                </Button>
                }
            </div>

            
                {/* Add another section */}
            {addSection ? 
            <AddSection
                addSection={addSection} 
                setAddSection={setAddSection} 
                addProduct={addProduct} 
                setAddProduct={setAddProduct}/> 
                : 
            <Button onClick={() => {setAddSection(true)}}>
                Add a menu section
            </Button>
            }

            <Button variant="outlined" type="submit">Register</Button>
        </form>
        </div>
    </Box>
    );
}


export default MenuCreate;