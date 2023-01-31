import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UseAddress from "../partials/UseAddress";
import UpdateAddress from "../partials/UpdateAddress";
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CardComponent from "../partials/CardComponent";

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
        totalPrice: 10
    })

    const navigate = useNavigate()
    //checkout submit function
    async function handleSubmit(e) {

        e.preventDefault()
        //make sure update address has been confirmed and is all filled in
        if (updateAddress === false && deliveryAddress.street !== '' && deliveryAddress.city !== '' && deliveryAddress.state !== '' && deliveryAddress.zip !== '') {
            //if cart has items create order
            if (cart.length > 0) {

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
        }
            , 0))
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
            <CardComponent item={item} handleAddItem={handleAddItem} handleRemoveItem={handleRemoveItem} handleDelete={handleDelete} idx={idx} />
        </Grid>
        )
    })
    

    return (
        <>
        <Container>
            
                <div className="itemSection">
                    <h1>Checkout Component</h1>

                    {addItemErrorMsg && (
                        <p className="error">{addItemErrorMsg}</p>)}

                    {addAddressErrorMsg && (
                        <p className="error"> {addAddressErrorMsg} </p>)}

                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Order Details
                    </Typography>
                    <Grid container spacing={3}>
                        {items}
                    </Grid>
                    <p>Order Total: ${
                        checkoutItems?.products.reduce((total, item) => {
                            return total + item.price * item.quantity
                        }, 0)
                    }</p>
                </div>

                <div className="deliveryAddress">
                    <h3>Confirm Delivery Address:</h3>
                    {updateAddress ?
                        <UpdateAddress user={user} handleConfirmAddress={handleConfirmAddress} /> :
                        <UseAddress user={user} deliveryAddress={deliveryAddress} handleUpdateAddress={handleUpdateAddress} />}
                </div>

                <form onSubmit={handleSubmit}>
                    <Button
                        type="submit"
                        variant="contained">
                        Checkout
                    </Button>
                </form>
           
        </Container>
        </>
    )
}

export default Checkout
