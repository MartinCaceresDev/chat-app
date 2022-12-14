import { useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import { useChatsContext } from "../context/ChatsContext"
import { db } from "../firebase-config";
import { Message } from "./"

export const Messages = () => {

  const [messages, setMessages] = useState([]);
  const { data } = useChatsContext();

  useEffect(() => {
    const sub = onSnapshot(doc(db, 'chats', data.chatId), (doc)=>{
      doc.exists() && setMessages(doc.data().messages);
    })
    return () => sub(); 
  }, [data.chatId])

  return (
    <div className='messages'>

      { messages.map(m=>(
        <Message key={m.id} message={m} />
      )) }
      
    </div>
  )
}
