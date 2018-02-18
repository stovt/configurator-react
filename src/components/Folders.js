import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/configurator';
import { getFolders } from '../reducers/configurator';

import TextField from './TextField';
import ProductImage from './ProductImage';

import Paper from 'material-ui/Paper';
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

export default connect(mapStateToProps, actions) (Folders);
