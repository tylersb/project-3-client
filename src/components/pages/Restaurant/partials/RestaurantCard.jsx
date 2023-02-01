import * as React from 'react'
import { styled } from '@mui/material/styles'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardMedia from '@mui/material/CardMedia'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'
import Collapse from '@mui/material/Collapse'
import Avatar from '@mui/material/Avatar'
import { IconButton, Button } from '@mui/material'
import Typography from '@mui/material/Typography'
import { red } from '@mui/material/colors'
import FavoriteIcon from '@mui/icons-material/Favorite'
import ShareIcon from '@mui/icons-material/Share'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import { Link } from 'react-router-dom'

const ExpandMore = styled((props) => {
  const { expand, ...other } = props
  return <IconButton {...other} />
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest
  })
}))

function RestaurantCard({ restaurant }) {
  const [expanded, setExpanded] = React.useState(false)

  const handleExpandClick = () => {
    setExpanded(!expanded)
  }

  return (
    <Card sx={{ width: '40%', margin: '0 auto' }}>
      <CardHeader
        title={restaurant.restaurantName ? restaurant.restaurantName : 'Hello'}
        // subheader={{restaurant?.address.street}, {restaurant?.address.city}, {restaurant?.address.state},{restaurant?.address.zip}}
      />
      <CardMedia
        component="img"
        height="194"
        image="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
        alt="Grilled food"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          <Button component={Link} to={'/restaurant/' + restaurant._id}>
            See Menu
          </Button>
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            {restaurant.menu[0] ? restaurant.menu[0].sectionName : 'hello'}
          </Typography>
          <Typography paragraph>
            {restaurant.menu[1] ? restaurant.menu[1].sectionName : null}
          </Typography>
          <Typography paragraph>
            {restaurant.restaurantDescription
              ? restaurant.restaurantDescription
              : 'Hello description'}
          </Typography>
          <Typography>Maybe more content?</Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

export default RestaurantCard
