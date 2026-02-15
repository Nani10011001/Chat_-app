import { success } from "zod";
import { User } from "../models/User.js";
import otpGenerator from "../utils/otpGenerator.js";
import response from "../utils/responseHandeler.js";
import { sendotpEmail } from "../services/emailServices.js";
import { sendOtpPhoneNumber, twilioverifyOtp } from "../services/twilloservice.js";
import { jwtTokenGenerate } from "../utils/jwtTokenGenerate.js";
import { uploadFileToCloudinary } from "../config/cloundinary.js";

export const sendOTP = async (req, res) => {
  const { phoneNumber, phoneSuffix, email} = req.body;
  const otp = otpGenerator();
  const expiry = new Date(Date.now() + 5 * 60 * 1000);
  let user;
  try {
    if (email) {
      user = await User.findOne({ email });

      if (!user) {
        user = new User({ email });
      }
      user.emailOpt = otp;
      user.emailOptExpiry = expiry;
      await user.save();
      await sendotpEmail(email,otp)
      return response(res,200,"otp send tou your email",{email})
    }
    if(!phoneNumber || !phoneSuffix){
        return response(res,400,"phone number and phone suffix is needed")
    }
    const fullPhoneNumber=`${phoneSuffix}${phoneNumber}`
    user=await User.findOne({phoneNumber})
    if(!user){
      user= new User({phoneNumber,phoneSuffix})
    }
    await user.save()
    await sendOtpPhoneNumber(fullPhoneNumber)
    return response(res,200,"OTP sent sucessfully")

  } catch (error) {
    console.error(error)
    return response(res,500,"Internal server error")
  }
};
// verify otp
export const verifyOtp=async(req,res)=>{
  const { phoneNumber, phoneSuffix, email,otp} = req.body;
  try {
     let user
     if(email){
      user=await User.findOne({email})
     if(!user){
      return response(res,400,"user not found")
     } 
     const now= new Date()
     if(!user.emailOpt || String(user.emailOpt)!==String(otp) || now> new Date(user.emailOptExpiry)){
      return response(res,400,"invalid or espired otp")
     }
     user.isVerified=true
     user.emailOpt=null
     user.emailOptExpiry=null
     await user.save()
     }

      if(!phoneNumber || !phoneSuffix){
        return response(res,400,"phone number and phone suffix is needed")
    }
        const fullPhoneNumber=`${phoneSuffix}${phoneNumber}`
        user=await User.findOne({phoneNumber})
         if(!user){
      return response(res,400,"user not found")
     } 
    const result=await twilioverifyOtp(fullPhoneNumber,otp)
     if(result.status !=="approved"){
      return response(res,400,"Invalid otp")
     }
     user.isVerified=true
     await user.save()
     const token= jwtTokenGenerate(user._id)
     res.cookie("auth_token",token,{
      httpOnly:true,
      maxAge:7*24*60*60*1000
     })
     return response(res,200,"verification done sucessfully",{token,user})
  } catch (error) {
    console.error(error)
    return response(res,500,"internal error")
    
  }
}
export const updateProfile=async(req,res)=>{
const {username,agreed,about}=req.body;
const userId=req.user.userId
  try {
    const user = await User.findById(userId)
    const file=req.file
    if(file){
      const uploadProfile= await uploadFileToCloudinary(file)
      console.log(uploadProfile)
      user.profilePicture=uploadProfile?.secure_url
    }else if(req.body.profilePicture){
      user.profilePicture=req.body.profilePicture
    }
    if(username){
      user.username=username
      if(agreed) user.agreed=agreed
      if(about) user.about=about
      await user.save()
    }
   
    return response(res,200,"user profile updated successfully")
  } catch (error) {
    console.error(error)
    return response(res,500,"internal error")
  }
}
export const checkAuthicate=async(req,res)=>{
  const userId=req.user.userId
 try {
   if(!userId){
    return response(res,400,"unauthrozied ! please login before access our app")
  }
  const user=await User.findById(userId)
  if(!user){
    return response(res,200,"user is not found")

  }
  return response(res,200,"user retrived and allow to access our app")
 } catch (error) {
   console.error(error)
    return response(res,500,"internal error")
 }
}
export const logout=async(req,res)=>{
  try {
    res.clearCookie("auth_token")
    return response(res,200,"logout successfully")
  } catch (error) {
    console.error(error)
    return response(res,500,"internal server error")
  }
}