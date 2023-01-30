import HoverRating from './HoverRating'
import CommentField from './CommentField'
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Reviews(props) {
  const [reviews, setReviews] = useState([])
  const [userReview, setUserReview] = useState({
    userId: '',
    restaurantId: '',
    rating: 0,
    comment: ''
  })
  const [avgRating, setAvgRating] = useState(0)

  const fetchReviews = async () => {
    if (!props.restaurantId) return
    const response = await axios.get(
      `${process.env.REACT_APP_SERVER_URL}/reviews/restaurants/${props.restaurantId}`
    )
    setReviews(response.data)
    const totalRating = response.data.reduce((acc, review) => {
      return acc + review.rating
    }, 0)
    setAvgRating(totalRating / response.data.length)
    const foundReview = response.data.find(
      (review) => review.userId === props.currentUser.id
    )
    if (foundReview) {
      setUserReview(foundReview)
    } else {
      setUserReview({
        userId: props.currentUser.id,
        restaurantId: props.restaurantId,
        ...userReview
      })
    }
  }

  useEffect(() => {
    fetchReviews()
  }, [props.restaurantId])

  const handleSubmission = async (e) => {
    e.preventDefault()
    const foundReview = reviews.find(
      (review) => review.userId === props.currentUser.id
    )
    if (foundReview) {
      await axios.put(
        `${process.env.REACT_APP_SERVER_URL}/reviews/${foundReview._id}`,
        userReview
      )
    } else {
      await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/reviews`,
        userReview
      )
    }
    fetchReviews()
  }

  return (
    <div>
      <h1>Reviews</h1>
      <h2>Average Rating: {avgRating}</h2>
      <HoverRating userReview={userReview} setUserReview={setUserReview} />
      <CommentField userReview={userReview} setUserReview={setUserReview} />
      <button onClick={handleSubmission}>Submit</button>
    </div>
  )
}
