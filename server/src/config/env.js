import z from "zod";
import dotenv from "dotenv";

dotenv.config();



let envSchema = z.object({
    PORT: z.string().default("3000"),
    MONGO_URL: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    REFRESH_TOKEN_SECRET: z.string(),
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    ADMIN_EMAIL: z.string(),
    ADMIN_PASSWORD: z.string().min(6),
})

let parsedEnv = envSchema.safeParse(process.env);

if(!parsedEnv.success){
    console.error("check your envs:", parsedEnv.error.format());
    process.exit(1);
}

export default parsedEnv.data;