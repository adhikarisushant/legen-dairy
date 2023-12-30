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
