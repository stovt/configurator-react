import { combineReducers } from 'redux';

const ready =  (state = false, action) => {
  switch (action.type) {
    case 'SELECT_CONFIGURATOR_SUCCESS':
    case 'CREATE_CONFIGURATOR':
      return true;
    default:
      return state;
  }
};

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
      return [...state.slice(0, state.indexOf(folder)), ...state.slice(state.indexOf(folder) + 1)];
    }
    case 'ADD_BASE_CONFIG': 
      return [...state, action.config];
    case 'UPLOAD_BASE_CONFIG_IMAGE': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      folder.baseConfigImage = action.image;
      return [...state, ...folder];
    }
    case 'ADD_BASE_CONFIG_PRODUCT': {
      let folder = getFolderByUniqueID(state, action.baseConfigID);
      folder.productIDs = [...folder.productIDs, action.product];
      return [...state, ...folder];
    }
    default:
      return state;
  }
};

const accessories = (state = [], action) => {
  switch (action.type) {
    case 'CREATE_CONFIGURATOR':
      return []
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.accessories
    default:
      return state;
  }
};

export default combineReducers({
  ready,
  'global': globalAttributes,
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