import { useContext, useEffect } from "react";
import { SocketContext } from "../ContextApi/SocketContext";
import useConversation from "../Zustand/useConversation";
import useGetMessage from "./useGetMessage";
import notification from ".././assets/sound/mixkit-clear-announce-tones-2861.wav"

const useListenMessages = () => {
  const { socket } = useContext(SocketContext);
  const { setMessages } = useConversation();
  const{messages}=useGetMessage()

  console.log("message00",messages)
  useEffect(() => {
   socket?.on('newMessage',(newMessages)=>{
    console.log("newMessage01",newMessages);
    const sound = new Audio(notification)
    sound.play()
    newMessages.shouldShake=true
    setMessages([...messages,newMessages]);
})
 return ()=> socket?.off("newMessage")
  }, [socket, setMessages,messages]);

};

export default useListenMessages;
