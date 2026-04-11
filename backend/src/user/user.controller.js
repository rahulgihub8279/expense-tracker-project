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
    if (!user.status) {
      return res.status(404).json({ message: "Not active member, contact admin" });
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
    res.json({
      message: "login successfully",
      username: user.fullname,
      role: user.role,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const logoutUser = async (req, res) => {
  try {
    res.cookie("authToken", null, {
      maxAge: 0,
      domain: undefined,
      smaeSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
      secure: process.env.ENVIRONMENT === "DEV" ? false : true,
      httpOnly: true,
      path: "/",
    });
    res.status(200).json({ message: "logout successfully" });
  } catch (err) {
    res.status(401).json({ message: err.message || "Logout Failed" });
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await UserModel.find().sort({
      createdAt: -1,
    });
    res.json({ data: allUsers });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { id } = req.params;
    const user = await UserModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );
    if (!user) {
      res.json.status(404).json({
        message: "user not found",
      });
    }
    res.json({
      message: "status updated successfully",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message || "Internal server error",
    });
  }
};
