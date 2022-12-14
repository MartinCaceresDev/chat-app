import { AiOutlineCamera } from 'react-icons/Ai';
import { AiOutlineUserAdd } from 'react-icons/Ai';
import { BsThreeDots } from 'react-icons/Bs';
import { useChatsContext } from '../context/ChatsContext';
import { Messages, Input } from "./"

export const Chat = () => {

  const { data } = useChatsContext();

  return (
    <div className='chat'>
      <div className="chatInfo">
        
        <span>{data.user?.displayName}</span>

        <div className="chatIcons">
          <div className='icon'>
            <AiOutlineCamera />
          </div>

          <div className='icon'>
            <AiOutlineUserAdd />
          </div>

          <div className='icon'>
            <BsThreeDots />
          </div>
        </div>
      </div>

      <Messages />

      <Input />
    </div>
  )
}
