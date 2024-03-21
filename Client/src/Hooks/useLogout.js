import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../ContextApi/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const logout = async () => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:9001/auth/logout",{ withCredentials: true });
      const data = res.data;
      if (data.error) {
        throw new Error(data.error);
      }
      localStorage.removeItem("chat-user");
      setAuthUser(null);
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("An error occurred while logging out");
      console.error("Logout Error:", error); 
    } finally {
      setLoading(false); 
    }
  };

  return { loading, logout };
};

export default useLogout;
