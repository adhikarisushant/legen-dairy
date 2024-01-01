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
    const result = await db.query("SELECT * FROM customers");

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

export const createCustomerTransaction = CatchAsyncError(
  async (req, res, next) => {
    try {
      const {
        customer_id,
        quantity,
        product_id,
        price,
        amount,
        payment_status,
      } = req.body;

      const user = req.cookies.user_id;

      if (!user) {
        return next(
          new ErrorHandler("Something went wrong please retry again.", 400)
        );
      }

      const result = await db.query(
        "INSERT INTO customer_transactions (customer_id, quantity, product_id, price, amount, payment_status, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, NOW()) RETURNING *",
        [customer_id, quantity, product_id, price, amount, payment_status, user]
      );

      res.status(201).json({
        status: true,
        message: "Transaction successfully created",
        result: result.rows,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const editCustomerTransaction = CatchAsyncError(
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const {
        customer_id,
        quantity,
        product_id,
        price,
        amount,
        payment_status,
        status,
      } = req.body;

      const user = req.cookies.user_id;

      if (!user) {
        return next(
          new ErrorHandler("Something went wrong please retry again.", 400)
        );
      }

      const result = await db.query(
        "UPDATE customer_transactions SET customer_id= $1, quantity= $2, product_id= $3, price= $4, amount= $5, payment_status= $6, updated_by= $7, status= $8, updated_at= NOW() WHERE id= $9 RETURNING *",
        [
          customer_id,
          quantity,
          product_id,
          price,
          amount,
          payment_status,
          user,
          status,
          id,
        ]
      );

      res.status(201).json({
        status: true,
        message: "Transaction successfully edited",
        result: result.rows,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);

export const getAllCustomerTransactions = CatchAsyncError(
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await db.query(
        "SELECT * FROM customer_transactions WHERE customer_id= $1 AND status= true",
        [id]
      );

      res.status(201).json({
        status: true,
        message: "Transactions success",
        result: result.rows,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  }
);
