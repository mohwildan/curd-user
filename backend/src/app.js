import express from "express";
import cors from "cors";
import log from "./utils/logger.js";
import dotEnv from "dotenv";
import connectToDb from "./utils/connectToDb.js";
import userRouter from "./routes/userRouter.js";
import productRouter from "./routes/productRouter.js";
import cookieParser from "cookie-parser";

dotEnv.config();
const app = express();

app.use(
  cors({
    allowedHeaders: [
      "Origin",
      "X-Requested-With",
      "Content-Type",
      "Accept",
      "X-Access-Token",
      "Authorization",
    ],
    credentials: true, // this allows to send back (to client) cookies
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "http://localhost:3000",
    preflightContinue: false,
  })
); // my domain which is allowed access
app.use(cookieParser());
app.use(express.json());
//api from model users
app.use(userRouter);
//api from model products
app.use(productRouter);

const port = process.env.PORT || 5000; // you port runing in localhost
app.listen(port, () => {
  log.info(`App started at http://localhost:${port}`);
  connectToDb();
});
