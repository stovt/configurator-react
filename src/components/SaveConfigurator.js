import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import { getActiveConfigurator } from '../reducers/configurator';
import * as actions from '../actions/configurators';

class SaveConfigurator extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.saveConfigurator = this.saveConfigurator.bind(this);
  }

  handleOpenDialog() {
    this.setState({
      dialog: true
    });
  }

  handleCloseDialog() {
    this.setState({
      dialog: false
    });
  }

  saveConfigurator() {
    const { configurator, saveConfigurator } = this.props;
    saveConfigurator(configurator).then(
      (response) => {
        if (response) {
          this.setState({
            dialog: true
          });
        }
      }
    );
  }

  render() {
    const sucessActions = [
      <FlatButton
        label="OK"
        primary
        keyboardFocused
        onClick={this.handleCloseDialog}
      />
    ];

    return (
      <div style={{ float: 'right', marginTop: '28px' }}>
        <RaisedButton
          secondary
          label="Save Configurator"
          onClick={this.saveConfigurator}
        />
        <Dialog
          title="Configurator saved!"
          actions={sucessActions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleCloseDialog}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  configurator: getActiveConfigurator(state)
});

export default connect(mapStateToProps, actions)(SaveConfigurator);

SaveConfigurator.propTypes = {
  configurator: PropTypes.object.isRequired,
  saveConfigurator: PropTypes.func.isRequired
};
