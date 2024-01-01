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

// create new Product
export const createProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "CreateProductRequest",
    });

    const { data } = await axios.post(`${server}/product`, newForm, {
      withCredentials: true,
    });

    dispatch({
      type: "CreateProductSuccess",
      payload: data.result[0],
    });
  } catch (error) {
    dispatch({
      type: "CreateProductFail",
      payload: error.message,
    });
  }
};

// edit product
export const editProduct = (newForm) => async (dispatch) => {
  try {
    dispatch({
      type: "EditProductRequest",
    });

    const { data } = await axios.put(
      `${server}/product/edit/${newForm.id}`,
      newForm,
      { withCredentials: true }
    );

    dispatch({
      type: "EditProductSuccess",
    });
  } catch (error) {
    dispatch({
      type: "EditProductFail",
      payload: error.message,
    });
  }
};
