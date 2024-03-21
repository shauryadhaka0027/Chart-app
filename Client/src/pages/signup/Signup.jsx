import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import GenderCheckbox from './GenderCheckbox';
import usesignup from '../../Hooks/useSignup';
import { useContext } from 'react';
import { AuthContext } from '../../ContextApi/AuthContext';


const Signup = () => {
  const {authUser,setAuthUser}=useContext(AuthContext)
  const [user, setUser] = useState({ fullname: "", gender: "", confirm: "", username: "", password: "" })

  const handleCheckboxChange = (gender) => {
    setUser({ ...user, gender })
  }

  const { loading, signup } = usesignup();

  const handlechange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(user);

    console.log("user",user);
    setUser({fullname: "", gender: "", confirm: "", username: "", password: ""})
  }

  return (
    <>
      <div className='flex flex-col items-center justify-center min-w-96 mx-auto'>
      <div className='w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
        <h1 className='text-3xl font-semibold text-center text-gray-300'>
          Sign Up <span className='text-blue-500'>ChatApp</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className='label p-2'>
              <span className='text-base label-text'>Full Name</span>
            </label>
            <input type='text' placeholder='Full-Name' className='w-full input input-bordered h-10' name="fullname" value={user.fullname} onChange={handlechange} />
          </div>
          <div>
            <label className='label p-2 '>
              <span className='text-base label-text'>Username</span>
            </label>
            <input type='text' placeholder='Username' className='w-full input input-bordered h-10' value={user.username} name="username" onChange={handlechange} />
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Password</span>
            </label>
            <input
              type='password'
              placeholder='Enter Password'
              className='w-full input input-bordered h-10'
              value={user.password}
              onChange={handlechange}
              name='password'
            />
          </div>
          <div>
            <label className='label'>
              <span className='text-base label-text'>Confirm Password</span>
            </label>
            <input
              type='password'
              placeholder='Confirm Password'
              className='w-full input input-bordered h-10'
              value={user.confirm}
              onChange={handlechange}
              name='confirm'
            />
          </div>
          <GenderCheckbox onCheckbox={handleCheckboxChange} onSelectedGender={user.gender} />
          <Link to={"/login"} className='text-sm hover:underline hover:text-blue-600 mt-2 inline-block'>
            Already have an account?
          </Link>
          <div>
            <button className='btn btn-block btn-sm mt-2 border border-slate-700'>Sign Up</button>
          </div>
        </form>
      </div>
    </div>
    
    </>
   
  );
};

export default Signup;