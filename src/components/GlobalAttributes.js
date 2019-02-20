import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import * as actions from '../actions/configurator';
import {
  getDownloadAvailableFlag,
  getWishlistAvailableFlag,
  getConfiguratorOnlineFlag,
  getConfiguratorTitle
} from '../reducers/configurator';
import TextField from './TextField';

const GlobalAttributes = ({
  downloadAvailable,
  wishlistAvailable,
  online,
  title,
  toggleDownloadAvailableFlag,
  toggleWishlistAvailableFlag,
  toggleConfiguratorOnlineFlag,
  changeConfiguratorTitle
}) => (
  <Paper zDepth={1} style={{ padding: 20 }}>
    <h2>Global configurator params</h2>
    <Toggle
      label="Download available"
      labelPosition="right"
      toggled={downloadAvailable}
      onToggle={toggleDownloadAvailableFlag}
      style={{ marginBottom: 16 }}
    />
    <Toggle
      label="Wishlist available"
      labelPosition="right"
      toggled={wishlistAvailable}
      onToggle={toggleWishlistAvailableFlag}
      style={{ marginBottom: 16 }}
    />
    <Toggle
      label="Online for frontend and feed"
      labelPosition="right"
      toggled={online}
      onToggle={toggleConfiguratorOnlineFlag}
      style={{ marginBottom: 16 }}
    />
    <TextField
      hintText="Type title"
      floatingLabelText="Configurator title"
      value={title}
      sendValue={changeConfiguratorTitle}
    />
  </Paper>
);

const mapStateToProps = state => ({
  downloadAvailable: getDownloadAvailableFlag(state),
  wishlistAvailable: getWishlistAvailableFlag(state),
  online: getConfiguratorOnlineFlag(state),
  title: getConfiguratorTitle(state)
});

export default connect(mapStateToProps, actions)(GlobalAttributes);

GlobalAttributes.propTypes = {
  downloadAvailable: PropTypes.bool.isRequired,
  wishlistAvailable: PropTypes.bool.isRequired,
  online: PropTypes.bool.isRequired,
  title: PropTypes.string,
  toggleDownloadAvailableFlag: PropTypes.func.isRequired,
  toggleWishlistAvailableFlag: PropTypes.func.isRequired,
  toggleConfiguratorOnlineFlag: PropTypes.func.isRequired,
  changeConfiguratorTitle: PropTypes.func.isRequired
};
GlobalAttributes.defaultProps = {
  title: ''
};
