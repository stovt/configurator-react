import React from 'react';
import PropTypes from 'prop-types';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Checkbox from 'material-ui/Checkbox';

const AccessoriesTable = ( { 
  folders, 
  accessoryID,
  togglePreselectedAccessory,
  toggleRequireAccessory
} ) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn 
          colSpan="3" 
          style={{textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: 'black'}}
        >
          Accessories
        </TableHeaderColumn>
      </TableRow>
      <TableRow>
        <TableHeaderColumn>Folder</TableHeaderColumn>
        <TableHeaderColumn>Preselected</TableHeaderColumn>
        <TableHeaderColumn>Require</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false} showRowHover={true}>
      {folders.map(folder => {
        return (
          <TableRow key={folder.uniqueID}>
            <TableRowColumn>
              {folder.baseConfigTitle}
            </TableRowColumn>
            <TableRowColumn>
              <div style={{'overflow': 'hidden'}}>
                <Checkbox
                  onCheck={() => togglePreselectedAccessory(folder, accessoryID)}
                  checked={isChecked(folder.accessoryIDs, accessoryID)}
                />
              </div>
            </TableRowColumn>
            <TableRowColumn>
              <div style={{'overflow': 'hidden'}}>
                <Checkbox
                  onCheck={() => toggleRequireAccessory(folder, accessoryID)}
                  checked={isChecked(folder.requiredBaseConfigProductIDs, accessoryID)}
                />
              </div>
            </TableRowColumn>
          </TableRow>
        )
      })}
    </TableBody>
  </Table>

  
);

const isChecked = (accessoryIDs, accessoryID) => {
  if (!accessoryIDs) {
    return false;
  }
  return accessoryIDs.indexOf(accessoryID) !== -1 ? true : false;
};

export default AccessoriesTable;

AccessoriesTable.propTypes = {
  folders: PropTypes.array.isRequired,
  accessoryID: PropTypes.string.isRequired,
  togglePreselectedAccessory: PropTypes.func.isRequired,
  toggleRequireAccessory: PropTypes.func.isRequired
};