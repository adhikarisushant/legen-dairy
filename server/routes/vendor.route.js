import express from "express";
import {
  createVendor,
  deleteVendor,
  editVendor,
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

export default vendorRouter;
