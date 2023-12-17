import express from "express";
import {
  createVendor,
  createVendorTransaction,
  deleteVendor,
  editVendor,
  editVendorTransaction,
  getAllVendorTransactions,
  getAllVendors,
  getSingleVendor,
} from "../controllers/vendor.controller.js";
import { isAuthenticated } from "../middleware/auth.js";

const vendorRouter = express.Router();

vendorRouter.post("/vendor", isAuthenticated, createVendor);
vendorRouter.put("/vendor/edit/:id", isAuthenticated, editVendor);
vendorRouter.get("/vendor/single/:id", isAuthenticated, getSingleVendor);
vendorRouter.get("/vendor/all", isAuthenticated, getAllVendors);
vendorRouter.put("/vendor/delete/:id", isAuthenticated, deleteVendor);
vendorRouter.post(
  "/vendor/transaction",
  isAuthenticated,
  createVendorTransaction
);
vendorRouter.put(
  "/vendor/transaction/:id",
  isAuthenticated,
  editVendorTransaction
);

vendorRouter.get(
  "/vendor/transaction/:id",
  isAuthenticated,
  getAllVendorTransactions
);

export default vendorRouter;
