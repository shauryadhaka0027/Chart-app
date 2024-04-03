import React from 'react'
import SearchInput from './SearchInput'
import LogoutButton from './LogoutButton'
import Conversations from "./Conversations"
const Slidebar = () => {
  return (
    
   <div 
	
    className='border-r border-slate-500 p-6 flex flex-col'>
			<SearchInput/>
			<div className='divider px-4'></div>
			<Conversations />
			<LogoutButton />
		</div>
    
  )
}

export default Slidebar
