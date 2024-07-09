import { default as jwt } from "jsonwebtoken";
import { UnauthorizedError } from "../middleware/index.js";

const issueToken = (user) => {
  let accessToken = jwt.sign(
    { username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  return { accessToken };
};

const verifyToken = (req, res, next) => {
  try {
    const accessToken = req.headers.authorization.replace("Bearer ", "");
    const decoded = jwt.verify(accessToken, process.env.JWT_SECRET);
    //console.log(decoded);
    next();
  } catch (err) {
    const unauthorized = new UnauthorizedError();
    res.status(unauthorized.statusCode).json(unauthorized);
  }
};
export { issueToken, verifyToken };
