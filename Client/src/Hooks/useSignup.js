import toast from "react-hot-toast";
import axios from "axios";
import { useState, useContext } from "react";
import { AuthContext } from "../ContextApi/AuthContext";

const usesignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useContext(AuthContext);

  const signup = async ({ fullname, confirm, password, gender, username }) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:9001/auth/register", { fullname, password, gender, username, confirm }, { withCredentials: true });
      const mydata = res.data;
      if (mydata.error) {
        throw new Error(mydata.error);
      }
    
      setAuthUser(mydata);
      localStorage.setItem("chart-user",JSON.stringify(mydata))
      console.log("getData",mydata)
      toast.success("Signup successful!"); 
    } catch (error) {
      handleError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleError = ({ fullname, confirm, password, gender, username }) => {
    if (!fullname || !confirm || !password || !gender || !username) {
      toast.error("Please fill all the fields");
      return false;
    }
    if (password !== confirm) {
      toast.error("Password does not match");
      return false;
    }
    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  return { loading, signup };
};

export default usesignup;
