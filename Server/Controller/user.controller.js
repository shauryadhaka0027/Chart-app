const { AuthModel } = require("../Model/authmodel")

const getUserForSidebar=async(req,res)=>{
        try {
            const loggedInUserId=req.userId
            const filterUserId=await AuthModel.find({_id:{$ne:loggedInUserId}}).select("password")
            res.status(200).send({"msg":filterUserId})
        } catch (error) {
            console.log("error in getuserforsidebar",error.msg)
            res.status(400).send({"msg":error})
        }
}

module.exports={getUserForSidebar}