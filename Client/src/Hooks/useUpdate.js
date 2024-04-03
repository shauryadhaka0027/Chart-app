import axios from "axios"
import { useContext, useState } from "react"
import { AuthContext } from "../ContextApi/AuthContext"
import toast from "react-hot-toast"



const useUpdate = () => {
    const { authUser } = useContext(AuthContext)
    const [log, setLog] = useState(false)



    const update = async ({username,fullname}) => {
        // console.log("username", username)

        try {


            const res = await axios.patch(`http://localhost:9001/auth/update/${authUser.msg._id}`, {username,fullname}, { withCredentials: true })
            console.log("res", res.data)
            // console.log("form", formData)
            if (res.data.msg == "user name already exits") {
                toast.error("user name already exits")

            } else {
                toast.success("user is updated")


                const updatedUserData = {
                    msg: {
                        _id: authUser.msg._id,
                        profilePic: authUser.msg.profilePic,
                        username: username,
                        fullname: fullname
                    }
                };
                localStorage.setItem("chat-user", JSON.stringify(updatedUserData));


            }
        } catch (error) {
            toast.error(error.message)
        }

    }
    return { update, log }
}

export default useUpdate
