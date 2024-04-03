import React, { useContext, useState } from 'react';
import { BiLogOut } from 'react-icons/bi';
import uselogout from '../../Hooks/useLogout';
import { AuthContext } from '../../ContextApi/AuthContext';
import useUpdate from '../../Hooks/useUpdate';
import ChangeProfilePics from '../ChangeProfile/ChangeProfilePics';
import useImageUpdate from '../../Hooks/useImageUpdate';


const LogoutButton = () => {
  const { loading, logout } = uselogout();
  const { authUser,myuser,imageShow} = useContext(AuthContext);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [user, setUser] = useState({
    username: authUser.msg.username,
    fullname: authUser.msg.fullname,
  });
  const [users, setUsers] = useState(`${authUser.msg.fullname}`)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  
  const { update } = useUpdate()
 

  const myimgg = authUser.msg.profilePic
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("User", user);
    await update(user)
    setUsers(user.fullname)
   
  };

  const handleCancel = () => {
    setUser({
      username: authUser.msg.username,
      fullname: authUser.msg.fullname,
    });
    setDialogOpen(false);
  };
  console.log("auth", authUser)
  const imgg = authUser.msg.profilePic
  const word = imgg.split("/")
  const words = word[0]
  console.log("words", words)
  return (
    <div className='mt-auto'>
      {!loading ? (
        <BiLogOut className='w-6 h-6 text-white cursor-pointer' onClick={logout} />
      ) : (
        <span className='loading  loading-spinner'></span>
      )}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '-1.5rem' }}>
        <button onClick={() => setDialogOpen(true)}>{users}</button>
      </div>

      {dialogOpen && (
      <dialog id='my_modal_1' open className='modal'>
      <div className='modal-box p-6 bg-white rounded-lg shadow-lg'>
        
        <div className='flex justify-center mb-6 h-14'>
          {imageShow ? (
            <img className='h-20 w-20 rounded-full' src={`http://127.0.0.1:9001/upload/${myuser.msg.profilePic}`} alt='Uploaded Profile' />
          ) : (
            <img className='h-20 w-20 rounded-full' src={word === 'https:' ? `${authUser.msg.profilePic}` : `http://127.0.0.1:9001/upload/${authUser.msg.profilePic}`} alt='Default Profile' />
          )}
        </div>
    
       
        <div className='mb-4 text-center'>
          <ChangeProfilePics />
        </div>
    
      
        <form onSubmit={handleSubmit}>
       
          <div className='mb-4'>
            <label htmlFor='fullname' className='block text-sm font-medium text-gray-700'>Full Name</label>
            <input
              id='fullname'
              type='text'
              className='input input-bordered w-full'
              placeholder='Full Name'
              name='fullname'
              value={user.fullname}
              onChange={handleChange}
            />
          </div>
    
        
          <div className='mb-6'>
            <label htmlFor='username' className='block text-sm font-medium text-gray-700'>Username</label>
            <input
              id='username'
              type='text'
              className='input input-bordered w-full'
              placeholder='Username'
              name='username'
              value={user.username}
              onChange={handleChange}
            />
          </div>
    
        
          <div className='flex justify-end'>
            <button type='submit' className='btn bg-black text-white hover:bg-blue-700  mr-2'>Save</button>
            <button type='button' className='btn   bg-black text-white  hover:bg-blue-700'   onClick={handleCancel}>Close</button>
          </div>
        </form>
      </div>
    </dialog>
    
      )}
    </div>
  );
};

export default LogoutButton;
