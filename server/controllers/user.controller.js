import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import db from "../db/index.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";
import cookie from "cookie";

export const registerUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const isEmailExist = await db.query(
      "SELECT email FROM users WHERE email = $1;",
      [email]
    );

    if (isEmailExist?.rows.length > 0) {
      return next(new ErrorHandler("Email already exists", 400));
    }

    const isNameExist = await db.query(
      "SELECT name FROM users WHERE name = $1;",
      [name]
    );

    if (isNameExist?.rows.length > 0) {
      return next(new ErrorHandler("Name already exists", 400));
    }

    const passwordHashed = await bcrypt.hash(password, 10);

    // save user
    const user = await db.query(
      "INSERT INTO users (name, email, password) VALUES ($1, $2, $3);",
      [name, email, passwordHashed]
    );

    res.status(201).json({
      status: true,
      message: "User successfully registered!",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const loginUser = CatchAsyncError(async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHandler("Please enter email and password", 400));
    }

    const findUser = await db.query(
      "SELECT id, email, password, role from users WHERE email = $1",
      [email]
    );

    if (findUser?.rows.length < 1) {
      return next(new ErrorHandler("User not found, Please check the email"));
    }

    // if user email found, compare password with bcrypt
    if (findUser.rows) {
      // console.log(process.env.JWT_SECRET);
      const comparePassword = await bcrypt.compare(
        password,
        findUser.rows[0].password
      );

      // if password matches
      // generate token with the user's id and the secretKey in the env file

      if (comparePassword) {
        // generate token
        let token = jwt.sign(
          { id: findUser.rows[0].id },
          process.env.JWT_SECRET,
          {
            expiresIn: 1 * 24 * 60 * 60 * 1000,
          }
        );

        // generate cookie

        // Save the token, user ID, and user role in a secure cookie
        res.cookie("token", token, {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("user_id", findUser.rows[0].id.toString(), {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        res.cookie("user_role", findUser.rows[0].role, {
          httpOnly: true,
          maxAge: 1 * 24 * 60 * 60 * 1000,
        });

        // send user data
        return res.status(201).json({
          status: true,
          message: "Login Successful!",
          result: token,
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Password does not match.",
        });
      }
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// logout user
export const logoutUser = CatchAsyncError(async (req, res, next) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      maxAge: new Date(0),
    });

    res.cookie("user_id", "", {
      httpOnly: true,
      maxAge: new Date(0),
    });

    res.cookie("user_role", "", {
      httpOnly: true,
      maxAge: new Date(0),
    });

    res.status(201).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

// get all users
export const getAllUsers = CatchAsyncError(async (req, res, next) => {
  try {
    const getUsers = await db.query("select name, email, role from users;");

    res.status(201).json({
      status: true,
      results: getUsers.rows.length,
      data: {
        users: getUsers.rows,
      },
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});
