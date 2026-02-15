import jwt from "jsonwebtoken"
import { env } from "../config/zodValidation.js"

export const jwtTokenGenerate=(userId)=>{
return  jwt.sign({userId},env.JWT_TOKEN,{expiresIn:"7d"})

}