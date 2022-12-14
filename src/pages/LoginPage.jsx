import { Link } from 'react-router-dom';
import { useAuthContext } from '../context/AuthContext';

export const LoginPage = () => {

  const { login } = useAuthContext();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    if (!email || !password) return;
    login(email, password);
  };

  return (
    <div className='formContainer'>

      <div className="formWrapper">
        <h1 className='logo'>Chat</h1>
        <h2 className='title'>Sign in</h2>

        <form onSubmit={handleSubmit}>
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password'/>
          <button>Sign in</button>
        </form>
        
        <p>You don't have an account? <Link to='/register'>Register</Link></p>
      </div>

    </div>
  )
}
