import OrderHistory from '../OrderHistory'

export default function Profile({ currentUser, handleLogout }) {
  return (
    <div>
      <h1>Profile</h1>
      <p>Username: {currentUser?.name}</p>
      <p>Email: {currentUser?.email}</p>
      <p>
        Address: {currentUser?.address.street}, {currentUser?.address.city}, {currentUser?.address.state} {currentUser?.address.zip}
      </p>
      <OrderHistory userId={currentUser?.id} />
    </div>
  )
}
