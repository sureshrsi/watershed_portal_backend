import { Router } from "express";
import pkg from "sequelize";
import { BadRequestError } from "../middleware/index.js";
import { Register, Login } from "./usersService.js";
import { verifyToken } from "../security/Jwt.js";
const router = Router();
const { ValidationError } = pkg;
router.post("/v1/users/register", async (req, res, next) => {
  try {
    let saved = await Register(req.body);
    res.json(saved);
  } catch (err) {
    if (err instanceof ValidationError) {
      console.log(err.errors);
      next(new BadRequestError(err.message, err.errors));
    } else {
      console.log(err);
      next(err);
    }
  }
});
router.post("/v1/users/login", async (req, res, next) => {
  try {
    res.json(await Login(req.body.username, req.body.password));
  } catch (err) {
    next(err);
  }
});
router.get("/v1/users/userInfo", verifyToken, (req, res) => {
  res.json("🤑");
});
export default router;
