import express from "express";
import {
  getAllUsers,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.get("/logout", isAuthenticated, logoutUser);

userRouter.get("/all-users", isAuthenticated, getAllUsers);

export default userRouter;
