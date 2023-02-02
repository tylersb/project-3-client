import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';

function AddMoreProduct({ products, setProducts }) {

    return (
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
    );
}
