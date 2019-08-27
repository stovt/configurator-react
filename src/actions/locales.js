import { normalize } from 'normalizr';
import * as schema from './schema';
import { getIsFetching } from '../reducers/locales';
import * as api from '../api';

export const fetchLocales = () => (dispatch, getState) => {
  if (getIsFetching(getState())) {
    return Promise.resolve();
  }

  dispatch({
    type: 'FETCH_LOCALES_REQUEST'
  });

  return api.fetchLocales().then(
    (response) => {
      dispatch({
        type: 'FETCH_LOCALES_SUCCESS',
        response: normalize(response, schema.arrayOfLocales)
      });
    },
    (error) => {
      dispatch({
        type: 'FETCH_LOCALES_FAILURE',
        message: error.message || 'Something went wrong.'
      });
    }
  );
};

export const selectLocale = (id) => (dispatch) => dispatch({
  type: 'SELECT_LOCALE',
  id
});
