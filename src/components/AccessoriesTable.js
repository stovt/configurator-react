import React from 'react';
import PropTypes from 'prop-types';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow
} from 'material-ui/Table';
import AccessoriesTableToggle from './AccessoriesTableToggle';

const AccessoriesTable = ({ folders, accessoryID, ...props }) => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn
          colSpan="3"
          style={{
            textAlign: 'center', fontSize: '14px', fontWeight: 'bold', color: 'black'
          }}
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
    <TableBody displayRowCheckbox={false} showRowHover>
      {folders.map((folder, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <AccessoriesTableToggle {...props} folder={folder} accessoryID={accessoryID} key={index} />
      ))}
    </TableBody>
  </Table>
);

export default AccessoriesTable;

AccessoriesTable.propTypes = {
  folders: PropTypes.array.isRequired,
  accessoryID: PropTypes.string.isRequired
};
