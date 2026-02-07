import {safeParse, z} from "zod"

const envSchema=z.object({
    PORT:z.string().regex(/^\d+$/,"port should be number"),
    MONG_URL:z.string().min(1,"MONG_URL should be string")
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