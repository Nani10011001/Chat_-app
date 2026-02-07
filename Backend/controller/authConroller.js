import { success } from "zod";
import { User } from "../models/User.js";
import otpGenerator from "../utils/otpGenerator.js";
import { response } from "express";

const sendOTP = async (req, res) => {
  const { phoneNumber, phoneSuffix, email } = req.body;
  const otp = otpGenerator();
  const expiry = new Date(Data.now() + 5 * 60 * 1000);
  let user;
  try {
    if (email) {
      user = await User.findOne({ email });

      if (!user) {
        user = await User({ email });
      }
      user.emailOpt = otp;
      user.emailOptExpiry = expiry;
      await user.save();
      return response(res,200,"otp send tou your email",{email})
    }
    if(!phoneNumber || !phoneSuffix){
        return response(res,400,"phone number and phone suffix is needed")
    }
    const fullPhoneNumber=`${phoneSuffix}`
  } catch (error) {}
};
