import React from 'react';
import {Provider} from 'react-redux';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/:tab?' component={App} />
    </Router>
  </Provider>
);

Root.propTypes = {
    store: PropTypes.oneOfType( [
        PropTypes.func.isRequired,
        PropTypes.object.isRequired,
    ] ).isRequired
};

export default Root;