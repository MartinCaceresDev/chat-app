import { Navigate } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';
import { Chat, Sidebar } from '../components'

export const HomePage = () => {
  const { user, loading } = useAuthContext();

  if (user){
    return (
      <div className='home'>
        <div className="container">

          <Sidebar />
          <Chat />

        </div>
      </div>
    )
  } else if (loading){
    return <div>Loading...</div>;
  } else {
    return <Navigate to='/login' replace />
  } 

}
