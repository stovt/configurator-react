import React from 'react';
import PropTypes from 'prop-types';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const isChecked = (accessoryIDs, accessoryID) => {
  if (!accessoryIDs) return false;
  return accessoryIDs.indexOf(accessoryID) !== -1;
};

class AccessoriesTableToggle extends React.PureComponent {
  constructor() {
    super();

    this.togglePreselectedAccessory = this.togglePreselectedAccessory.bind(this);
    this.toggleRequireAccessory = this.toggleRequireAccessory.bind(this);
  }

  togglePreselectedAccessory() {
    const {
      togglePreselectedAccessory, folder, accessoryID
    } = this.props;
    togglePreselectedAccessory(folder, accessoryID);
  }

  toggleRequireAccessory() {
    const {
      toggleRequireAccessory, folder, accessoryID
    } = this.props;
    toggleRequireAccessory(folder, accessoryID);
  }

  render() {
    const { folder, accessoryID } = this.props;

    return (
      <TableRow key={folder.uniqueID}>
        <TableRowColumn>
          {folder.baseConfigTitle}
        </TableRowColumn>
        <TableRowColumn>
          <div style={{ overflow: 'hidden' }}>
            <Checkbox
              onCheck={this.togglePreselectedAccessory}
              checked={isChecked(folder.accessoryIDs, accessoryID)}
            />
          </div>
        </TableRowColumn>
        <TableRowColumn>
          <div style={{ overflow: 'hidden' }}>
            <Checkbox
              onCheck={this.toggleRequireAccessory}
              checked={isChecked(folder.requiredBaseConfigProductIDs, accessoryID)}
            />
          </div>
        </TableRowColumn>
      </TableRow>
    );
  }
}

export default AccessoriesTableToggle;

AccessoriesTableToggle.propTypes = {
  folder: PropTypes.object.isRequired,
  accessoryID: PropTypes.string.isRequired,
  togglePreselectedAccessory: PropTypes.func.isRequired,
  toggleRequireAccessory: PropTypes.func.isRequired
};
