import express from "express";
import {
  getAllUsers,
  getUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);

userRouter.post("/login", loginUser);

userRouter.post("/logout", isAuthenticated, logoutUser);

userRouter.get("/all-users", isAuthenticated, getAllUsers);
userRouter.get("/load-user", isAuthenticated, getUser);

export default userRouter;
