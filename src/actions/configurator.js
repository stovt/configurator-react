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

export const changeBaseConfigID = (folder, text) => ({
  type: 'CHANGE_BASE_CONFIG_ID',
  folder,
  text
});

export const changeBaseConfigTitle = (folder, text) => ({
  type: 'CHANGE_BASE_CONFIG_TITLE',
  folder,
  text
});

export const changeBaseConfigSubtitle = (folder, text) => ({
  type: 'CHANGE_BASE_CONFIG_SUBTITLE',
  folder,
  text
});

export const changeBaseConfigDescription = (folder, text) => ({
  type: 'CHANGE_BASE_CONFIG_DESCRIPTION',
  folder,
  text
});

export const removeBaseConfig = (folder) => ({
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

export const uploadImage = (configuratorId, formData, type, data) => (dispatch, getState) =>
  api.uploadImage(configuratorId, formData).then(
    response => {
      switch (type) {
        case 'UPLOAD_BASE_CONFIG_IMAGE':
          dispatch({
            type: type,
            folder: data.folder,
            image: response
          });
          break;
        case 'UPLOAD_BASE_CONFIG_PRODUCT_IMAGE':
          dispatch({
            type: type,
            folder: data.folder,
            product: data.product,
            image: response
          });
          break;
        case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_REAL_IMAGE':
        case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_SWATCH_IMAGE':
        case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_THUMB_IMAGE':
          dispatch({
            type: type,
            folder: data.folder,
            product: data.product,
            variation: data.variation,
            image: response
          });
          break;
        case 'UPLOAD_ACCESSORY_PRODUCT_IMAGE':
          dispatch({
            type: type,
            product: data.product,
            image: response
          });
          break;
        case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_REAL_IMAGE':
        case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_SWATCH_IMAGE':
        case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_THUMB_IMAGE':
          dispatch({
            type: type,
            product: data.product,
            variation: data.variation,
            image: response
          });
          break;
        case 'UPLOAD_BASE_CONFIG_IMAGE_VARIATION':
          dispatch({
            type: type,
            folder: data.folder,
            product: data.product,
            variation: data.variation,
            imageVariation: data.imageVariation,
            image: response
          });
          break;
        case 'UPLOAD_ACCESSORY_IMAGE_VARIATION':
          dispatch({
            type: type,
            product: data.product,
            variation: data.variation,
            imageVariation: data.imageVariation,
            image: response
          });
          break;
        default:
          return;
      }
    }
  );