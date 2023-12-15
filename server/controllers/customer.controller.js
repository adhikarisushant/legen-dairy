import db from "../db/index.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createCustomer = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, contact, address } = req.body;

    const isNameExist = await db.query(
      "SELECT name FROM customers WHERE name = $1;",
      [name]
    );

    if (isNameExist?.rows.length > 0) {
      return next(
        new ErrorHandler(
          "Customer name already exists, Please select a different name.",
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

    const customer = await db.query(
      "INSERT INTO customers (name, contact, address, created_by, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *",
      [name, contact, address, user]
    );

    res.status(201).json({
      status: true,
      message: "Customer successfully created",
      result: customer.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

export const editCustomer = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, contact, address, status } = req.body;

    const customerId = req.params.id;

    const user = req.cookies.user_id;

    if (!user) {
      return next(
        new ErrorHandler("Something went wrong please retry login.", 400)
      );
    }

    const edit = await db.query(
      "UPDATE customers SET name= $1, contact= $2, address= $3, status= $4, updated_by= $5, updated_at= NOW() WHERE id= $6 RETURNING *",
      [name, contact, address, status, user, customerId]
    );

    res.status(201).json({
      status: true,
      message: "Customer updated successfully",
      result: edit.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getSingleCustomer = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await db.query("SELECT * FROM customers WHERE id= $1", [id]);

    res.status(201).json({
      status: true,
      message: "Success",
      result: result.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getAllCustomers = CatchAsyncError(async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT * FROM customers WHERE status= true;"
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

export const deleteCustomer = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await db.query(
      "UPDATE customers SET status= false WHERE id= $1",
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
