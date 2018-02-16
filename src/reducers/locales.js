import { combineReducers } from 'redux';
import values from 'lodash/values';

const byId = (state = {}, action) => {
  switch(action.type) {
    case 'FETCH_LOCALES_SUCCESS':
      return {
        ...state,
        ...action.response.entities.locales
      };
    case 'SELECT_LOCALE':
      const oldActiveLocaleID = values(state).find( locale => locale.active === true ).id;
      return {
        ...state,
        [oldActiveLocaleID]: {...state[oldActiveLocaleID], active: false },
        [action.id]: {...state[action.id], active: true },
      }
    default:
      return state;
  }
  return state;
};

const createLocalesList = () => {
  const ids =  (state = [], action) => {
    switch(action.type) {
      case 'FETCH_LOCALES_SUCCESS':
        return action.response.result
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case 'FETCH_LOCALES_REQUEST':
        return true;
      case 'FETCH_LOCALES_SUCCESS':
      case 'FETCH_LOCALES_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    switch (action.type) {
      case 'FETCH_LOCALES_FAILURE':
        return action.message;
      case 'FETCH_LOCALES_REQUEST':
      case 'FETCH_LOCALES_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    byId,
    ids,
    isFetching,
    errorMessage
  });
};

export default createLocalesList;

export const getIsFetching = (state) => state.locales.isFetching;
export const getErrorMessage = (state) => state.locales.errorMessage;
export const getLocales = (state) => state.locales.ids.map(id => state.locales.byId[id]);
export const getActiveLocaleID = (state) => {
  const activeLocale = values(state.locales.byId).find( locale => locale.active === true );
  return activeLocale ? activeLocale.id : 'default';
};