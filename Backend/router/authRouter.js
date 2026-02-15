import express from "express"
import { logout, sendOTP, updateProfile, verifyOtp,checkAuthicate} from "../controller/authConroller.js"
import authMiddleWare from "../middlewate/authMiddlewate.js"
import { multerMiddleware } from "../config/cloundinary.js"

const authRouter=express.Router()
authRouter.post("/send-otp",sendOTP)
authRouter.post("/verify-otp",verifyOtp)
//procter routed
authRouter.put("/update-profile",authMiddleWare,updateProfile)
authRouter.get("/logout",logout)
authRouter.get("/check_auth",authMiddleWare,checkAuthicate)
export default authRouter