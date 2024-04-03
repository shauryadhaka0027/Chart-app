import React, { useContext, useState } from 'react';
import { AuthContext } from '../ContextApi/AuthContext';
import toast from 'react-hot-toast';
import axios from 'axios';

const useImageUpdate = () => {
    const { authUser,myuser,setMyuser } = useContext(AuthContext);
  
    const [userData,setUserData]=useState({})
    const imageupdate = async (formData) => {
        try {
            const res = await axios.patch(`http://localhost:9001/auth/image/${authUser.msg._id}`, formData, { withCredentials: true });
            toast.success('Successfully updated profile');
            const data = res.data; 
            const respo= await axios.get(`http://localhost:9001/auth/userData/${authUser.msg._id}`,{ withCredentials: true })

            
             setMyuser(respo.data)

            
            const updatedUserData = {
                msg: {
                        profilePic: data.filename,
                        _id: authUser.msg._id,
                        username: data.findUser.username,
                        fullname: data.findUser.fullname
                }
            };

            
            localStorage.setItem('chat-user', JSON.stringify(updatedUserData));
        } catch (error) {
            toast.error(error.message);
        }
    };
     
    return { imageupdate};
};

export default useImageUpdate;
