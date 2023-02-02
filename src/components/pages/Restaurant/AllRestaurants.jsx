import { useEffect, useState } from "react";
import axios from "axios";
import RestaurantCard from './partials/RestaurantCard'
import { Stack, Grid, Box } from '@mui/material';

function AllRestaurants() {
    const [allRestaurants, setAllRestaurants] = useState([])

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_SERVER_URL}/restaurants`)
                .then(response => {
                    setAllRestaurants(response.data)
                    console.log(response.data)
                })
        } catch (err) {
            console.log('use effect error', err)
        }
    }, [])

    return (
        <>
        <Box style={{margin: "0 auto"}}>
            <h1>Browse Restaurants</h1>
            {/* <Stack
                direction="row"
                justifyContent="center"
                alignItems="baseline"
                spacing={1}
            > */}
            <Grid container spacing={3}>
                {allRestaurants?.map(restaurant => {
                    return (
                        <Grid item xs={12} md={4}>
                            <RestaurantCard restaurant={restaurant} key={restaurant._id} />
                        </Grid>
                    )
                })}
                </Grid>
            {/* </Stack> */}
            </Box>
        </>
    );
}

export default AllRestaurants;