import db from "../db/index.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createProduct = CatchAsyncError(async (req, res, next) => {
  const { name, price } = req.body;

  const isNameExist = await db.query(
    "SELECT name FROM products WHERE name = $1;",
    [name]
  );

  if (isNameExist?.rows.length > 0) {
    return next(
      new ErrorHandler(
        "Product name already exists, Please select a different name.",
        400
      )
    );
  }

  const user = req.cookies.user_id;

  if (!user) {
    return next(
      new ErrorHandler("Something went wrong please retry login.", 400)
    );
  }

  const result = await db.query(
    "INSERT INTO products (name, price, created_by, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *",
    [name, price, user]
  );

  res.status(201).json({
    status: true,
    message: "Product successfully created",
    result: result.rows,
  });
});

export const editProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, price } = req.body;
    const id = req.params.id;

    const user = req.cookies.user_id;

    if (!user) {
      return next(
        new ErrorHandler("Something went wrong please retry login.", 400)
      );
    }

    const edit = await db.query(
      "UPDATE products SET name= $1, price= $2, updated_by= $3, updated_at= NOW() WHERE id = $4 RETURNING *",
      [name, price, user, id]
    );

    res.status(201).json({
      status: true,
      message: "Product updated successfully",
      result: edit.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getAllProducts = CatchAsyncError(async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT * FROM products WHERE status = true;"
    );

    res.status(201).json({
      status: true,
      message: "Success",
      result: result.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const deleteProduct = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await db.query(
      "UPDATE products SET status= false WHERE id= $1",
      [id]
    );

    res.status(201).json({
      status: true,
      message: "Success",
      result: result.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});
