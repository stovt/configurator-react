import { normalize } from 'normalizr';
import * as schema from './schema';
import { getActiveLocaleID } from '../reducers/locales';
import { getIsFetching, getConfiguratorById } from '../reducers/configurators';
import { getStepsIds } from '../reducers/steps';
import * as api from '../api';

export const fetchConfiguratorsIds = () => (dispatch, getState) => {
  if(getIsFetching(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_CONFIGURATORS_REQUEST'
  });

  return api.fetchConfiguratorsIds().then(
    response => {
      dispatch({
        type: 'FETCH_CONFIGURATORS_SUCCESS',
        response: normalize(response, schema.arrayOfConfigurators)
      });
    },
    error => {
      dispatch({
        type: 'FETCH_CONFIGURATORS_FAILURE',
        message: error.message || 'Something went wrong.'
      });
    }
  );
};

export const selectConfigurator = (id) => (dispatch, getState) => {
  if(getIsFetching(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'SELECT_CONFIGURATOR_REQUEST'
  });

  return api.selectConfigurator(id, getActiveLocaleID(getState())).then(
    response => {
      dispatch({
        type: 'SELECT_CONFIGURATOR_SUCCESS',
        configurator: response
      });
      dispatch({
        type: 'NEXT_STEP',
        steps: getStepsIds(getState())
      });
    },
    error => {
      dispatch({
        type: 'SELECT_CONFIGURATOR_FAILURE',
        message: error.message || 'Something went wrong.'
      });
    }
  );
};

export const removeConfigurator = (id) => (dispatch, getState) => {
  if(getIsFetching(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'REMOVE_CONFIGURATOR_REQUEST'
  });

  return api.removeConfigurator(id).then(
    response => {
      dispatch({
        type: 'REMOVE_CONFIGURATOR_SUCCESS',
        response: normalize(response, schema.arrayOfConfigurators)
      });
    },
    error => {
      dispatch({
        type: 'REMOVE_CONFIGURATOR_FAILURE',
        message: error.message || 'Something went wrong.'
      });
    }
  );
};


export const createOrFindConfigurator = (id) => (dispatch, getState) => {
  if(getIsFetching(getState())) {
    return Promise.resolve();
  }

  if(getConfiguratorById(getState(), id)) {
    dispatch({
      type: 'SELECT_CONFIGURATOR_REQUEST'
    });

    return api.selectConfigurator(id, getActiveLocaleID(getState())).then(
      response => {
        dispatch({
          type: 'SELECT_CONFIGURATOR_SUCCESS',
          configurator: response
        });
        dispatch({
          type: 'NEXT_STEP',
          steps: getStepsIds(getState())
        });
      },
      error => {
        dispatch({
          type: 'SELECT_CONFIGURATOR_FAILURE',
          message: error.message || 'Something went wrong.'
        });
      }
    );
  } else {
    dispatch({
      type: 'CREATE_CONFIGURATOR',
      id: id
    });
  }

  dispatch({
    type: 'NEXT_STEP',
    steps: getStepsIds(getState())
  });
};