const express=require("express")
const { protectRoute } = require("../middleware/protectRoute")
const { message, getmessage } = require("../Controller/message.controller")
const messageRouter=express.Router()

messageRouter.post("/send/:id",protectRoute,message)
messageRouter.post("/:id",protectRoute,getmessage)

module.exports={messageRouter}