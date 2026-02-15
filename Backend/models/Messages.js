import mongoose from "mongoose";


const messageSchema=new mongoose.Schema({
    conversation:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"conversation",
        required:true
    },
    sender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    reciever:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    context:{
        type:String
    },
    imageorVedio:{
        type:String

    },
    contextType:{
        type:String,
        enums:["video","image","text"]
    },
    reactions:[
        {
            user:mongoose.Schema.Types.ObjectId,
            ref:"User",
            emoji:String
        }
    ],
    messageStatus:{
        type:String,
        default:"send"
    }
},{timestamps:true})
export const Message=mongoose.model("Message",messageSchema)