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
    receiver:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    content:{
        type:String
    },
    imageorVedio:{
        type:String

    },
    contentType:{
        type:String,
        enums:["video","image","text"]
    },
    reactions:[
        {
            type:mongoose.Schema.Types.ObjectId,
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