import "./config/dotenvConfig.js";
import express from "express";
import cors from "cors";
import { env } from "./config/zodValidation.js";
import dbConnection from "./config/Db/dbconnection.js";
const app = express();
app.use(cors());
app.use(express.json());

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
