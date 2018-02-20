import { combineReducers } from 'redux';

const globalAttributes = (state = {
  'isDownloadAvailable': true, 
  'isWishlistAvailable': true,
  'title': null,
  'isOnline': true
}, action) => {
  switch(action.type) {
    case 'CREATE_CONFIGURATOR':
      return {
        'isDownloadAvailable': true, 
        'isWishlistAvailable': true,
        'title': null,
        'isOnline': true
      };
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.global
    case 'TOGGLE_CONFIGURATOR_DOWNLOAD_FLAG':
      return {...state, 'isDownloadAvailable': !state.isDownloadAvailable};
    case 'TOGGLE_CONFIGURATOR_WISHLIST_FLAG':
      return {...state, 'isWishlistAvailable': !state.isWishlistAvailable};
    case 'TOGGLE_CONFIGURATOR_ONLINE_FLAG':
      return {...state, 'isOnline': !state.isOnline};
    case 'CHANGE_CONFIGURATOR_TITLE':
      return {...state, 'title': action.text};
    default:
      return state;
  }
};

const configuratorID = (state = null, action) => {
  switch (action.type) {
    case 'CREATE_CONFIGURATOR':
      return action.id
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.configuratorID
    default:
      return state;
  }
};

const baseConfigs = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_CONFIGURATOR':
      return []
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.baseConfigs
    case 'CHANGE_BASE_CONFIG_ID': {
      let folder = getFolderByUniqueID(state, action.id);
      folder.baseConfigID = action.text;
      return [...state, ...folder];
    }
    case 'CHANGE_BASE_CONFIG_TITLE': {
      let folder = getFolderByUniqueID(state, action.id);
      folder.baseConfigTitle = action.text;
      return [...state, ...folder];
    }
    case 'CHANGE_BASE_CONFIG_SUBTITLE': {
      let folder = getFolderByUniqueID(state, action.id);
      folder.baseConfigSubtitle = action.text;
      return [...state, ...folder];
    }
    case 'CHANGE_BASE_CONFIG_DESCRIPTION': {
      let folder = getFolderByUniqueID(state, action.id);
      folder.baseConfigDescription = action.text;
      return [...state, ...folder];
    }
    case 'REMOVE_BASE_CONFIG': {
      let folder = getFolderByUniqueID(state, action.id);
      return [
        ...state.slice(0, state.indexOf(folder)), 
        ...state.slice(state.indexOf(folder) + 1)
      ];
    }
    case 'ADD_BASE_CONFIG': 
      return [...state, action.config];
    case 'UPLOAD_BASE_CONFIG_IMAGE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      folder.baseConfigImage = action.image;
      return [...state, ...folder];
    }
    case 'UPLOAD_BASE_CONFIG_PRODUCT_IMAGE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, realImage: action.image},
        ...folder.productIDs.slice(productIndex + 1)
      ];
      return [...state, ...folder];
    }
    case 'ADD_BASE_CONFIG_PRODUCT': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      folder.productIDs = [
        ...folder.productIDs, 
        action.product
      ];
      return [...state, ...folder];
    }
    case 'REMOVE_BASE_CONFIG_PRODUCT': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      folder.productIDs = [
        ...folder.productIDs.slice(0, folder.productIDs.indexOf(product)), 
        ...folder.productIDs.slice(folder.productIDs.indexOf(product) + 1)
      ];
      return [...state, ...folder];
    }
    case 'CHANGE_BASE_CONFIG_PRODUCT_TITLE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, productName: action.text},
        ...folder.productIDs.slice(productIndex + 1)
      ];
      return [...state, ...folder];
    }
    case 'CHANGE_BASE_CONFIG_PRODUCT_SHORT_TITLE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, productShortName: action.text},
        ...folder.productIDs.slice(productIndex + 1)
      ];
      return [...state, ...folder];
    }
    case 'CHANGE_BASE_CONFIG_PRODUCT_DESCRIPTION': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, description: action.text},
        ...folder.productIDs.slice(productIndex + 1)
      ];
      return [...state, ...folder];
    }
    case 'REFRESH_BASE_CONFIG_PRODUCT': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.product.productID);
      let productIndex = folder.productIDs.indexOf(product);
      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, ...action.product},
        ...folder.productIDs.slice(productIndex + 1)
      ];
      return [...state, ...folder];
    }
    case 'TOGGLE_BASE_CONFIG_VARIATION_ENABLE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, enabled: !variation.enabled},
        ...product.variations.slice(variationIndex + 1)
      ];

      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, ...action.product},
        ...folder.productIDs.slice(productIndex + 1)
      ];

      return [...state, ...folder];
    }
    case 'TOGGLE_BASE_CONFIG_VARIATION_DEFAULT': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = product.variations.map(v => {
        return { ...v, isDefaultVariation: false }
      });

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, isDefaultVariation: !variation.isDefaultVariation},
        ...product.variations.slice(variationIndex + 1)
      ];

      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, ...action.product},
        ...folder.productIDs.slice(productIndex + 1)
      ];

      return [...state, ...folder];
    }
    case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_REAL_IMAGE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, realImage: action.image},
        ...product.variations.slice(variationIndex + 1)
      ];

      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, ...action.product},
        ...folder.productIDs.slice(productIndex + 1)
      ];
      
      return [...state, ...folder];
    }
    case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_SWATCH_IMAGE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, swatchImage: action.image},
        ...product.variations.slice(variationIndex + 1)
      ];

      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, ...action.product},
        ...folder.productIDs.slice(productIndex + 1)
      ];
      
      return [...state, ...folder];
    }
    case 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_THUMB_IMAGE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      let product = getFolderProductByID(folder, action.productID);
      let productIndex = folder.productIDs.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, thumbnailImage: action.image},
        ...product.variations.slice(variationIndex + 1)
      ];

      folder.productIDs = [
        ...folder.productIDs.slice(0, productIndex), 
        {...product, ...action.product},
        ...folder.productIDs.slice(productIndex + 1)
      ];
      
      return [...state, ...folder];
    }
    default:
      return state;
  }
};

