import express from "express";
import { createUser, loginUser,logoutUser, sendEmail } from "./user.controller.js";
import { adminUserGuard } from "../../middleware/guardMiddleware.js";

const userRouter = express.Router();

//* /api/user/
userRouter.post("/signup", createUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);
userRouter.post("/sendmail", sendEmail); 

userRouter.get("/session", adminUserGuard, (req, res) => {
  return res.json(req.user);
});

export default userRouter;
