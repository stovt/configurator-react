import React from 'react';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <App />
  </Provider>
);

Root.propTypes = {
  store: PropTypes.oneOfType([
    PropTypes.func.isRequired,
    PropTypes.object.isRequired
  ]).isRequired
};

export default Root;
