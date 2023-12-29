import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { vendorReducer } from "./reducers/vendor";
import { productReducer } from "./reducers/product";

const Store = configureStore({
  reducer: {
    user: userReducer,
    vendor: vendorReducer,
    product: productReducer,
  },
});

export default Store;
