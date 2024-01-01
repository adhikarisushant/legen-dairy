import axios from "axios";
import { server } from "../../server";

// load customers
export const loadCustomers = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadCustomersRequest",
    });
    const { data } = await axios.get(`${server}/customer/all`, {
      withCredentials: true,
    });

    dispatch({
      type: "LoadCustomersSuccess",
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: "LoadCustomersFail",
      payload: error.message,
    });
  }
};

// create new customer
export const createCustomer = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateCustomerRequest",
    });

    const { data } = await axios.post(`${server}/customer`, newForm, {
      withCredentials: true,
    });

    dispatch({
      type: "CreateCustomerSuccess",
      payload: data.result[0],
    });
  } catch (error) {
    dispatch({
      type: "CreateCustomerFail",
      payload: error.message,
    });
  }
};

// edit customer
export const editCustomer = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "EditCustomerRequest",
    });

    const { data } = await axios.put(
      `${server}/customer/edit/${newForm.id}`,
      newForm,
      { withCredentials: true }
    );

    dispatch({
      type: "EditCustomerSuccess",
    });
  } catch (error) {
    dispatch({
      type: "EditCustomerFail",
      payload: error.message,
    });
  }
};

// create customer transaction
export const createCustomerTransaction = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "customerTransactionCreateRequest",
    });

    const { data } = await axios.post(
      `${server}/customer/transaction`,
      newForm,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "customerTransactionCreateSuccess",
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: "customerTransactionCreateFail",
      payload: error.message,
    });
  }
};
