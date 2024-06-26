import React, { useCallback, useContext } from 'react';
import useConversation from '../../Zustand/useConversation';
import { SocketContext } from '../../ContextApi/SocketContext';


const Conversation = ({ conversation, emoji, lastIndex }) => {
  const { selectedConversation, setSelectedConversation } = useConversation()
  const isSelected = selectedConversation?._id === conversation._id;
  
  const handleClick = () => {
    setSelectedConversation(conversation); 
  };
  const{onlineUser}=useContext(SocketContext)
  const isonline=onlineUser.includes(conversation._id)
  const str=conversation.profilePic
  const word=str.split("/")
  const words=word[0]
  

  return (
    <div>
      <div
        className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer ${
          isSelected ? 'bg-sky-500' : ''
        }`}
        onClick={handleClick} 
      >
        <div className={`avatar ${isonline?"online":""}`}>
          <div className='w-12 rounded-full'>
            <img src={words==="https:" ?`${conversation.profilePic}`:`http://127.0.0.1:9001/upload/${conversation.profilePic}`} alt='user avatar' />
          </div>
        </div>
        <div className='flex flex-col flex-1'>
          <div className='flex gap-3 justify-between'>
            <p className='font-bold text-gray-200'>{conversation.username}</p>
            <span className='text-xl'>{emoji}</span>
          </div>
        </div>
      </div>
      {!lastIndex && <div className='divider my-0 py-0 h-1' />}
    </div>
  );
};

export default Conversation;
