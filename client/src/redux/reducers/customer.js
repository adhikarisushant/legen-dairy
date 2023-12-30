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
