import { combineReducers } from 'redux';

const createProductsList = () => {
  const products = (state = [], action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_SUCCESS':
        return action.response;
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_REQUEST':
        return true;
      case 'FETCH_PRODUCTS_SUCCESS':
      case 'FETCH_PRODUCTS_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    switch (action.type) {
      case 'FETCH_PRODUCTS_FAILURE':
        return action.message;
      case 'FETCH_PRODUCTS_REQUEST':
      case 'FETCH_PRODUCTS_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    products,
    isFetching,
    errorMessage
  });
};

export default createProductsList;

export const getProducts = (state) => state.products.products;
export const getIsFetching = (state) => state.products.isFetching;
export const getErrorMessage = (state) => state.products.errorMessage;