const accessories = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_CONFIGURATOR':
      return [];
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.accessories;
    case 'UPLOAD_ACCESSORY_PRODUCT_IMAGE': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      return [
        ...state.slice(0, productIndex), 
        {...product, realImage: action.image},
        ...state.slice(productIndex + 1)
      ];
    }
    case 'ADD_ACCESSORY_PRODUCT': {
      return [
        ...state, 
        action.product
      ];
    }
    case 'REMOVE_ACCESSORY_PRODUCT': {
      let product = getAccessoryProductByID(state, action.productID);
      return [
        ...state.slice(0, state.indexOf(product)), 
        ...state.slice(state.indexOf(product) + 1)
      ];
    }
    case 'CHANGE_ACCESSORY_PRODUCT_TITLE': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      return [
        ...state.slice(0, productIndex), 
        {...product, productName: action.text},
        ...state.slice(productIndex + 1)
      ];
    }
    case 'CHANGE_ACCESSORY_PRODUCT_SHORT_TITLE': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      return [
        ...state.slice(0, productIndex), 
        {...product, productShortName: action.text},
        ...state.slice(productIndex + 1)
      ];
    }
    case 'CHANGE_ACCESSORY_PRODUCT_DESCRIPTION': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      return [
        ...state.slice(0, productIndex), 
        {...product, description: action.text},
        ...state.slice(productIndex + 1)
      ];
    }
    case 'REFRESH_ACCESSORY_PRODUCT': {
      let product = getAccessoryProductByID(state, action.product.productID);
      let productIndex = state.indexOf(product);
      return [
        ...state.slice(0, productIndex), 
        {...product, ...action.product},
        ...state.slice(productIndex + 1)
      ];
    }
    case 'TOGGLE_ACCESSORY_VARIATION_ENABLE': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, enabled: !variation.enabled},
        ...product.variations.slice(variationIndex + 1)
      ];

      return [
        ...state.slice(0, productIndex), 
        {...product, ...action.product},
        ...state.slice(productIndex + 1)
      ];

    }
    case 'TOGGLE_ACCESSORY_EXTERNAL': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      return [
        ...state.slice(0, productIndex), 
        {...product, isExternalAccessory: !product.isExternalAccessory},
        ...state.slice(productIndex + 1)
      ];
    }
    case 'TOGGLE_ACCESSORY_VARIATION_DEFAULT': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = product.variations.map(v => {
        return { ...v, isDefaultVariation: false }
      });

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, isDefaultVariation: !variation.isDefaultVariation},
        ...product.variations.slice(variationIndex + 1)
      ];

      return [
        ...state.slice(0, productIndex), 
        {...product, ...action.product},
        ...state.slice(productIndex + 1)
      ];

    }
    case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_REAL_IMAGE': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, realImage: action.image},
        ...product.variations.slice(variationIndex + 1)
      ];

      return [
        ...state.slice(0, productIndex), 
        {...product, ...action.product},
        ...state.slice(productIndex + 1)
      ];
      
    }
    case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_SWATCH_IMAGE': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, swatchImage: action.image},
        ...product.variations.slice(variationIndex + 1)
      ];

      return [
        ...state.slice(0, productIndex), 
        {...product, ...action.product},
        ...state.slice(productIndex + 1)
      ];
      
    }
    case 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_THUMB_IMAGE': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      let variation = getVariationByID(product.variations, action.variationID);
      let variationIndex = product.variations.indexOf(variation);

      product.variations = [
        ...product.variations.slice(0, variationIndex), 
        {...variation, thumbnailImage: action.image},
        ...product.variations.slice(variationIndex + 1)
      ];

      return [
        ...state.slice(0, productIndex), 
        {...product, ...action.product},
        ...state.slice(productIndex + 1)
      ];
      
    }
    case 'UP_ACCESSORY_PRODUCT': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      let prevProduct = state[productIndex - 1];
      if (prevProduct) {
        return [
          ...state.slice(0, productIndex - 1), 
          product,
          prevProduct,
          ...state.slice(productIndex + 1)
        ];
      } else {
        return state;
      }
    }
    case 'DOWN_ACCESSORY_PRODUCT': {
      let product = getAccessoryProductByID(state, action.productID);
      let productIndex = state.indexOf(product);
      let nextProduct = state[productIndex + 1];
      if (nextProduct) {
        return [
          ...state.slice(0, productIndex), 
          nextProduct,
          product,
          ...state.slice(productIndex + 2)
        ];
      } else {
        return state;
      }
    }
    default:
      return state;
  }
};

