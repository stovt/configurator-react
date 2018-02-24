import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/configurators';
import { getActiveConfigurator } from '../reducers/configurator';

import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

class SaveConfigurator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false
    };
  };

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

  saveConfigurator(configurator) {
    const { saveConfigurator } = this.props;
    saveConfigurator(configurator).then(
      response => {
        if (response) {
          this.setState({
            dialog: true
          });
        }
      }
    );
  }

  render() {
    const actions = [
      <FlatButton
        label="OK"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleCloseDialog()}
      />
    ];

    const { configurator } = this.props;
    return (
      <div style={{float: 'right', 'marginTop': '28px'}}>
        <RaisedButton 
          secondary={true} 
          label="Save Configurator"
          onClick={() => this.saveConfigurator(configurator)}
        />
        <Dialog
          title="Configurator saved!"
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={() => this.handleCloseDialog()}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  configurator: getActiveConfigurator(state)
});

export default connect(mapStateToProps, actions) (SaveConfigurator);