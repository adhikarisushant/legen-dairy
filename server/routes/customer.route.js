import express from "express";
import {
  createCustomer,
  createCustomerTransaction,
  deleteCustomer,
  editCustomer,
  editCustomerTransaction,
  getAllCustomerTransactions,
  getAllCustomers,
  getSingleCustomer,
} from "../controllers/customer.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const customerRouter = express.Router();

customerRouter.post("/customer", isAuthenticated, createCustomer);

customerRouter.put("/customer/edit/:id", isAuthenticated, editCustomer);

customerRouter.put("/customer/delete/:id", isAuthenticated, deleteCustomer);

customerRouter.get("/customer/single/:id", isAuthenticated, getSingleCustomer);

customerRouter.get("/customer/all", isAuthenticated, getAllCustomers);

customerRouter.post(
  "/customer/transaction",
  isAuthenticated,
  createCustomerTransaction
);
customerRouter.put(
  "/customer/transaction/:id",
  isAuthenticated,
  editCustomerTransaction
);

customerRouter.get(
  "/customer/transaction/:id",
  isAuthenticated,
  getAllCustomerTransactions
);

export default customerRouter;