export default combineReducers({
  global: globalAttributes,
  configuratorID,
  baseConfigs,
  accessories
});

export const getActiveConfiguratorID = (state) => state.configurators.active.configuratorID;
export const getDownloadAvailableFlag = (state) => state.configurators.active.global.isDownloadAvailable;
export const getWishlistAvailableFlag = (state) => state.configurators.active.global.isWishlistAvailable;
export const getConfiguratorOnlineFlag = (state) => state.configurators.active.global.isOnline;
export const getConfiguratorTitle = (state) => state.configurators.active.global.title;

export const getFolders = (state) => state.configurators.active.baseConfigs;
export const getFolderByUniqueID = (folders, id) => folders.find( f => f.uniqueID === id );
export const getFolderProductByID = (folder, id) => folder.productIDs.find( p => p.productID === id );
export const getFolderProductIDs = (state, folderID) => {
  const folders = getFolders(state);
  const folder = getFolderByUniqueID(folders, folderID);
  return folder.productIDs.map( p => p.productID );
};
export const getAccessories = (state) => state.configurators.active.accessories;
export const getAccessoryProductByID = (accessories, id) => accessories.find( p => p.productID === id );
export const getAccessoryProductIDs = (state) => state.configurators.active.accessories.map( p => p.productID );
export const getVariationByID = (variations, variationID) => variations.find( v => v.variationID === variationID );
export const getAllProductIDs = (state) => {
  let productIDs = [];
  state.configurators.active.baseConfigs.forEach(config => {
    productIDs = [...productIDs, ...config.productIDs.map( p => p.productID )];
  })
  productIDs = [...productIDs, ...state.configurators.active.accessories.map( p => p.productID )];

  return productIDs;
};