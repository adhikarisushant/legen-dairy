import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  count: 0,
};

export const testReducer = createReducer(initialState, {
  incrementRequest: (state) => {
    state.loading = true;
  },
  incrementSuccess: (state, action) => {
    state.count += 1;
    state.loading = false;
  },
  incrementFail: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
