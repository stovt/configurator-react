import { combineReducers } from 'redux';

const pageTitle = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.meta.pageTitle;
    case 'CHANGE_META_TITLE':
      return action.text;
    default:
      return state;
  }
};

const pageKeywords = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.meta.pageKeywords;
    case 'CHANGE_META_KEYWORDS':
      return action.text;
    default:
      return state;
  }
};

const pageDescription = (state = '', action) => {
  switch (action.type) {
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.meta.pageDescription;
    case 'CHANGE_META_DESCRIPTION':
      return action.text;
    default:
      return state;
  }
};

const pageImage = (state = false, action) => {
  switch (action.type) {
    case 'SELECT_CONFIGURATOR_SUCCESS':
      return action.configurator.meta.pageImage;
    case 'UPLOAD_META_PAGE_IMAGE':
      return action.image;
    default:
      return state;
  }
};

export default combineReducers({
  pageTitle,
  pageKeywords,
  pageDescription,
  pageImage
});

export const getMeta = state => state.configurators.active.meta;
