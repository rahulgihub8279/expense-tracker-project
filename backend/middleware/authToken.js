import jwt from "jsonwebtoken";

const createToken = async (user) => {
  const payload = {
    id: user._id,
    fullname: user.fullname,
    email: user.email,
    role: user.role,
  };
  const token = await jwt.sign(payload, process.env.AUTH_SECRET, {
    expiresIn: "1d",
  });
  return token;
};
export default createToken;
