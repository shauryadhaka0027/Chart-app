import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../../ContextApi/AuthContext';
import useConversation from '../../Zustand/useConversation';
import { extractTime } from '../../utils/extractTime';
import { FaFilePdf } from "react-icons/fa6";

const Message = ({ message }) => {
  const [image, setImage] = useState("")
  const { authUser } = useContext(AuthContext)
  const { selectedConversation } = useConversation();
  const formattedTime = extractTime(message.createdAt)
  const formMe = message.senderId === authUser.msg.userId
  console.log("message11", message)



  

  // console.log("authUser.msg.profilePic",authUser.msg.profilePic)
  const str=authUser.msg.profilePic
  const word=str.split("/")
  const words=word[0]
  // console.log('selectedConversation?.profilePi',selectedConversation?.profilePic)

  const data = message?.message
  const type = message?.messageType
  const chatClassName = formMe ? "chat-end" : "chat-start";
  const profilePic = formMe ? selectedConversation?.profilePic : authUser.msg.profilePic
  const bgColor = formMe ? "bg-blue-500" : "";
  const shakeClass = message.shouldShake ? "shake" : ""

  const handlePdf=()=>{
    window.open(`http://127.0.0.1:9001/upload/${message.id}`)
  }



  return (
    <div className={`chat ${chatClassName}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={words==="https:"?`${profilePic}`:`http://127.0.0.1:9001/upload/${profilePic}`} alt='Tailwind CSS chat bubble component' />
        </div>
      </div>
      {data ? <div className={`chat-bubble text-white bg-blue-500 ${bgColor} ${shakeClass} pb-2`}>{message?.message}</div> : type === "image" ? <figure><img className='w-60 h-auto max-w-xs' src={`http://127.0.0.1:9001/upload/${message.id}`} /></figure> : <video className='w-60 h-auto max-w-xs' controls>
        <source src={`http://127.0.0.1:9001/upload/${message.id}`} type="video/mp4" />
      </video>}
      {/* {type === "image" ? <figure><img className='w-40 h-auto max-w-xs' src={`http://127.0.0.1:9001/upload/${message.id}`} /></figure> : <video className='w-60 h-auto max-w-xs' controls>
        <source src={`http://127.0.0.1:9001/upload/${message.id}`} type="video/mp4" />
      </video>} */}
      {type === "audio" && <audio className='w-10 h-auto max-w-xs' controls>
        src={`http://127.0.0.1:9001/upload/${message.id}`} type="audio/mp3"
      </audio>}
     
  


{type === 'pdf' && (
        <div onClick={handlePdf} style={{ border: '2px solid white', borderRadius: '15px', height: '2.5rem',cursor:"pointer",width:"25rem" }} className='mt-5  relative '>
          <p  style={{ textAlign: 'center', color: 'red' , width:"22rem" ,marginTop:"0.3rem"}}>{message.name} <FaFilePdf  className=' absolute right-2 top-2 ' size={20} /></p>
        </div>
      )}

      <div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formattedTime}</div>
    </div>
  )
}

export default Message
