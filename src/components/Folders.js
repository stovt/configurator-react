import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as configuratorActions from '../actions/configurator';
import * as productActions from '../actions/products';
import { getFolders } from '../reducers/configurator';

import TextField from './TextField';
import ProductImage from './ProductImage';
import ProductAutocomplete from './ProductAutocomplete';
import Product from './Product';

import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import RaisedButton from 'material-ui/RaisedButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

const Folders = ({ 
  folders,
  changeBaseConfigID,
  changeBaseConfigTitle,
  changeBaseConfigSubtitle,
  changeBaseConfigDescription,
  removeBaseConfig,
  addBaseConfig
}) => (
  <div>          
    {folders.map((folder, key) => {
      return (
        <div key={key} style={{margin: '20px 0', position: 'relative'}}>
          <Paper zDepth={2} style={{margin: '20px 0', padding: '20px'}}>
            <div style={{display:'flex'}}>
              <div style={{float: 'left', width: '35%', display:'flex', margin: '5px 20px 5px 5px'}}>
               <ProductImage 
                image={folder.baseConfigImage} 
                configuratorID={folder.configuratorID} 
                type={'UPLOAD_BASE_CONFIG_IMAGE'}
                data={{baseConfigID: folder.uniqueID}}
              />
              </div>
              <div style={{float: 'left'}}>
                <TextField
                  hintText="Type ID"
                  floatingLabelText="Folder ID"
                  value={folder.baseConfigID}
                  sendValue={(value) => changeBaseConfigID(folder.uniqueID, value)}
                />
                <br />
                <TextField
                  hintText="Type title"
                  floatingLabelText="Folder Title"
                  value={folder.baseConfigTitle}
                  sendValue={(value) => changeBaseConfigTitle(folder.uniqueID, value)}
                />
                <br />
                <TextField
                  hintText="Type subtitle"
                  floatingLabelText="Folder Subtitle"
                  value={folder.baseConfigSubtitle}
                  sendValue={(value) => changeBaseConfigSubtitle(folder.uniqueID, value)}
                />
                <br />
                <TextField
                  hintText="Type description"
                  floatingLabelText="Folder Description"
                  value={folder.baseConfigDescription}
                  sendValue={(value) => changeBaseConfigDescription(folder.uniqueID, value)}
                  multiLine={true}
                />
                </div>
                <div style={{"clear": "both"}} />
              </div>
              <ProductAutocomplete 
                baseConfigID={folder.uniqueID}
              />

              {folder.productIDs.map((product, key) => {
                return (
                  <Product 
                    product={product}
                    key={product.productID} 
                    baseConfigID={folder.uniqueID}
                  />
                )
              })}
              <FloatingActionButton 
                secondary={true} 
                mini={true} 
                onClick={() => removeBaseConfig(folder.uniqueID)}
                style={{
                  cursor: 'pointer',
                  transform: 'rotate(45deg)',
                  float: 'right',
                  marginRight: '10px',
                  position: 'absolute',
                  right: '0px',
                  top: '10px'
                }}>
              <ContentAdd />
            </FloatingActionButton>
            <List>
              {folder.accessoryIDs.length > 0
                ? <Subheader>Preselected accessories</Subheader>
                : null
              }
              {folder.accessoryIDs.map((accessory,key) => {
                return (
                  <ListItem key={key} disabled={true} >
                    {accessory}
                  </ListItem>
                )
              })}
              {folder.requiredBaseConfigProductIDs.length > 0
                ? <Subheader>Required accessories</Subheader>
                : null
              }
              {folder.requiredBaseConfigProductIDs.map((accessory,key) => {
                return (
                  <ListItem key={key} disabled={true} >
                    {accessory}
                  </ListItem>
                )
              })}
            </List>
          </Paper>
        </div>
        )
    })}
    <RaisedButton label="Add folder" onClick={addBaseConfig} primary={true} />
  </div>
);

const mapStateToProps = (state) => ({
  folders: getFolders(state)
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({...{}, ...configuratorActions, ...productActions}, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps) (Folders);
