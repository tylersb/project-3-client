import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, Grid } from '@mui/material';
import { useState } from 'react';
import AddSection from './partials/AddSection';
import AddProduct from './partials/AddProduct';

function MenuCreate({ products, setProducts, setMenu, menu, handleSubmit }) {

    const [addSection, setAddSection] = useState(false)
    const [addProduct, setAddProduct] = useState(false)

    return (
        <Grid container m={2}>
            <Card m={3} p={2} elevate={2} style={{ width: "50%", margin: "0 auto" }}>
                <CardContent p={2}>
                    <Typography variant="h3">Your Menu Information</Typography>

                    <div className='MenuSection'>
                        <Typography m={2}>
                            <TextField
                                type="text"
                                variant="filled"
                                id="SectionName"
                                label="Menu Section"
                                fullWidth
                                style={{ display: "block" }}
                                required
                                placeholder='Main Course'
                                onChange={e => setMenu({ ...menu, sectionName: e.target.value })}
                                value={menu.sectionName}
                            />
                        </Typography>
                    </div>
                    <Grid m={3}>
                        <Typography m={2}>
                            <TextField
                                type="text"
                                variant="filled"
                                id="productName"
                                label="Product Name"
                                fullWidth
                                style={{ display: "block" }}
                                required
                                placeholder='Chicken Marsala'
                                onChange={e => setProducts({ ...products, name: e.target.value })}
                                value={products?.name}
                            />
                        </Typography>
                        <Typography m={2}>
                            <TextField
                                type="text"
                                variant="filled"
                                id="productPrice"
                                label="Product Price"
                                fullWidth
                                style={{ display: "block" }}
                                required
                                placeholder='20.00'
                                onChange={e => setProducts({ ...products, price: e.target.value })}
                                value={products?.price}
                            />
                        </Typography>
                        <Typography m={2}>
                            <TextField
                                type="text"
                                variant="filled"
                                label="Product Description"
                                fullWidth
                                style={{ display: "block" }}
                                required
                                id="productDesc"
                                placeholder='Fried chicken in marsala sauce'
                                onChange={e => setProducts({ ...products, description: e.target.value })}
                                value={products?.description}
                            />
                        </Typography>
                    </Grid>
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
                            setProducts={setProducts} />
                        :
                        <Button onClick={() => {

                            setAddProduct(true)
                        }}>
                            Add another product
                        </Button>
                    }


                {/* Add another section */}
                {addSection ?
                    <AddSection
                        addSection={addSection}
                        setAddSection={setAddSection}
                        addProduct={addProduct}
                        setAddProduct={setAddProduct} />
                    :
                    <Button onClick={() => { setAddSection(true) }}>
                        Add a menu section
                    </Button>
                }

                <Button variant="outlined" type="submit" onClick={(e) => { handleSubmit(e) }}>Register</Button>
            </CardContent>
        </Card>
        </Grid >
    );
}


export default MenuCreate;