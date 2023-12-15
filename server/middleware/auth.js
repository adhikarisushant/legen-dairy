import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { CatchAsyncError } from "./catchAsyncErrors.js";

// authenticated user
export const isAuthenticated = CatchAsyncError(async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource!", 400));
  }

  const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET);

  if (!decoded) {
    return next(new ErrorHandler("access token is not valid", 400));
  }
  next();
});
