import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

export const customerReducer = createReducer(initialState, {
  LoadCustomersRequest: (state) => {
    state.loading = true;
  },
  LoadCustomersSuccess: (state, action) => {
    state.loading = false;
    state.customers = action.payload;
  },
  LoadCustomersFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },

  // create new Customer
  CreateCustomerRequest: (state) => {
    state.loading = true;
  },
  CreateCustomerSuccess: (state, action) => {
    state.loading = false;
    state.customers = [...state.customers, action.payload];
    state.success = true;
  },
  CreateCustomerFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },

  // edit Customer
  EditCustomerRequest: (state) => {
    state.loading = true;
  },
  EditCustomerSuccess: (state) => {
    state.loading = false;
    state.success = true;
  },
  EditCustomerFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },

  // create Customer Transaction
  customerTransactionCreateRequest: (state) => {
    state.loading = true;
  },
  customerTransactionCreateSuccess: (state, action) => {
    state.loading = false;
    state.customerTransaction = action.payload;
    state.success = true;
  },
  customerTransactionCreateFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.success = false;
  },
});
