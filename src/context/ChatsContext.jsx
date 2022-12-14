import { createContext, useContext, useReducer } from "react";
import { useAuthContext } from "./AuthContext";

const ChatsContext = createContext();
export const useChatsContext = ()=> useContext(ChatsContext);

const INITIAL_STATE = {
  chatId: 'null',
  user: {}
}

export const ChatsContextProvider = ({ children })=>{

  const { user: currentUser } = useAuthContext();

  const chatsReducer = (state, { type, payload })=>{
    switch (type){
      case 'CHANGE_USER':
        return {
          user: payload,
          chatId: currentUser.uid > payload.uid 
            ? currentUser.uid + payload.uid 
            : payload.uid + currentUser.uid,
        }
      default:
        return state;
    }
  }

  const [ state, dispatch ] = useReducer(chatsReducer, INITIAL_STATE)

	return (
		<ChatsContext.Provider value={{ data: state, dispatch }}>
			{children}
		</ChatsContext.Provider>
	);

};