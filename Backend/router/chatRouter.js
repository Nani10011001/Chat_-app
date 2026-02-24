import express from "express"
import { logout, sendOTP, updateProfile, verifyOtp,checkAuthicate, getAllUser} from "../controller/authConroller.js"
import authMiddleWare from "../middlewate/authMiddlewate.js"
import { delectMessage, getConversation, getUserMessage, MarkAsRead, sendMessage } from "../controller/chatController.js"
import { multerMiddleware } from "../config/cloundinary.js"

const chatRouter=express.Router()
chatRouter.post("/send-message",authMiddleWare,multerMiddleware,sendMessage)
chatRouter.get("/coversations",authMiddleWare,getConversation)
chatRouter.get("/conversations/:conversationId/message",authMiddleWare,getUserMessage)

chatRouter.put("/message/read",authMiddleWare,MarkAsRead)
chatRouter.delete("/message/:messageId",authMiddleWare,delectMessage)
//procter routed
export default chatRouter