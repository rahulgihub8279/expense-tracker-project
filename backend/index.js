import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import cookieParser from "cookie-parser";
import userRouter from "./src/user/user.routes.js";
import transactionRouter from "./src/transaction/transaction.routes.js";
import morgan from "morgan";
import db_connect from "./config/connection.js";
import cors from "cors";

db_connect();
const port = process.env.PORT;

//* app level middleware
app.use(
  cors({
    origin: process.env.DOMAIN,
    credentials: true,
  }),
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//* route level middleware
app.use("/api/user", userRouter);
app.use("/api/transaction", transactionRouter);

app.listen(port, () => {
  console.log(`server is listening on ${port}`);
});
