import React, { createContext, useState } from 'react';


export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(JSON.parse(localStorage.getItem("chat-user")) || null);
  const[myuser,setMyuser]=useState({})
  const [imageShow, setImageShow] = useState(false)

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser ,myuser,setMyuser,imageShow, setImageShow}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
