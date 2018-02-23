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

export const addProduct = (folder, productID, accessory = false) => (dispatch, getState) => 
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
          folder,
          product: response,
        });
      }
    }
  );

export const removeProduct = (folder, product, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'REMOVE_ACCESSORY_PRODUCT',
      product,
    });
  } else {
    dispatch({
      type: 'REMOVE_BASE_CONFIG_PRODUCT',
      folder,
      product,
    });
  }
};

export const changeProductTitle = (folder, product, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_TITLE',
      product,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_TITLE',
      folder,
      product,
      text
    });
  }
};

export const changeProductShortTitle = (folder, product, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_SHORT_TITLE',
      product,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_SHORT_TITLE',
      folder,
      product,
      text
    });
  }
};

export const changeProductDescription = (folder, product, text, accessory = false) => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'CHANGE_ACCESSORY_PRODUCT_DESCRIPTION',
      product,
      text
    });
  } else {
    dispatch({
      type: 'CHANGE_BASE_CONFIG_PRODUCT_DESCRIPTION',
      folder,
      product,
      text
    });
  }
};

export const refreshProduct = (folder, oldProduct, productID, accessory = false) => (dispatch, getState) => 
  api.getProductByID(productID, getActiveLocaleID(getState())).then(
    response => {
      if (accessory) {
        dispatch({
          type: 'REFRESH_ACCESSORY_PRODUCT',
          oldProduct,
          product: response
        });
      } else {
        dispatch({
          type: 'REFRESH_BASE_CONFIG_PRODUCT',
          folder,
          oldProduct,
          product: response
        });
      }
    }
  );

export const toggleVariationEnable = (folder, product, variation, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'TOGGLE_ACCESSORY_VARIATION_ENABLE',
      product,
      variation
    });
  } else {
    dispatch({
      type: 'TOGGLE_BASE_CONFIG_VARIATION_ENABLE',
      folder,
      product,
      variation
    });
  }  
};

export const toggleVariationDefault = (folder, product, variation, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'TOGGLE_ACCESSORY_VARIATION_DEFAULT',
      product,
      variation
    });
  } else {
    dispatch({
      type: 'TOGGLE_BASE_CONFIG_VARIATION_DEFAULT',
      product,
      variation,
      folder
    });
  }  
};

export const refreshAllAccessories = (accesories) => (dispatch, getState) => 
  accesories.forEach(accessory => {
    api.getProductByID(accessory.productID, getActiveLocaleID(getState())).then(
      response => {
        dispatch({
          type: 'REFRESH_ACCESSORY_PRODUCT',
          oldProduct: accessory,
          product: response
        });
      }
    );
  });
  
export const toggleAccessoryExternal = (product) => ({
  type: 'TOGGLE_ACCESSORY_EXTERNAL',
  product
});

export const upAccessory = (product) => ({
  type: 'UP_ACCESSORY_PRODUCT',
  product
});

export const downAccessory = (product) => ({
  type: 'DOWN_ACCESSORY_PRODUCT',
  product
});

export const togglePreselectedAccessory = (folder, accessoryID) => ({
  type: 'TOGGLE_ACCESSORY_PRESELECTED',
  folder,
  accessoryID
});

export const toggleRequireAccessory = (folder, accessoryID) => ({
  type: 'TOGGLE_ACCESSORY_REQUIRE',
  folder,
  accessoryID
});


export const selectReusableProduct = (id, product, folder, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'SELECT_ACCESSORY_REUSABLE_PRODUCT',
      id,
      product
    });
  } else {
    dispatch({
      type: 'SELECT_BASE_CONFIG_REUSABLE_PRODUCT',
      id,
      product,
      folder
    });
  }  
};

export const selectRequiredAccessory = (id, product) => ({
  type: 'SELECT_ACCESSORY_REQUIRED',
  id,
  product
});


export const addImageVariation = (id, name, product, variation, folder, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'ADD_ACCESSORY_IMAGE_VARIATION',
      id,
      name,
      product,
      variation
    });
  } else {
    dispatch({
      type: 'ADD_BASE_CONFIG_IMAGE_VARIATION',
      id,
      name,
      product,
      variation,
      folder
    });
  }
};

export const removeImageVariation = (imageVariation, product, variation, folder, accessory)  => (dispatch, getState) => {
  if (accessory) {
    dispatch({
      type: 'REMOVE_ACCESSORY_IMAGE_VARIATION',
      imageVariation,
      product,
      variation
    });
  } else {
    dispatch({
      type: 'REMOVE_BASE_CONFIG_IMAGE_VARIATION',
      imageVariation,
      product,
      variation,
      folder
    });
  }
};