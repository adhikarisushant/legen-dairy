import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { vendorReducer } from "./reducers/vendor";

const Store = configureStore({
  reducer: {
    user: userReducer,
    vendor: vendorReducer,
  },
});

export default Store;
