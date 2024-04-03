import React, { useContext, useState } from 'react'
// import { MdAddPhotoAlternate } from 'react-icons/md';
import { BsUpload } from "react-icons/bs";

import toast from 'react-hot-toast';
import useImageUpdate from '../../Hooks/useImageUpdate';
import { AuthContext } from '../../ContextApi/AuthContext';

const ChangeProfilePics = () => {
    const [image, setImage] = useState("")
    const{imageShow, setImageShow}=useContext(AuthContext)
    const[btn,setbtn]=useState(true)
    const handleChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            setbtn(false)
        }
    }
    const { imageupdate } = useImageUpdate()
    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData()
        if (image) {
            formData.append("image", image);

        }
        await imageupdate(formData)
        toast.success("Profile Update")
        setImageShow(true)
        setImage("")
        console.log("image22", image)
    }
    console.log("profile", image)
  
    return (
        <div class="p-6">
        <form onSubmit={handleSubmit} class="flex items-center">
            <input type='file'
                class="hidden"
                id='imageProfile'
                name='image'
                onChange={handleChange}
                accept="image/*" />
            <label for="imageProfile" class="cursor-pointer mr-4 ">
                <div class="bg-gray-100 rounded-lg p-2 ml-40 ">
                    <BsUpload size={25} class='text-gray-500 '  />
                </div>
            </label>
            <button type='submit' disabled={btn} class="bg-black hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Save
            </button>
        </form>
    </div>
    )
}

export default ChangeProfilePics
