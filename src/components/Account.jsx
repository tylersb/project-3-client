// Account page should have form to update user's name, email and password.  express handles the form submission, sends input to mongodb, and updates the user's data in the database.  The user's data is then returned to the client and the state is updated.  The user's data is then displayed on the page.

import React, { useState } from 'react';
import axios from 'axios';
// define functional component
export default function Account() {
    // define state variable
    const [formData, setFormData] = useState({
        // useState returns array with two elements: current state and function to update state
        name: '',
        email: '',
        password: ''
    })
}

// create function to handle input change event when user types in form fields
// setFormData wil update state from the current state
const handlInputChange = (event) => {
    const { name, value } = event.target;  // function uses destructuring to get name and value from event.target
    setFormData({ ...formData, [name]: value }); // spread operator to copy current state and update the name property with the value
}
// function to handle form submission
// prevent default method to prevent page from reloading
// 
const handleFormSubmit = async event => {
    event.preventDefault()
    try {
        // take the form data and send it to the server with axios.put
        const response = await axios.put(`${process.env.REACT_APP_SERVER_URL}/users/update`, formData, {})
        console.log(response.data)
        // decide what to do with response data
    } catch (error) {
        console.log(error)
    }

}

// create form
return (
    <div>
        <form onSubmit={handleFormSubmit}>
            <label>
                Name:
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
            </label>
            <label>
                Email:
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} />
            </label>
            <label>
                Password:
                <input type="password" name="password" value={formData.password} onChange={handleInputChange} />
            </label>
            <button type="submit">Create Account</button>
        </form>
    </div>
);

