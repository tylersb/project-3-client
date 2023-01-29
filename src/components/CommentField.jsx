import TextField from '@mui/material/TextField'
import { useState } from 'react'

export default function CommentField(props) {
  const [comment, setComment] = useState('')

  return (
    <TextField
      fullWidth
      id="outlined-multiline"
      label="Leave a comment"
      multiline
      rows={5}
      value={comment}
      onChange={(e) => setComment(e.target.value)}
      variant="outlined"
    />
  )
}
