import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from './partials/RestaurantCard'

function AllRestaurants() {
    const [allRestaurants, setAllRestaurants] = useState([])
    
    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
            .then(response => {
                setAllRestaurants(response.data)
                console.log(response.data)
            })
        } catch (err){
            console.log('use effect error', err)
        }
    }, [])
    
    return ( 
        <>
        <h1>Hello</h1>
        {allRestaurants.map(restaurant =>{
            return <RestaurantCard allRestaurants={restaurant} key={restaurant._id}/>
        })}
        </>
     );
}

export default AllRestaurants;