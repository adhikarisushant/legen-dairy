import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const productReducer = createReducer(initialState, {
  LoadProductsRequest: (state) => {
    state.loading = true;
  },
  LoadProductsSuccess: (state, action) => {
    state.loading = false;
    state.products = action.payload;
  },
  LoadProductsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
