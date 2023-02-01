import OrderHistory from './OrderHistory'

export default function Profile({ currentUser, handleLogout }) {
  return (
    <div>
      <Typography>
      <h1>Profile</h1>
      </Typography>
      <Typography>
      <p>Username: {currentUser?.name}</p>
      <p>Email: {currentUser?.email}</p>
      <p>
        Address: {currentUser?.address?.street}, {currentUser?.address?.city}, {currentUser?.address?.state} {currentUser?.address?.zip}
      </p>
      </Typography>
      
      <OrderHistory userId={currentUser?.id} />
    </div>
  )
}
