import express from "express";
import { createUser, loginUser,sendEmail } from "./user.controller.js";
 
const userRouter = express.Router();

//* /api/user/
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.post("/sendmail", sendEmail);

export default userRouter;
