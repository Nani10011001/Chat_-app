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
