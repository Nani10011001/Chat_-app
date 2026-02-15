import {safeParse, z} from "zod"

const envSchema=z.object({
    PORT:z.string().regex(/^\d+$/,"---port--- should be number"),
    MONG_URL:z.string().min(1,"---MONG_URL--- should be string"),
    TWILLO_SERVICE_SID:z.string().min(1,"---TWILLO_SERVICE_SID--- should be string"),
    TWILLO_AUTH_TOKEN:z.string().min(1,"---twillo auth token--- should be string"),
    ACCOUNT_SID:z.string().min(1,"---ACCOUNT_SID-- should be string"),
    JWT_TOKEN:z.string().min(13,"---JWT_TOKEN--- its should be string")
})
const envparse=envSchema.safeParse(process.env)
if(!envparse){
    console.log("---ENV varible validation is failed")
    envSchema.error.issues.forEach(err => {
      console.log(`${err.path.join('.')}: `,err.message)
        
    });
    process.exit(1)
}
export const env=envparse.data