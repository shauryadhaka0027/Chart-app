import React from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../ContextApi/AuthContext';
import useConversation from '../../Zustand/useConversation';
import { extractTime } from '../../utils/extractTime';

const Message = ({ message }) => {
  const { authUser } = useContext(AuthContext)
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt)
  const formMe = message.senderId === authUser.msg.userId
  console.log("message11",message)
  // console.log("my-message",authUser)
  
  const chatClassName = formMe ? "chat-end" : "chat-start";
  const profilePic = formMe ?  selectedConversation?.profilePic :authUser.msg.profilePic 
  const bgColor = formMe ? "bg-blue-500" : "";
  const shakeClass=message.shouldShake ?"shake":""
  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={`${profilePic}`} alt='Tailwind CSS chat bubble component' />
        </div>
      </div>
      <div className={`chat-bubble text-white bg-blue-500 ${bgColor} ${shakeClass} pb-2`}>{message?.message}</div>
      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message
