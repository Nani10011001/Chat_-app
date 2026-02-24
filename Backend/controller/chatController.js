import { uploadFileToCloudinary } from "../config/cloundinary.js";
import { Conversation } from "../models/Conversation.js";
import response from "../utils/responseHandeler.js";
import { Message } from "../models/Messages.js";
export const sendMessage=async(req,res)=>{

    try {
        const {senderId,receiverId,content,messageStatus}=req.body;
        const file=req.file
        //participants to make the senderId and receiver second sort
        const participants=[senderId,receiverId].sort()
        //check if conversation alreasy exists
        let conversation=await Conversation.findOne(
            {
                participants:participants
            }
        );
        if(!conversation){
            conversation=new Conversation(
                {
                    participants:participants,
              
                }
            )
        }
        await conversation.save()
        let imageOrVideoUrl=null;
        let contentType=null;
        // handeling file upload things
        if(file){
            const uploadFile=await uploadFileToCloudinary(file);
                        if(!uploadFile?.secure_url){
return response(res,400,"failed to upload media")
            }
            imageOrVideoUrl=uploadFile?.secure_url
                        if(file.mimetype.startsWith("image")){
                contentType="image"

                        }else if(file.mimetype.startsWith("video")){
              contentType="video"
            }
            else{
                return response(res,400,"unsupported files")
            }
           
        } else if(content?.trim()){
            contentType="text"    
            }
            else{
                  return response(res,400,"message content is required")
            }
            const message=new Message({
                conversation:conversation._id,
                sender:senderId,
                receiver:receiverId,
                content:content,
                contentType,
                imageorVedio:imageOrVideoUrl,
                messageStatus
            })
            await message.save()
            
            if(message?.content){
            conversation.lastMessage=message?.id
            }
            conversation.unreadCount+=1
            await conversation.save()

            const populateMessage=await Message.findById(message._id)
            .populate("sender","username profilepicture")
            .populate("receiver","username profilePicture")
        return response(res,200,populateMessage)

    } catch (error) {
        console.error(error)
        return response(res,500,"internal server error")
    }
}
//get all conversation
export const getConversation=async(req,res)=>{
    const userId=req.user.userId
    try {
        let conversation=await Conversation.find({
            participants:userId
        })
        .populate("parrticipants","username","profilePicture isOnline lastSeen")
        .populate({
            path:"lastMessage",
            populate:{
                path:"sender receiver isOnline lastSeen",
                select:"username profilePicture"
            }
        }).sort({updatedAt:-1})
        return response(res,200,"conversation get successfully",conversation)
    } catch (error) {
        console.error(error)
        return response(res,500,"internal server error")
    }
}
// the particular user info when we click of it
export const getUserMessage=async(req,res)=>{
    const {conversationId}=req.params
    const userId=req.user.userId

try {
    const conversation=await Conversation.findById(conversationId)
    if(!conversation){
        return response(res,404,"Conversation not found")
    }
    if(!conversation.participants.includes(userId)){
        return response(res,403,"Not authroized to view thsi conversation")
    }
    const message=await Message.find({conversation:conversationId})
     .populate("sender","username profilepicture",)
    .populate("receiver","username profilePicture")
     .sort("createdAt");
      await Message.updateMany({
          conversation:conversationId,
          receiver:userId,
        messageStatus:{$in: ["send","delivered"]}
     },{
        $set:{messageStatus:"read"}
     })
     conversation.unreadCount=0
     await conversation.save()
     return response(res,200, "message retrived",message)
} catch (error) {
      console.error(error)
        return response(res,500,"internal server error")
}
}
export const MarkAsRead=async(req,res)=>{
    const {messageId}=req.body
    const userId=req.user.userId
    try {
        //get relavent messages
        let message=await Message.find({
            _id:{$in:messageId},
            receiver:userId
        })
        await Message.updateMany({
            _id:{$in:messageId},
     receiver:userId
        },    {$set:{
                messageStatus:"read"
            }})
            return response(res,200,"message marked as read")
    } catch (error) {
         console.error(error)
        return response(res,500,"internal server error")
    }
}
export const delectMessage=async(req,res)=>{
    const {messageId}=req.params
    const userId=req.user.userId
    try {
        const message=await Message.findById(messageId)
        if(!message){
            return response(res,404,"message not found")
        }
        if(message.sender.toString()!==userId){
            return response(res,403 ,"Not authroized to delete this message")
        }
await message.deleteOne()
return response(res,200,"Message deleted successfully")

    } catch (error) {
        console.error(error)
        return response(res,500,"internal server error")
    }
}