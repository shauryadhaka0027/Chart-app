import { useContext, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { AuthContext } from "../ContextApi/AuthContext";

const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useContext(AuthContext);

    const login = async ({ username, password }) => {
        const success = handleInputErrors(username, password);
        if (!success) return;
        setLoading(true);
        try {
            const res = await axios.post("http://localhost:9001/auth/login", { username, password }, { withCredentials: true });
            const mydata = res.data;
            if (mydata.error) {
                throw new Error(mydata.error);
            }
            localStorage.setItem("chat-user", JSON.stringify(mydata));
            toast.success("Login succesfully")
            setAuthUser(mydata);
        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, login };
};

function handleInputErrors(username, password) {
    if (!username || !password) {
        toast.error("Please fill in both username and password");
        return false;
    }
    if (password.length < 6) {
        toast.error("Password is not correct");
        return false;
    }
    return true;
}

export default useLogin;
