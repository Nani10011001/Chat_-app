import express from "express"
import { logout, sendOTP, updateProfile, verifyOtp,checkAuthicate, getAllUser} from "../controller/authConroller.js"
import authMiddleWare from "../middlewate/authMiddlewate.js"


const authRouter=express.Router()
authRouter.post("/send-otp",sendOTP)
authRouter.post("/verify-otp",verifyOtp)
//procter routed
authRouter.put("/update-profile",authMiddleWare,updateProfile)
authRouter.get("/logout",logout)
authRouter.get("/check_auth",authMiddleWare,checkAuthicate)
authRouter.get("/user",authMiddleWare,getAllUser)
export default authRouter