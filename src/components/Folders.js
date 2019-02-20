import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import RaisedButton from 'material-ui/RaisedButton';
import * as configuratorActions from '../actions/configurator';
import * as productActions from '../actions/products';
import { getFolders } from '../reducers/configurator';
import Folder from './Folder';

const Folders = ({ folders, addBaseConfig, ...props }) => (
  <div>
    {folders.map((folder, key) => (
      // eslint-disable-next-line react/no-array-index-key
      <Folder {...props} folder={folder} key={key} />
    ))}
    <div style={{
      margin: '10px auto',
      textAlign: 'center'
    }}
    >
      <RaisedButton label="Add folder" onClick={addBaseConfig} primary />
    </div>
  </div>
);

const mapStateToProps = state => ({
  folders: getFolders(state)
});

const mapDispatchToProps = dispatch => bindActionCreators(
  { ...{}, ...configuratorActions, ...productActions }, dispatch
);

export default connect(mapStateToProps, mapDispatchToProps)(Folders);

Folders.propTypes = {
  folders: PropTypes.array.isRequired,
  addBaseConfig: PropTypes.func.isRequired
};
