import { useAuthContext } from '../context/AuthContext';

export const NavBar = () => {

  const { logout, user } = useAuthContext();

  return (
    <div className='navbar'>

      <span className='logo'>Chat</span>

      <div className="user">
        <img src={user.photoURL} alt='persona' />

        <span>{user.displayName}</span>
        
        <button onClick={logout}>logout</button>
      </div>

    </div>
  )
}
