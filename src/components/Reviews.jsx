import HoverRating from './HoverRating'
import CommentField from './CommentField'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Reviews(props) {
  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState({
    userId: props.currentUser?.userId,
    restaurantId: props.restaurantId,
    rating: 0,
    comment: ''
  })
  const [avgRating, setAvgRating] = useState(0)

  useEffect(() => {
    const fetchReviews = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/reviews/restaurants/${props.restaurantId}`
      )
      setReviews(response.data)
      if (props.currentUser) {
        const userReview = response.data.find(
          (review) => review.userId === props.currentUser.userId
        )
        if (userReview) {
          setUserReview(userReview)
        }
      }
      if (reviews.length > 0) {
        setAvgRating(
          reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        )
      }
    }
    fetchReviews()
  }, [props.restaurantId, props.currentUser, reviews])

  return (
    <div>
      <h1>Reviews</h1>
      <h2>Average Rating: {avgRating}</h2>
      <HoverRating userReview={userReview} setUserReview={setUserReview} />
      <CommentField userReview={userReview} setUserReview={setUserReview} />
      <button
        onClick={async () => {
          if (userReview._id) {
            await axios.put(
              `${process.env.REACT_APP_SERVER_URL}/reviews/${userReview._id}`,
              userReview
            )
          } else {
            await axios.post(
              `${process.env.REACT_APP_SERVER_URL}/reviews`,
              userReview
            )
          }
        }}
      >
        Submit
      </button>
    </div>
  )
}
