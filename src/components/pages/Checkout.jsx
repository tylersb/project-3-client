import { useState } from "react";
import axios from "axios";


//thinking I'll import props from menu page?
function Checkout(props) {
    //sample array
    const checkoutArray = {
        userId: props.currentUser?.id,
        restaurantId: "63d4186dde15026503afc76c",
        products: 
            [
            {name: 'Pepperoni Pizza',
            price: 15,
            quantity: 2 },

            {name: 'Chocolate Milk',
            price: 2, 
            quantity: 2}]
    }
    //holds array of checkout items
    let [checkoutItems, setCheckoutItems] = useState(checkoutArray)
    let [productsOnly, setProductsOnly] = useState(checkoutArray.products)


    //checkout submit function
   function handleSubmit(e) {
        e.preventDefault()
            // post order to the db with state items as order
            axios.post(`${process.env.REACT_APP_SERVER_URL}/orders`, checkoutItems)
                .then(response => {
                    console.log(response)
                })
                .catch(console.warn)
    }

    //need a delete item function
    function handleDelete(index) {
        console.log(index, 'index')
        const deleteItem = checkoutItems.products.filter((item, idx) => {
            console.log(idx, 'filter index')
            return idx !== index
        })
        //sets new state of array
        console.log(deleteItem)
        setCheckoutItems({...checkoutItems, products: deleteItem})
    }

    //add an item function/change quantity
    function handleAddItem(index, quantity) {
        console.log(checkoutItems.products)
        const addQuantity = checkoutItems.products.map((item, idx) => {
            //checks incoming index against array
            if(idx === index) {
                //sets the new quantity
                let newQuantity = item.quantity + 1
                //updates the item in the array 
                return {...item, quantity: newQuantity}
            } else{
                return item
            }
        })
        console.log(addQuantity)
        //sets new state of array
        setCheckoutItems({...checkoutItems, products: addQuantity})
    }

    //change an item function/change quantity
    function handleRemoveItem(index, quantity) {
        const removeQuantity = checkoutItems.products.map((item, idx) => {

            if(idx === index) {
                if(item.quantity > 0) {
                    let newQuantity = item.quantity - 1
                    return {...item, quantity: newQuantity}
                } else {
                    return  {...item, quantity: 0}
                }
            } else{
                return item
            }
        })
        setCheckoutItems({...checkoutItems, products: removeQuantity})
    }


    let items = checkoutItems.products.map((item, idx )=> {
        // console.log(item)
        return (
            <div key={`item-${idx}`}>
            <p>Item: {item.name}</p>
            <p>Price: {item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => {handleAddItem(idx, item.quantity)}}>Add Quantity</button>
            <button onClick={() => {handleRemoveItem(idx, item.quantity)}}>Remove Quantity</button>
            <button onClick={() => {handleDelete(idx)}}>Delete Item</button>
            </div>
        )
    })

    return ( 
    <>
    <h1>Checkout Component</h1>
        {items}
    <form onSubmit={handleSubmit}>
    <button type="submit">Checkout</button>
    </form>
    </> 
    );
}

export default Checkout;