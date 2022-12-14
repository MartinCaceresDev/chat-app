import { useState } from "react";
import { collection, doc, getDoc, getDocs, query, serverTimestamp, setDoc, updateDoc, where  } from 'firebase/firestore';
import { db } from '../firebase-config';
import { useAuthContext } from "../context/AuthContext";


export const Search = () => {
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);
  const { user: currentUser } = useAuthContext()

  const handleSearch = async ()=>{
    try {
      const q = query(collection(db, 'users'), where('displayName', '==', username));
  
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(doc =>{
        setUser(doc.data());
      })
    } catch(err){
      setError(true);
    }
  };

  const handleKeyPress = (e)=>{
    e.code === 'Enter' && handleSearch();
  };

  const handleSelect = async ()=>{
    const combinedId = currentUser.uid > user.uid 
      ? currentUser.uid + user.uid 
      : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, 'chats', combinedId));

      if (!res.exists()){
        await setDoc(doc(db, 'chats', combinedId), {messages: []});

        await updateDoc(doc(db, 'userChats', currentUser.uid), {
          [combinedId + '.userInfo']: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });

        await updateDoc(doc(db, 'userChats', user.uid), {
          [combinedId + '.userInfo']: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          },
          [combinedId + '.date']: serverTimestamp()
        });

      }
    } catch(err) {
      console.log(err);
    } 

    setUser(null);
    setUsername("");
  };

  return (
    <div className='search'>
      <div className="searchForm">
        <input 
          type="text" 
          placeholder='Find a user' 
          value= {username} 
          onChange={e=>setUsername(e.target.value)} 
          onKeyDown={handleKeyPress}
        />
      </div>

      { user &&
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt='otherUser' />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      }
    </div>
  )
}
