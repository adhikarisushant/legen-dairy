import express from "express";
import { isAuthenticated } from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
} from "../controllers/product.controller.js";

const productRoute = express.Router();

productRoute.post("/product", isAuthenticated, createProduct);

productRoute.put("/product/edit/:id", isAuthenticated, editProduct);

productRoute.get("/product/all", isAuthenticated, getAllProducts);

productRoute.put("/product/delete/:id", isAuthenticated, deleteProduct);

export default productRoute;
