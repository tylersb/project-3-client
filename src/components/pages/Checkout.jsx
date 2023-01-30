import { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UseAddress from "../partials/UseAddress";
import UpdateAddress from "../partials/UpdateAddress";

function Checkout ({cart, currentUser, restaurant}) {
    //holds array of checkout items
    // let [checkoutItems, setCheckoutItems] = useState(cart)
    let [totalPrice, setTotalPrice] = useState('')
    const [user, setUser] = useState(currentUser?.address);
    const [addItemErrorMsg, setItemErrorMsg] = useState('')
    const [addAddressErrorMsg, setAddressErrorMsg] = useState('')
    const [updateAddress, setUpdateAddress] = useState(false)
    const [deliveryAddress, setDeliveryAddress] = useState({
        street: currentUser?.address.street,
        city: currentUser?.address.city,
        state: currentUser?.address.state,
        zip: currentUser?.address.zip
      })

    let [checkoutItems, setCheckoutItems] = useState({
        userId: currentUser?.id,
        restaurantId: restaurant?._id,
        products: cart,
        dropOffAddress: deliveryAddress,
        name: currentUser?.name,
        totalPrice: null
      })

    const navigate = useNavigate()
    //checkout submit function
    async function handleSubmit(e) {

        e.preventDefault()
        //make sure update address has been confirmed and is all filled in
        if (updateAddress === false && deliveryAddress.street !== '' &&deliveryAddress.city !== '' && deliveryAddress.state !== '' &&deliveryAddress.zip !== '') {
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
      console.log('filter index', idx )
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

  //change an item function/change quantity
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

  
  //items that appear in checkout basket
  let items = checkoutItems.products.map((item, idx) => {
    // console.log(item)
    return (
      <div key={`item-${idx}`}>
        <p>Item: {item.name}</p>
        <p>Price: {item.price}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Items total: ${item.price * item.quantity}</p>
        <button
          onClick={() => {handleAddItem(idx, item.quantity)}}>
          Add Quantity
        </button>
        <button
          onClick={() => {handleRemoveItem(idx, item.quantity)}}>
          Remove Quantity
        </button>
        <button
          onClick={() => {handleDelete(idx)}}>
          Delete Item
        </button>
      </div>
    )
  })

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

   function handleConfirmAddress(deliveryAddress) {
    console.log(deliveryAddress)
    setDeliveryAddress(deliveryAddress)
    setCheckoutItems({...checkoutItems, dropOffAddress: deliveryAddress})
    setUpdateAddress(false)
   }

  return (
    <>
      <div>
        <h1>Checkout Component</h1>
        {addItemErrorMsg && (
            <p className="error">{addItemErrorMsg}</p>
        )} 

        { addAddressErrorMsg && (
            <p clssName="error"> {addAddressErrorMsg} </p>
        )}

        {items}
        <p>Order Total: ${
        checkoutItems?.products.reduce((total, item) => {
          return total + item.price * item.quantity
        }
        , 0)
      }</p>
      </div>
      <div>
        <h3>Confirm Delivery Address:</h3>
        {updateAddress ? 
        <UpdateAddress user={user} handleConfirmAddress={handleConfirmAddress}/> : 
        <UseAddress user={user} deliveryAddress={deliveryAddress} handleUpdateAddress={handleUpdateAddress}/>}
      </div>

      <form onSubmit={handleSubmit}>
        <button type="submit">Checkout</button>
      </form>
    </>
  )
}

export default Checkout
