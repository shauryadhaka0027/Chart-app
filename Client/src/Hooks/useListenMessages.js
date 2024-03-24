import { useContext, useEffect } from "react";
import { SocketContext } from "../ContextApi/SocketContext";
import useConversation from "../Zustand/useConversation";

const useListenMessages = () => {
  const { socket } = useContext(SocketContext);
  const { messages, setMessages } = useConversation();

  console.log("message00",messages)
  useEffect(() => {
   socket.on('newMessage',(newMessages)=>{
    console.log("newMessage0",newMessages);
    setMessages([...messages, newMessages]);
})
  }, [socket, setMessages]);

};

export default useListenMessages;
