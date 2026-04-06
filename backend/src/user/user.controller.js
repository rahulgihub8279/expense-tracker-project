import UserModel from "./user.model.js";
import bcrypt from "bcrypt";
import createToken from "../../middleware/authToken.js";
import sendMail from "../../utils/mail.js";
import { otpTemplate } from "../../utils/otptemplate.js";
import { generateOTP } from "../../utils/generateotp.js";

export const createUser = async (req, res) => {
  try {
    const { fullname, email, mobile, password } = req.body;
    const existingMobile = await UserModel.findOne({ mobile });
    if (existingMobile) {
      return res.status(400).json({ message: "mobile no. already used" });
    }
    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "email already used" });
    }
    const hashPass = await bcrypt.hash(password.toString(), 10);
    const user = new UserModel({
      fullname,
      email,
      mobile,
      password: hashPass,
    });
    await user.save();
    res.json({ user: user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const sendEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = generateOTP();
    const isEmail = await UserModel.findOne({ email });
    if (isEmail) {
      return res.status(400).json({ message: "email already used" });
    }
    await sendMail(email, "OTP for expense-tracker app", otpTemplate(otp));
    res.json({
      message: "email sent successfully",
      OTP: otp,
      success: true,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "user not found" });
    }
    const hashpass = await bcrypt.compare(password, user.password);
    if (!hashpass) {
      return res.status(401).json({ message: "incorrect password" });
    }
    const token = await createToken(user);
    res.cookie("authToken", token, {
      maxAge: 86400000,
      domain: undefined, 
      smaeSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
      secure: process.env.ENVIRONMENT === "DEV" ? false : true,
      httpOnly: true,
      path: "/",
    }); 
    res.json({ message: "login successfully", role: user.role });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const verifyToken=async(req,res)=>{
  try{ 
    res.json("verification success")
  }catch(err){
    res.status(500).json({message:err.message})
  }
}