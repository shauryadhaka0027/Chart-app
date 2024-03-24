import { useState } from "react"
import useConversation from "../Zustand/useConversation"
import toast from "react-hot-toast"
import axios from "axios"


const useSendMessage = () => {
  const [loading,setLoading]=useState(false)
  const{messages,setMessages,selectedConversation}=useConversation()
    const sendMessage=async(message)=>{
        setLoading(true)
        try {
            const res= await axios.post(`http://localhost:9001/msg/send/${selectedConversation._id}`,{message},{withCredentials:true})
            const data=res.data
            if(data.error){
                throw new Error(data.error)
            }
            console.log("data",data)
            setMessages([...messages,data.msg])
        } catch (error) {
            toast.error(error.message)
        } finally{
              setLoading(false)
        }
    }
    return {loading,sendMessage}
}

export default useSendMessage
