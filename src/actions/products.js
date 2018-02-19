import { getIsFetching } from '../reducers/products';
import * as api from '../api';
import { getActiveLocaleID } from '../reducers/locales';

export const fetchProducts = () => (dispatch, getState) => {
  if(getIsFetching(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_PRODUCTS_REQUEST'
  });

  return api.fetchProducts().then(
    response => {
      dispatch({
        type: 'FETCH_PRODUCTS_SUCCESS',
        response: response
      });
    },
    error => {
      dispatch({
        type: 'FETCH_PRODUCTS_FAILURE',
        message: error.message || 'Something went wrong.'
      });
    }
  );
};

export const addProduct = (id, type, baseConfigID = null) => (dispatch, getState) => {
  return api.getProductByID(id, getActiveLocaleID(getState())).then(
    response => {
      // type: ADD_BASE_CONFIG_PRODUCT or ADD_ACCESSORY_PRODUCT
      dispatch({
        type,
        product: response,
        baseConfigID
      });
    }
  );
};