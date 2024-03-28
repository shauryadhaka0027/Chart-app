import { useEffect, useState } from "react";
import useConversation from "../Zustand/useConversation";
import axios from "axios";
import toast from "react-hot-toast";

const useGetMessage = () => {
  const [loading, setLoading] = useState(false);
  const { messages, setMessages, selectedConversation } = useConversation();
   console.log('id',selectedConversation._id)
  useEffect(() => {
    const getMessage = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:9001/msg/get/${selectedConversation._id}`,
          
          { withCredentials: true }
        );
        const data = res.data.msg;
        console.log("data11",data)
        if (data.error) {
          throw new Error(data.error);
        }
       
        setMessages(data);
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    };

   if (selectedConversation?._id)  getMessage();
  }, [selectedConversation._id, setMessages]);
  

  return { loading, messages };
};

export default useGetMessage;
