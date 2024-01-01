import db from "../db/index.js";
import { CatchAsyncError } from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utils/errorHandler.js";

export const createVendor = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, contact, address, cow_price, buff_price } = req.body;

    const isNameExist = await db.query(
      "SELECT name FROM vendors WHERE name = $1;",
      [name]
    );

    if (isNameExist?.rows.length > 0) {
      return next(
        new ErrorHandler(
          "Vendor name already exists, Please select a different name.",
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
      "INSERT INTO vendors (name, contact, address, created_by, cow_price, buff_price, created_at) VALUES ($1, $2, $3, $4, $5, $6, NOW()) RETURNING id, name, cow_price, buff_price, contact, address, status",
      [name, contact, address, user, cow_price, buff_price]
    );

    res.status(201).json({
      status: true,
      message: "Vendor successfully created",
      result: result.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const editVendor = CatchAsyncError(async (req, res, next) => {
  try {
    const { name, contact, address, status, cow_price, buff_price } = req.body;
    const id = req.params.id;

    const user = req.cookies.user_id;

    if (!user) {
      return next(
        new ErrorHandler("Something went wrong please retry login.", 400)
      );
    }

    const edit = await db.query(
      "UPDATE vendors SET name= $1, contact= $2, address= $3, status= $4, cow_price= $5, buff_price= $6, updated_by= $7, updated_at= NOW() WHERE id= $8 RETURNING *",
      [name, contact, address, status, cow_price, buff_price, user, id]
    );

    res.status(201).json({
      status: true,
      message: "Vendor updated successfully",
      result: edit.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getSingleVendor = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await db.query("SELECT * FROM vendors WHERE id= $1", [id]);

    res.status(201).json({
      status: true,
      message: "Success",
      result: result.rows,
    });
  } catch (error) {
    return next(new ErrorHandler(error.message, 500));
  }
});

export const getAllVendors = CatchAsyncError(async (req, res, next) => {
  try {
    const result = await db.query(
      "SELECT id, name, cow_price, buff_price, contact, address, status FROM vendors"
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

export const deleteVendor = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await db.query(
      "UPDATE vendors SET status= false WHERE id= $1",
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

export const createVendorTransaction = CatchAsyncError(
  async (req, res, next) => {
    try {
      const {
        vendor_id,
        quantity,
        product_type,
        price,
        amount,
        payment_status,
        lactometer,
      } = req.body;

      const user = req.cookies.user_id;

      if (!user) {
        return next(
          new ErrorHandler("Something went wrong please retry again.", 400)
        );
      }

      const result = await db.query(
        "INSERT INTO vendor_transactions (vendor_id, quantity, product_type, price, amount, payment_status, lactometer, created_by, created_at) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, NOW()) RETURNING *",
        [
          vendor_id,
          quantity,
          product_type,
          price,
          amount,
          payment_status,
          lactometer,
          user,
        ]
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

export const editVendorTransaction = CatchAsyncError(async (req, res, next) => {
  try {
    const id = req.params.id;

    const {
      vendor_id,
      quantity,
      product_type,
      price,
      amount,
      payment_status,
      lactometer,
      status,
    } = req.body;

    const user = req.cookies.user_id;

    if (!user) {
      return next(
        new ErrorHandler("Something went wrong please retry again.", 400)
      );
    }

    const result = await db.query(
      "UPDATE vendor_transactions SET vendor_id= $1, quantity= $2, product_type= $3, price= $4, amount= $5, payment_status= $6, lactometer= $7, updated_by= $8, status= $9, updated_at= NOW() WHERE id= $10 RETURNING *",
      [
        vendor_id,
        quantity,
        product_type,
        price,
        amount,
        payment_status,
        lactometer,
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
});

export const getAllVendorTransactions = CatchAsyncError(
  async (req, res, next) => {
    try {
      const id = req.params.id;

      const result = await db.query(
        "SELECT * FROM vendor_transactions WHERE vendor_id= $1 AND status= true",
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
