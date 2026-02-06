import mongoose from "mongoose";

const dbConnection=async()=>{
    try {
        await mongoose.connect()
        console.log("db connection done successfully")
    } catch (error) {
        console.log("error at dbconnection: ",error)
        process.exit(1)
    }
}
export default dbConnection