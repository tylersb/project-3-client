import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from './partials/RestaurantCard'
import Stack from '@mui/material/Stack';

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
        <Stack
            direction="row"
            justifyContent="center"
            alignItems="baseline"
            spacing={1}
        >
        {allRestaurants.map(restaurant =>{
            return <RestaurantCard restaurant={restaurant} key={restaurant._id}/>
        })}
        </Stack>
        </>
     );
}

export default AllRestaurants;