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

  // create new Product
  CreateProductRequest: (state) => {
    state.loading = true;
  },
  CreateProductSuccess: (state, action) => {
    state.loading = false;
    state.products = [...state.products, action.payload];
    state.success = true;
  },
  CreateProductFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },

  // edit Product
  EditProductRequest: (state) => {
    state.loading = true;
  },
  EditProductSuccess: (state) => {
    state.loading = false;
    state.success = true;
  },
  EditProductFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },
});
