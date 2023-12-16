import dotenv from "dotenv";
dotenv.config();
import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorMiddleware } from "./middleware/error.js";
import userRouter from "./routes/user.route.js";
import customerRouter from "./routes/customer.route.js";
import vendorRouter from "./routes/vendor.route.js";
import productRoute from "./routes/product.route.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api/v1", userRouter, customerRouter, vendorRouter, productRoute);

// testing api
app.get("/test", async (req, res, next) => {
  res.status(200).json({
    success: true,
    message: "API is working",
  });
});
// unknown api route
app.all("*", (req, res, next) => {
  const err = new Error(`Route ${req.originalUrl} not found`);
  err.statusCode = 404;
  next(err);
});

app.use(ErrorMiddleware);

app.listen(port, () => console.log(`Server is running on port ${port}`));
