import { combineReducers } from 'redux';
import active from './configurator';

const createConfiguratorsList = () => {
  const byId = (state = {}, action) => {
    switch(action.type) {
      case 'FETCH_CONFIGURATORS_SUCCESS':
      case 'REMOVE_CONFIGURATOR_SUCCESS':
        return {
          ...state,
          ...action.response.entities.configurators
        };
      default:
        return state;
    }
  };

  const ids =  (state = [], action) => {
    switch(action.type) {
      case 'FETCH_CONFIGURATORS_SUCCESS':
      case 'REMOVE_CONFIGURATOR_SUCCESS':
        return action.response.result
      default:
        return state;
    }
  };

  const isFetching = (state = false, action) => {
    switch (action.type) {
      case 'FETCH_CONFIGURATORS_REQUEST':
      case 'SELECT_CONFIGURATOR_REQUEST':
      case 'REMOVE_CONFIGURATOR_REQUEST':
        return true;
      case 'FETCH_CONFIGURATORS_SUCCESS':
      case 'FETCH_CONFIGURATORS_FAILURE':
      case 'SELECT_CONFIGURATOR_SUCCESS':
      case 'SELECT_CONFIGURATOR_FAILURE':
      case 'REMOVE_CONFIGURATOR_SUCCESS':
      case 'REMOVE_CONFIGURATOR_FAILURE':
        return false;
      default:
        return state;
    }
  };

  const errorMessage = (state = null, action) => {
    switch (action.type) {
      case 'FETCH_CONFIGURATORS_FAILURE':
      case 'SELECT_CONFIGURATOR_FAILURE':
      case 'REMOVE_CONFIGURATOR_FAILURE':
        return action.message;
      case 'FETCH_CONFIGURATORS_REQUEST':
      case 'FETCH_CONFIGURATORS_SUCCESS':
      case 'SELECT_CONFIGURATOR_REQUEST':
      case 'SELECT_CONFIGURATOR_SUCCESS':
      case 'REMOVE_CONFIGURATOR_REQUEST':
      case 'REMOVE_CONFIGURATOR_SUCCESS':
        return null;
      default:
        return state;
    }
  };

  return combineReducers({
    byId,
    ids,
    active,
    isFetching,
    errorMessage
  });
};

export default createConfiguratorsList;

export const getIsFetching = (state) => state.configurators.isFetching;
export const getErrorMessage = (state) => state.configurators.errorMessage;
export const getConfiguratorsIds = (state) => state.configurators.ids;
export const getConfiguratorById = (state, id) => state.configurators.ids.find( c => c === id );