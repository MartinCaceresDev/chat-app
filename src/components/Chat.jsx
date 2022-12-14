import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
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
            <AddAPhotoIcon />
          </div>

          <div className='icon'>
            <PersonAddIcon />
          </div>

          <div className='icon'>
            <MoreHorizIcon />
          </div>
        </div>
      </div>

      <Messages />

      <Input />
    </div>
  )
}
