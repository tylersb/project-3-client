import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UseAddress from "./partials/UseAddress";
import UpdateAddress from "./partials/UpdateAddress";
import { Button, Typography, Grid, Container, Card, CardContent, Table, TableBody, TableContainer, Paper } from '@mui/material';
import CardComponent from "./partials/CardComponent";


function Checkout({ cart, currentUser, restaurant }) {
    let [totalPrice, setTotalPrice] = useState('')
    const [user, setUser] = useState(currentUser?.address);
    const [addItemErrorMsg, setItemErrorMsg] = useState('')
    const [addAddressErrorMsg, setAddressErrorMsg] = useState('')
    const [updateAddress, setUpdateAddress] = useState(false)
    const [deliveryAddress, setDeliveryAddress] = useState({
        name: currentUser?.name,
        street: currentUser?.address.street,
        city: currentUser?.address.city,
        state: currentUser?.address.state,
        zip: currentUser?.address.zip
    })

    let [checkoutItems, setCheckoutItems] = useState({
        restaurantId: restaurant?._id,
        userId: currentUser?.id,
        name: currentUser?.name,
        products: cart,
        dropOffAddress: deliveryAddress,
        totalPrice: totalPrice
    })

    const navigate = useNavigate()
    //checkout submit function
    async function handleSubmit(e) {

        e.preventDefault()
        //make sure update address has been confirmed and is all filled in
        if (updateAddress === false && deliveryAddress.street !== '' && deliveryAddress.city !== '' && deliveryAddress.state !== '' && deliveryAddress.zip !== '') {
            //if cart has items create order
            if (checkoutItems.products.length > 0) {

                // post order to the db with state items as order
                console.log('before POST', checkoutItems)
                await axios.post(`${process.env.REACT_APP_SERVER_URL}/orders`, checkoutItems)
                    .then(response => {
                        console.log(response)
                        navigate(`/orders/${response.data._id}/confirmed`)
                    })
                    .catch(console.warn)
            } else {
                setItemErrorMsg('Add some delicious foods to place your order. Your cart is empty!')
            }
        } else {
            setAddressErrorMsg('Please enter a valid address to continue')
        }
    }

    ////// Changing Item quantity and Deleting Items \\\\\
    //delete item function
    function handleDelete(index) {
        const deleteItem = checkoutItems.products.filter((item, idx) => {
            console.log('filter index', idx)
            return idx !== index
        })
        //sets new state of array
        setCheckoutItems({ ...checkoutItems, products: deleteItem })
    }

    //add an item function/change quantity
    function handleAddItem(index, quantity) {
        const addQuantity = checkoutItems.products.map((item, idx) => {
            //checks incoming index against array
            if (idx === index) {
                //sets the new quantity
                let newQuantity = item.quantity + 1
                //updates the item in the array
                return { ...item, quantity: newQuantity }
            } else {
                return item
            }
        })
        //sets new state of array
        setCheckoutItems({ ...checkoutItems, products: addQuantity })
    }

    //remove an item function/change quantity
    function handleRemoveItem(index, quantity) {
        const removeQuantity = checkoutItems.products.map((item, idx) => {
            if (idx === index) {
                if (item.quantity > 0) {
                    let newQuantity = item.quantity - 1
                    return { ...item, quantity: newQuantity }
                } else {
                    return { ...item, quantity: 0 }
                }
            } else {
                return item
            }
        })
        setCheckoutItems({ ...checkoutItems, products: removeQuantity })
    }

    function handleSetTotalPrice() {
        setTotalPrice(checkoutItems?.products.reduce((total, item) => {
            return total + item.price * item.quantity
        }, 0))
    }

    ////// Address functions \\\\\

    //toggles which address component to show
    function handleUpdateAddress() {
        setUpdateAddress(true)
    }
    //updates the delivery address
    function handleConfirmAddress(deliveryAddress) {
        setDeliveryAddress(deliveryAddress)
        setCheckoutItems({ ...checkoutItems, dropOffAddress: deliveryAddress })
        setUpdateAddress(false)
    }

    //items that appear in checkout basket
    let items = checkoutItems.products.map((item, idx) => {
        // console.log(item)
        return (
            <Grid item key={`item${idx}`}>
                <CardComponent
                    item={item}
                    handleAddItem={handleAddItem}
                    handleRemoveItem={handleRemoveItem}
                    handleDelete={handleDelete} idx={idx} />
            </Grid>
        )
    })


    return (
        <>
            <Container m={2}>

                <div className="itemSection">
                    <Typography variant="h1" gutterBottom m={3}>Checkout </Typography>

                    {addItemErrorMsg && (
                        <Typography className="error">{addItemErrorMsg}</Typography>)}

                    {addAddressErrorMsg && (
                        <Typography className="error"> {addAddressErrorMsg} </Typography>)}

                    {/* Checkout Items */}
                    <Card elevation={3} style={{ marginBottom: "5px"}}>
                        <CardContent>
                            <TableContainer component={Paper}>
                                <Table size="small" aria-label="a dense table">
                                    <TableBody>
                                        <Typography variant="h4" color="text.secondary" gutterBottom>
                                            Order Details
                                        </Typography>
                                        {items.length > 0 ? items : 
                                        <div>
                                        <Typography variant="h6" color="text.secondary" gutterBottom>
                                        You haven't placed any orders in your checkout yet. 
                                        </Typography>
                                        <Typography variant="h6" color="text.secondary" gutterBottom>
                                        Go find some grub!
                                        </Typography>
                                        </div>}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </CardContent>
                    </Card>


                    {/* Order Total */}
                    <Card style={{ marginBottom: "5px"}}>
                        <CardContent>
                            <Typography variant="h5">Order Total: ${
                                checkoutItems?.products.reduce((total, item) => {
                                    return total + item.price * item.quantity
                                }, 0)
                            }</Typography>
                        </CardContent>
                    </Card>
                </div>

                {/* Delivery Address */}
                <Card elevation={3} style={{ marginBottom: "5px", textAlign: "center"}}>
                    <CardContent>
                        <div className="deliveryAddress">
                            <Typography variant="h4">Delivery Address:</Typography>
                            {updateAddress ?
                                <UpdateAddress user={user} handleConfirmAddress={handleConfirmAddress} /> :
                                <UseAddress user={user} deliveryAddress={deliveryAddress} handleUpdateAddress={handleUpdateAddress} />}
                        </div>
                    </CardContent>
                </Card>

                <form onSubmit={handleSubmit}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ marginBottom: "20px", margin: "10px", width: "30%" }}
                        >
                        Checkout
                    </Button>
                </form>

            </Container>
        </>
    )
}

export default Checkout
