import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import ContentRemove from 'material-ui/svg-icons/content/delete-sweep';

class CreateConfiguratorStepChild extends React.PureComponent {
  constructor() {
    super();

    this.selectConfigurator = this.selectConfigurator.bind(this);
    this.removeConfigurator = this.removeConfigurator.bind(this);
  }

  selectConfigurator() {
    const { selectConfigurator, configuratorId } = this.props;
    selectConfigurator(configuratorId);
  }

  removeConfigurator() {
    const { removeConfigurator, configuratorId } = this.props;
    removeConfigurator(configuratorId);
  }

  render() {
    const { configuratorId } = this.props;

    return (
      <TableRow>
        <TableRowColumn style={{ paddingLeft: 0 }}>
          <Subheader
            style={{ paddingLeft: 0, cursor: 'pointer' }}
            onClick={this.selectConfigurator}
          >
            {configuratorId}
          </Subheader>
        </TableRowColumn>
        <TableRowColumn style={{ width: '100px', textAlign: 'center' }}>
          <ContentRemove
            style={{ cursor: 'pointer' }}
            onClick={this.removeConfigurator}
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default CreateConfiguratorStepChild;

CreateConfiguratorStepChild.propTypes = {
  configuratorId: PropTypes.string.isRequired,
  selectConfigurator: PropTypes.func.isRequired,
  removeConfigurator: PropTypes.func.isRequired
};
