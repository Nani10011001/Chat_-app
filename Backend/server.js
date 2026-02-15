import "./config/dotenvConfig.js";
import express from "express";
import cors from "cors";
import { env } from "./config/zodValidation.js";
import dbConnection from "./config/Db/dbconnection.js";
import authRouter from "./router/authRouter.js";
import cookieParser from "cookie-parser";
const app = express();
app.use(cors());
app.use(express.json());// parse the body
app.use(cookieParser())// parse token
app.use("/auth",authRouter)
const serverStart = async () => {
  try {
    app.listen(env.PORT, () =>
      console.log(`server running at http://localhost:${process.env.PORT}`),
    );
    await dbConnection();
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
serverStart();
