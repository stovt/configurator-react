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

export const addProduct = (baseConfigID, productID, accessory = false) => (dispatch, getState) => 
  api.getProductByID(productID, getActiveLocaleID(getState())).then(
    response => {
      if (accessory) {
        dispatch({
          type: 'ADD_ACCESSORY_PRODUCT',
          product: response,
        });
      } else {
        dispatch({
          type: 'ADD_BASE_CONFIG_PRODUCT',
          baseConfigID,
          product: response,
        });
      }
    }
  );

export const removeProduct = (baseConfigID, productID, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'REMOVE_ACCESSORY_PRODUCT',
      productID,
    });
  } else {
    dispatch({
      type: 'REMOVE_BASE_CONFIG_PRODUCT',
      baseConfigID,
      productID,
    });
  }
};

export const changeProductTitle = (baseConfigID, productID, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_TITLE',
      productID,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_TITLE',
      baseConfigID,
      productID,
      text
    });
  }
};

export const changeProductShortTitle = (baseConfigID, productID, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_SHORT_TITLE',
      productID,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_SHORT_TITLE',
      baseConfigID,
      productID,
      text
    });
  }
};

export const changeProductDescription = (baseConfigID, productID, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_DESCRIPTION',
      productID,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_DESCRIPTION',
      baseConfigID,
      productID,
      text
    });
  }
};

export const refreshProduct = (baseConfigID, productID, accessory = false) => (dispatch, getState) => 
  api.getProductByID(productID, getActiveLocaleID(getState())).then(
    response => {
      if (accessory) {
        dispatch({
          type: 'REFRESH_ACCESSORY_PRODUCT',
          product: response
        });
      } else {
        dispatch({
          type: 'REFRESH_BASE_CONFIG_PRODUCT',
          baseConfigID,
          product: response
        });
      }
    }
  );

export const toggleVariationEnable = (baseConfigID, productID, variationID, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'TOGGLE_ACCESSORY_VARIATION_ENABLE',
      productID,
      variationID
    });
  } else {
    dispatch({
      type: 'TOGGLE_BASE_CONFIG_VARIATION_ENABLE',
      baseConfigID,
      productID,
      variationID
    });
  }  
};

export const toggleVariationDefault = (baseConfigID, productID, variationID, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'TOGGLE_ACCESSORY_VARIATION_DEFAULT',
      productID,
      variationID
    });
  } else {
    dispatch({
      type: 'TOGGLE_BASE_CONFIG_VARIATION_DEFAULT',
      baseConfigID,
      productID,
      variationID
    });
  }  
};

export const refreshAllAccessories = (accesories) => (dispatch, getState) => 
  accesories.forEach(accessory => {
    api.getProductByID(accessory.productID, getActiveLocaleID(getState())).then(
      response => {
        dispatch({
          type: 'REFRESH_ACCESSORY_PRODUCT',
          product: response
        });
      }
    );
  });
  
export const toggleAccessoryExternal = (productID) => ({
  type: 'TOGGLE_ACCESSORY_EXTERNAL',
  productID
});

export const upAccessory = (productID) => ({
  type: 'UP_ACCESSORY_PRODUCT',
  productID
});

export const downAccessory = (productID) => ({
  type: 'DOWN_ACCESSORY_PRODUCT',
  productID
});

export const togglePreselectedAccessory = (baseConfigID, accessoryID) => ({
  type: 'TOGGLE_ACCESSORY_PRESELECTED',
  baseConfigID,
  accessoryID
});

export const toggleRequireAccessory = (baseConfigID, accessoryID) => ({
  type: 'TOGGLE_ACCESSORY_REQUIRE',
  baseConfigID,
  accessoryID
});


export const selectReusableProduct = (id, productID, baseConfigID, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'SELECT_ACCESSORY_REUSABLE_PRODUCT',
      id,
      productID
    });
  } else {
    dispatch({
      type: 'SELECT_BASE_CONFIG_REUSABLE_PRODUCT',
      id,
      productID,
      baseConfigID
    });
  }  
};

export const selectRequiredAccessory = (id, productID) => ({
  type: 'SELECT_ACCESSORY_REQUIRED',
  id,
  productID
});


export const addImageVariation = (id, name, productID, variationID, baseConfigID, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'ADD_ACCESSORY_IMAGE_VARIATION',
      id,
      name,
      productID,
      variationID
    });
  } else {
    dispatch({
      type: 'ADD_BASE_CONFIG_IMAGE_VARIATION',
      id,
      name,
      productID,
      variationID,
      baseConfigID
    });
  }
};

export const removeImageVariation = (imageVariationID, productID, variationID, baseConfigID, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'REMOVE_ACCESSORY_IMAGE_VARIATION',
      imageVariationID,
      productID,
      variationID
    });
  } else {
    dispatch({
      type: 'REMOVE_BASE_CONFIG_IMAGE_VARIATION',
      imageVariationID,
      productID,
      variationID,
      baseConfigID
    });
  }
};