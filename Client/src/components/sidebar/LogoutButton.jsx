import React, { useContext } from 'react'
import { BiLogOut } from "react-icons/bi";
import uselogout from '../../Hooks/useLogout';
import { AuthContext } from '../../ContextApi/AuthContext';

const LogoutButton = () => {
  const{loading ,logout}=uselogout()
  const{authUser}=useContext(AuthContext)
  return (
    <div className='mt-auto'>
			
			{!loading ?(	<BiLogOut className='w-6 h-6 text-white cursor-pointer'  onClick={logout}/>):(
       <span  className='loading  loading-spinner'></span>
      )}
		  <div style={{display:'flex',justifyContent:'flex-end',marginTop:"-1.5rem"}}>
      <p style={{color:"white"}}>{authUser.msg.fullname}</p>
      </div>
      
		
		
		</div>
  )
}

export default LogoutButton
