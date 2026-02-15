import twilio from "twilio"
import {env} from "../config/zodValidation.js"

const accountSid=env.ACCOUNT_SID
const authToken=env.TWILLO_AUTH_TOKEN
const serviceSid=env.TWILLO_SERVICE_SID

 const client=twilio(accountSid,authToken)
//sending otp to the phone number
export const sendOtpPhoneNumber=async(phoneNumber)=>{
    try {
        console.log("sending otp is to this phoneNumeber",phoneNumber)
        if(!phoneNumber){
            throw new Error("phone Number is required")
        }
        const response= await client.verify.v2.services(serviceSid).verifications.create({
            to:phoneNumber,
            channel:"sms"
        })
        console.log("this my otp response",response)
        return response
    } catch (error) {
        console.error(error)
        throw new Error("failed to send otp")
    }
}

export const twilioverifyOtp=async(phoneNumber,otp)=>{
try{
   console.log("verify of otp details: ",otp)

        const response= await client.verify.v2.services(serviceSid).verificationChecks.create({
            to:phoneNumber,
            code:otp
        })

        console.log("this my otp response",response)
        return response
    } catch(error) {
        console.error(error)
        throw new Error("otp verification failed")
    }
}
