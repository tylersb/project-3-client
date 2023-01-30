import { useState } from 'react'
import Rating from '@mui/material/Rating'
import Box from '@mui/material/Box'
import StarIcon from '@mui/icons-material/Star'

const labels = {
  0.5: 'Useless',
  1: 'Useless+',
  1.5: 'Poor',
  2: 'Poor+',
  2.5: 'Ok',
  3: 'Ok+',
  3.5: 'Good',
  4: 'Good+',
  4.5: 'Excellent',
  5: 'Excellent+'
}

export default function HoverRating({ userReview, setUserReview }) {
  const [hover, setHover] = useState(-1)
  let rating = userReview?.rating

  function getLabelText(rating) {
    return `${rating} Star${rating !== 1 ? 's' : ''}, ${labels[rating]}`
  }

  return (
    <Box
      sx={{
        width: 200,
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Rating
        name="hover-feedback"
        value={userReview.rating}
        precision={0.5}
        getLabelText={getLabelText}
        onChange={(e, newValue) => {
          setUserReview({ ...userReview, rating: newValue })
        }}
        onChangeActive={(e, newHover) => {
          setHover(newHover)
        }}
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      {userReview.rating !== null && (
        <Box sx={{ ml: 2 }}>
          {labels[hover !== -1 ? hover : userReview.rating]}
        </Box>
      )}
    </Box>
  )
}
