import React from 'react'
import Slidebar from '../../components/sidebar/Slidebar'
import MessageConversation from '../../components/messages/MessageConversation'

const Homepage = () => {
  return (
    <div className='flex sm:h-[450px] md:h-[550px] rounded-lg overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
     <Slidebar/>
     <MessageConversation/>
  </div>
  )
}

export default Homepage
