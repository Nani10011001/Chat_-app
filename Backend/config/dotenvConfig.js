import dotenv from "dotenv"
import path from "path"
import { fileURLToPath } from "url"
const filename=fileURLToPath(import.meta.url)
console.log("filename:",filename)
const dirname=path.dirname(filename)
console.log(dirname)

 dotenv.config({
    path:path.resolve(dirname,"../.env")
}) 
if(!process.env.PORT) console.log("it is --PORT-- undefined")
if(!process.env.MONG_URL) console.log("---MONG_URL--- is undefined")
if(!process.env.TWILLO_SERVICE_SID) console.log("---TWILLO_SERVICE_SID is undefined")
if(!process.env.TWILLO_AUTH_TOKEN) console.log("---TWILLO_AUTH_TOKEN undefined ")
if(!process.env.ACCOUNT_SID) console.log("---ACCOUNT_SID--- is undefined ")
if(!process.env.EMAIL_PASS) console.log("---EMAIL_PASS-- is undefined")
if(!process.env.EMAIL_USER) console.log("---EMAIL_USER--- is undefined")
if(!process.env.JWT_TOKEN) console.log("---JWT_TOKEN--- is undefined")