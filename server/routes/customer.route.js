import express from "express";
import {
  createCustomer,
  deleteCustomer,
  editCustomer,
  getAllCustomers,
  getSingleCustomer,
} from "../controllers/customer.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const customerRouter = express.Router();

customerRouter.post("/customer", isAuthenticated, createCustomer);

customerRouter.put("/customer/edit/:id", isAuthenticated, editCustomer);

customerRouter.delete("/customer/delete/:id", isAuthenticated, deleteCustomer);

customerRouter.get("/customer/single/:id", isAuthenticated, getSingleCustomer);

customerRouter.get("/customer/all", isAuthenticated, getAllCustomers);

export default customerRouter;
