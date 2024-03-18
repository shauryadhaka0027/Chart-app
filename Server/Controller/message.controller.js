const { ConversationModel } = require("../Model/conversation.model");
const { MessageModel } = require("../Model/message.model");

const message = async (req, res) => {
    try {
        const { id: receiverId } = req.params;
        const { message } = req.body;
        const senderId = req.userId;

        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, receiverId],
                messages: []
            });
        }

        const newMessage = new MessageModel({
            senderId,
            receiverId,
            message
        });

        await Promise.all([conversation.save(),newMessage.save( )])

        conversation.messages.push(newMessage._id);

    

        res.status(200).send({ "msg": newMessage });
    } catch (error) {
        res.status(400).send({ "msg": error });
    }
};
const getmessage=async(req,res)=>{
    try {
        const senderId = req.userId;
        const {id:usertochartId} =req.params
        const conversation=await ConversationModel.findOne({
            participants:{$all:[senderId,usertochartId]}
        }).populate("messages")
        res.status(200).send({"msg":conversation.messages})
    } catch (error) {
        console.log("error in getmessage controller",error)
        res.status(400).send({"msg":error})
    }
}

module.exports = { message ,getmessage};
