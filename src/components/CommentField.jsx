import TextField from '@mui/material/TextField'

export default function CommentField(props) {
  return (
    <TextField
      fullWidth
      id="outlined-multiline"
      label="Leave a comment"
      multiline
      rows={5}
      value={props.userReview.comment}
      onChange={(e) => {
        props.setUserReview({ ...props.userReview, comment: e.target.value })
      }}
      variant="outlined"
    />
  )
}
