import { useState } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlinePhotograph } from 'react-icons/Hi';
import { useAuthContext } from '../context/AuthContext';


export const RegisterPage = () => {

  const { register } = useAuthContext();
  const [ photoName, setPhotoName ] = useState();

  const handleSubmit = (e)=>{
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    if (!displayName || !email || !password) return;
    register(displayName, email, password, file);
  };

  const showPhotoName = ({ target })=>{
    setPhotoName(target.files[0].name);
  }

  return (
    <div className='formContainer'>

      <div className="formWrapper">
        <h1 className='logo'>Chat</h1>
        <h2 className='title'>Register</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder='display name' />
          <input type="email" placeholder='email' />
          <input type="password" placeholder='password'/>

          <input type="file" id='file' onChange={showPhotoName}/>
          <label htmlFor='file'>
            <HiOutlinePhotograph />
            <span>{photoName || 'Add an avatar'}</span>
          </label>
          
          <button>Sign up</button>
        </form>

        <p>Do you have an account? <Link to='/login'>Login</Link></p>
      </div>

    </div>
  )
}
