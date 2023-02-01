import * as React from 'react';
import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActions, Container, Button, Stack } from '@mui/material';
import Pizza from './Checkout/partials/PizzaYum.jpg'


export default function Welcome() {
  return (
	<Container>
		<Card sx={{ width: "100%"}}>
			<CardMedia
			component="img"
			height="140"
			image={Pizza}
			alt="pizza"
			/>
			<CardContent>
			<Typography gutterBottom variant="h5" component="div">
			Hungry Hippos
			</Typography>
			<Typography variant="body2" color="text.secondary">
				Find what you're craving and get it delivered with no hassles. 
			</Typography>
			</CardContent>
		</Card>
		<Stack 
			direction="row"
			justifyContent="center"
			alignItems="baseline"
			spacing={1} >
		<Card sx={{ width: "40%", mt: "10px", height: "30%"}}>
			<CardMedia
			component="img"
			height="140"
			image={Pizza}
			alt="pizza"
			/>
			<CardContent>
			<Typography gutterBottom variant="h5" component="div">
			Find Restaurants
			</Typography>
			<Typography variant="body2" color="text.secondary">
			Browse restaurants, select your favorite dishes, and place your order for delivery. 
			</Typography>
			</CardContent>
			<CardActions>
				<Button 
				size="small"
				color='secondary'>
					<Link to="/restaurants">Browse Restaurants</Link>
				</Button>
			</CardActions>
		</Card>
		<Card sx={{ width: "40%", mt: "10px"}}>
			<CardMedia
			component="img"
			height="140"
			image={Pizza}
			alt="pizza"
			/>
			<CardContent>
			<Typography gutterBottom variant="h5" component="div">
			Sign Up For an Account
			</Typography>
			<Typography variant="body2" color="text.secondary">
			Sign up for an account to start ordering meals to your door.  
			</Typography>
			</CardContent>
			<CardActions>
				<Button size="small">
				<Link to="/login">Sign up here</Link>
				</Button>
			</CardActions>
		</Card>
		</Stack>
		</Container>
  );
}