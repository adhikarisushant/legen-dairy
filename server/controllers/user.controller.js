import asyncHandler from "express-async-handler";
import db from "../db/index.js";

// @desc Auth user & get token
// @route POST /api/v1/users/auth
// @access Public

const authUser = asyncHandler(async (req, res) => {
  const { name, password } = req.body;
});

// @desc Register a new user
// @route POST /api/users
// @access Public

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
});

export { authUser, registerUser };
