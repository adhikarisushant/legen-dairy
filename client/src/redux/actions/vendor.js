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

// create new vendor
export const createVendor = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateVendorRequest",
    });

    const { data } = await axios.post(`${server}/vendor`, newForm, {
      withCredentials: true,
    });

    dispatch({
      type: "CreateVendorSuccess",
      payload: data.result[0],
    });
  } catch (error) {
    dispatch({
      type: "CreateVendorFail",
      payload: error.response.message,
    });
  }
};

// edit vendor
export const editVendor = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "EditVendorRequest",
    });

    const { data } = await axios.put(
      `${server}/vendor/edit/${newForm.id}`,
      newForm,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "EditVendorSuccess",
      payload: data.result[0],
    });
  } catch (error) {
    dispatch({
      type: "EditVendorFail",
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
