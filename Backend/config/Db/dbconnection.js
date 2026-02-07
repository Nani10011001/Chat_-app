import mongoose from "mongoose";
import { env } from "../zodValidation.js";
const dbConnection=async()=>{
    try {
        await mongoose.connect(env.MONG_URL,{dbName:"WhatsappClone"})
        console.log("db connection done successfully")
    } catch (error) {
        console.log("error at dbconnection: ",error)
        process.exit(1)
    }
}
export default dbConnection