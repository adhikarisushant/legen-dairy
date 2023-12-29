import axios from "axios";
import { server } from "../../server";

// load products
export const loadProducts = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadProductsRequest",
    });
    const { data } = await axios.get(`${server}/product/all`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadProductsSuccess",
      payload: data.result,
    });
  } catch (error) {
    dispatch({
      type: "LoadProductsFail",
      payload: error.message,
    });
  }
};
