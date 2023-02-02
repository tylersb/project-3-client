import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'

export default function DescriptionAlert({ severity, message, title }) {
  return (
    <Alert severity={severity.toLowerCase()}>
      <AlertTitle>{title}</AlertTitle>
      {message}
    </Alert>
  )
}
