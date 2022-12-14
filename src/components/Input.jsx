import { useState } from 'react';
import { arrayUnion, doc, serverTimestamp, Timestamp, updateDoc } from 'firebase/firestore';
import { getDownloadURL, uploadBytes } from 'firebase/storage';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { v4 as uuid } from 'uuid';
import { useAuthContext } from '../context/AuthContext';
import { useChatsContext } from '../context/ChatsContext';
import { db, storage } from '../firebase-config';


export const Input = () => {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const { user: currentUser } = useAuthContext();
  const { data } = useChatsContext();


  const handleSend = async ()=>{

    if (img){
      const storageRef = ref(storage, `images/${uuid()}.jpg`);
      const snapshot = await uploadBytes(storageRef, img);
      try {
        const url = await getDownloadURL(snapshot.ref);

        await updateDoc(doc(db, 'chats', data.chatId),{
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
            img: url,
          })
        })

      } catch (err) {
			console.log(err);
		}
    } else {
      await updateDoc(doc(db, 'chats', data.chatId),{
        messages: arrayUnion({
          id: uuid(),
          text,
          senderId: currentUser.uid,
          date: Timestamp.now()
        })
      })
    }

    await updateDoc(doc(db, 'userChats', currentUser.uid),{
      [data.chatId + '.lastMessage']: {text},
      [data.chatId + '.date']: serverTimestamp()
    });

    await updateDoc(doc(db, 'userChats', data.user.uid),{
      [data.chatId + '.lastMessage']: {text},
      [data.chatId + '.date']: serverTimestamp()
    });

    setText('');
    setImg(null);
  };


  return (
    <div className='input'>
      <input 
        type="text" 
        placeholder='type something...' 
        onChange={(e)=>setText(e.target.value)} 
        value={text} 
      />

      <div className="send">

        <input 
          type='file' 
          id='file' 
          onChange={e => setImg(e.target.files[0])} 
        />
        <label htmlFor="file">
          <div className='icon'>
            <AddPhotoAlternateIcon />
          </div>
        </label>

        <button className='send' onClick={handleSend}>send</button>
      </div>
    </div>
  )
}
