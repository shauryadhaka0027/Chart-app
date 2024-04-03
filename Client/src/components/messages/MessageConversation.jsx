import React, { useContext, useEffect } from 'react'
import Messages from './Messages'
import MessageInput from './MessageInput'
import { TiMessages } from "react-icons/ti";
import useConversation from '../../Zustand/useConversation';
import { AuthContext } from '../../ContextApi/AuthContext';

const MessageConversation = () => {
	const { selectedConversation, setSelectedConversation }=useConversation()
    // const noChartSelected=true
	useEffect(()=>{
		return setSelectedConversation(null)
	},[setSelectedConversation])
  return (
    <div  style={{ backgroundImage: `url("https://wallpaper-mania.com/wp-content/uploads/2018/09/High_resolution_wallpaper_background_ID_77700445662.jpg")` }}  className='md:min-w-[450px]  lg:min-w-[950px] flex flex-col  '>
 			{!selectedConversation? (<NoChatSelected/>):(<>

                <div className='bg-slate-500 px-4 py-2 mb-2'>
 					<span className='label-text'>To:</span> <span className='text-gray-900 font-bold'>{selectedConversation.fullname}</span>
 				</div>
 				<Messages/>
 				<MessageInput/>
            
            
            </>)}
 		</div>
  )
}

export default MessageConversation


const NoChatSelected = () => {
	const { authUser } = useContext(AuthContext);
	return (
		<div className='flex items-center justify-center w-full h-full'>
			<div className='px-4 text-center sm:text-lg md:text-xl text-gray-200 font-semibold flex flex-col items-center gap-2'>
				<p>Welcome 👋  ❄ {authUser.msg.fullname}</p>
				<p>Select a chat to start messaging</p>
				<TiMessages className='text-3xl md:text-6xl text-center' />
			</div>
		</div>
	);
};
