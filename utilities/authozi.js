import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const secretKey = process.env.jwtPass;

const restrictTo = (roles) => {
  return (req, res, next) => {
    const token = req.cookies.authcookie;
    let user = null;
    if (!token)
      return res
        .status(401)
        .send({ message: "Access denied. No token provided." });
    try {
      const decoded = jwt.verify(token, secretKey);
      user = decoded;
      console.log("decoded : ", decoded);
    } catch (error) {
      res.status(400).send({ message: "Invalid token" });
    }
    console.log(user.user.role);

    if (!user.user || !user.user.role) {
      return res
        .status(401)
        .send({ message: "Access denied. No role provided." });
    }
    if (!roles.includes(user.user.role)) {
      return res
        .status(401)
        .send({ message: "Access denied. User is not authorized." });
    }
    next();
  };
};

export { restrictTo };
