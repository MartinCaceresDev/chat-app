import { useEffect, useRef } from 'react';
import { useAuthContext } from '../context/AuthContext'
import { useChatsContext } from '../context/ChatsContext';

export const Message = ({ message }) => {

  const { user: currentUser } = useAuthContext();
  const { data } = useChatsContext();

  const ref = useRef();

  useEffect(()=>{
    ref.current?.scrollIntoView({behavior: 'smooth'})
  },[message])

  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'owner'}`}>

      <div className="messageInfo">
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt='avatar' />
        <span>just now</span>
      </div>

      <div className="messageContent">
        <p>{message.text}</p>
        { message.img && <img src={message.img} alt='image' />}
      </div>
      
    </div>
  )
}
