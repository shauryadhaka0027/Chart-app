import React, { useRef } from 'react'
import Message from './Message'
import useGetMessage from '../../Hooks/useGetMessage'
import MessageSkeleton from '../Skeleton/MessageSkeleton'

const Messages = () => {
	const {messages,loading}=useGetMessage()
	const lastMessageRef = useRef();
	console.log("messages",messages)
  return (
    <div className='px-4 flex-1 overflow-auto'>
 			{!loading &&
				messages.length > 0 &&
				messages.map((message) => (
					<div key={message._id} ref={lastMessageRef}>
						<Message message={message} />
					</div>
				))}

			{loading && [...Array(3)].map((_, idx) => <MessageSkeleton key={idx} />)}
			{!loading && messages.length === 0 && (
				<p className='text-center'>Send a message to start the conversation</p>
			)}
 		</div>
  )
}

export default Messages