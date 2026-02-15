import jwt from "jsonwebtoken"
import response from "../utils/responseHandeler.js"
import { env } from "../config/zodValidation.js"

const authMiddleWare=(req,res,next)=>{
    const authToken=req.cookies?.auth_token

    if(!authToken){
        return response(res,400,"authorization token is missing")

    }
    try {
        const decode=jwt.verify(authToken,env.JWT_TOKEN)
        req.user=decode
        console.log(req.user)
        next()
    } catch (error) {
        console.error(error)
        return response(res,400,"Invalid or expired token")
    }
}
export default authMiddleWare