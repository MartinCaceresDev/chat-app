import { useEffect, useState } from "react"
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { useAuthContext } from "../context/AuthContext";
import { useChatsContext } from "../context/ChatsContext";


export const Chats = () => {

  const [ chats, setChats ] = useState([]);
  const { user: currentUser } = useAuthContext();
  const { dispatch } = useChatsContext();

  useEffect(()=>{
    const getChats = ()=>{
      const sub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) =>{
        setChats(doc.data());
      });
      return ()=>sub();
    }
    currentUser.uid && getChats();
  },[currentUser.uid])

  const handleSelect = (userData)=>{
    dispatch({ type: 'CHANGE_USER', payload: userData})
  };

  return (
    <div className='chats'>

      {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map(chat=>(
        <div className="userChat" key={chat[0]} onClick={()=> handleSelect(chat[1].userInfo)}>

          <img src={chat[1].userInfo.photoURL} alt='userPhoto' />
          
          <div className="userChatInfo">
            <span>{chat[1].userInfo.displayName}</span>
            <p>{chat[1].lastMessage?.text}</p>
          </div>

        </div>
      ))}

    </div>
  )
}
