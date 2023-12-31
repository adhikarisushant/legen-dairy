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

  // create new vendor
  CreateVendorRequest: (state) => {
    state.loading = true;
  },
  CreateVendorSuccess: (state, action) => {
    state.loading = false;
    state.vendors = [...state.vendors, action.payload];
    state.success = true;
  },
  CreateVendorFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },

  // edit vendor
  EditVendorRequest: (state) => {
    state.loading = true;
  },
  EditVendorSuccess: (state) => {
    state.loading = false;
    state.success = true;
  },
  EditVendorFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
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
