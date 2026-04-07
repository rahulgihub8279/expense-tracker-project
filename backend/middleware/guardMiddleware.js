import jwt from "jsonwebtoken";

export const verifyTokenGuard = async (req, res, next) => {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return res.status(400).send("Bad request");
  }
  const [type, token] = authorization.split(" ");
  if (type !== "Bearer") {
    return res.status(400).send("Bad request");
  }
  const payload = jwt.verify(token, process.env.FORGOT_TOKEN_SECRET);
  req.user = payload;
  next();
};

const invalid = async (res) => {
  res.cookie("authToken", null, {
    maxAge: 0,
    domain: undefined,
    smaeSite: process.env.ENVIRONMENT === "DEV" ? "lax" : "none",
    secure: process.env.ENVIRONMENT === "DEV" ? false : true,
    httpOnly: true,
    path: "/",
  });
  res.status(400).json({ message: "unauthorized" });
};

export const adminUserGuard = async (req, res, next) => {
  const { authToken } = req.cookies; 
  if (!authToken) {
    return invalid(res);
  } 
  const payload = jwt.verify(authToken, process.env.AUTH_SECRET);
  if (payload.role !== "user" && payload.role !== "admin") {
    return invalid(res);
  }
  req.user=payload;
  next();
};
