import { v4 } from 'uuid';
import * as api from '../api';

export const toggleDownloadAvailableFlag = () => ({
  type: 'TOGGLE_CONFIGURATOR_DOWNLOAD_FLAG'
});

export const toggleWishlistAvailableFlag = () => ({
  type: 'TOGGLE_CONFIGURATOR_WISHLIST_FLAG'
});

export const toggleConfiguratorOnlineFlag = () => ({
  type: 'TOGGLE_CONFIGURATOR_ONLINE_FLAG'
});

export const changeConfiguratorTitle = (text) => ({
  type: 'CHANGE_CONFIGURATOR_TITLE',
  text
});

export const changeBaseConfigID = (id, text) => ({
  type: 'CHANGE_BASE_CONFIG_ID',
  id,
  text
});

export const changeBaseConfigTitle = (id, text) => ({
  type: 'CHANGE_BASE_CONFIG_TITLE',
  id,
  text
});

export const changeBaseConfigSubtitle = (id, text) => ({
  type: 'CHANGE_BASE_CONFIG_SUBTITLE',
  id,
  text
});

export const changeBaseConfigDescription = (id, text) => ({
  type: 'CHANGE_BASE_CONFIG_DESCRIPTION',
  id,
  text
});

export const removeBaseConfig = (id) => ({
  type: 'REMOVE_BASE_CONFIG',
  id
});

export const addBaseConfig = () => ({
  type: 'ADD_BASE_CONFIG',
  config : {
    'baseConfigID': v4(),
    'baseConfigImage': '',
    'baseConfigDescription': '',
    'baseConfigTitle': '',
    'baseConfigProductIDs': [],
    'baseConfigVariationIDs': [],
    'productIDs': [],
    'requiredBaseConfigProductIDs': [],
    'accessoryIDs': [],
    'uniqueID': v4()
  }
});

export const uploadImage = (configuratorId, formData, type, data) => (dispatch, getState) => {
  return api.uploadImage(configuratorId, formData).then(
    response => {
      switch (type) {
        case 'UPLOAD_BASE_CONFIG_IMAGE':
          dispatch({
            type: type,
            baseConfigID: data.baseConfigID,
            image: response
          });
          break;
        case 'UPLOAD_BASE_CONFIG_PRODUCT_IMAGE':
          dispatch({
            type: type,
            baseConfigID: data.baseConfigID,
            productID: data.productID,
            image: response
          });
          break;
        case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_REAL_IMAGE':
        case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_SWATCH_IMAGE':
        case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_THUMB_IMAGE':
          dispatch({
            type: type,
            baseConfigID: data.baseConfigID,
            productID: data.productID,
            variationID: data.variationID,
            image: response
          });
          break;
        case 'UPLOAD_ACCESSORY_PRODUCT_IMAGE':
          dispatch({
            type: type,
            productID: data.productID,
            image: response
          });
          break;
        case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_REAL_IMAGE':
        case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_SWATCH_IMAGE':
        case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_THUMB_IMAGE':
          dispatch({
            type: type,
            productID: data.productID,
            variationID: data.variationID,
            image: response
          });
          break;
        default:
          return;
      }
    }
  );
};