import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getActiveConfiguratorID } from '../reducers/configurator';
import Locales from './Locales';
import SaveConfigurator from './SaveConfigurator';

const StepHeader = ({ configuratorID }) => (
  <div>
    <Locales />
    {configuratorID && (
      <>
        <h3
          style={{
            fontWeight: 'normal',
            position: 'absolute',
            left: '50%',
            top: '26px',
            transform: 'translate(-50%, -50%)'
          }}
        >
          Editing <b>{configuratorID}</b>
        </h3>
        <SaveConfigurator />
      </>
    )}
  </div>
);

const mapStateToProps = state => ({
  configuratorID: getActiveConfiguratorID(state)
});

export default connect(mapStateToProps)(StepHeader);

StepHeader.propTypes = {
  configuratorID: PropTypes.string
};
StepHeader.defaultProps = {
  configuratorID: null
};
