import express from "express";
import { check } from "express-validator";
import { registerUser } from "../controllers/usersController";

const userRouter = express.Router();

userRouter.post(
  "/user/register",
  [check("email").isEmail(), check("password").isLength({ min: 5 })],
  registerUser
);

export default userRouter;
