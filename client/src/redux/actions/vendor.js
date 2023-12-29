import axios from "axios";
import { server } from "../../server";

// load vendors
export const loadVendors = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadVendorsRequest",
    });
    const { data } = await axios.get(`${server}/vendor/all`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadVendorsSuccess",
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: "LoadVendorsFail",
      payload: error.message,
    });
  }
};

// create vendor transaction
export const createVendorTransaction = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "vendorTransactionCreateRequest",
    });

    const { data } = await axios.post(`${server}/vendor/transaction`, newForm, {
      withCredentials: true,
    });

    dispatch({
      type: "vendorTransactionCreateSuccess",
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: "vendorTransactionCreateFail",
      payload: error.response.message,
    });
  }
};
