import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { vendorReducer } from "./reducers/vendor";
import { productReducer } from "./reducers/product";
import { customerReducer } from "./reducers/customer";

const Store = configureStore({
  reducer: {
    user: userReducer,
    vendor: vendorReducer,
    product: productReducer,
    customer: customerReducer,
  },
});

export default Store;
