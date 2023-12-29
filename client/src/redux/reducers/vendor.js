import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const vendorReducer = createReducer(initialState, {
  LoadVendorsRequest: (state) => {
    state.loading = true;
  },
  LoadVendorsSuccess: (state, action) => {
    state.loading = false;
    state.vendors = action.payload;
  },
  LoadVendorsFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // create Vendor Transaction
  vendorTransactionCreateRequest: (state) => {
    state.loading = true;
  },
  vendorTransactionCreateSuccess: (state, action) => {
    state.loading = false;
    state.vendorTransaction = action.payload;
    state.success = true;
  },
  vendorTransactionCreateFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },
});
