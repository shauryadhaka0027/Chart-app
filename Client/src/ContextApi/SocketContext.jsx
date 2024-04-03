import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { io } from "socket.io-client";

export const SocketContext = createContext();
export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUser, setOnlineUser] = useState([]);
  const { authUser } = useContext(AuthContext);

  useEffect(() => {
    if (authUser) {
      const socket = io("http://localhost:9001/", {
        query: {
          userId: authUser.msg._id
        }
      });
      console.log("socket is connected")
      setSocket(socket);
      console.log("socket", socket);
      socket.on("getOnlineUsers", (user) => {
        console.log("connected");
        setOnlineUser(user)
      })
      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [authUser]);

  return (
    <SocketContext.Provider value={{ socket, onlineUser }}>
      {children}
    </SocketContext.Provider>
  );
};
