import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import TextField from './TextField';
import ProductImage from './ProductImage';
import ProductAutocomplete from './ProductAutocomplete';
import Product from './Product';

class Folder extends React.PureComponent {
  constructor() {
    super();

    this.changeBaseConfigID = this.changeBaseConfigID.bind(this);
    this.changeBaseConfigTitle = this.changeBaseConfigTitle.bind(this);
    this.changeBaseConfigSubtitle = this.changeBaseConfigSubtitle.bind(this);
    this.changeBaseConfigDescription = this.changeBaseConfigDescription.bind(this);
    this.removeBaseConfig = this.removeBaseConfig.bind(this);
  }

  changeBaseConfigID(value) {
    const { changeBaseConfigID, folder } = this.props;
    changeBaseConfigID(folder, value);
  }

  changeBaseConfigTitle(value) {
    const { changeBaseConfigTitle, folder } = this.props;
    changeBaseConfigTitle(folder, value);
  }

  changeBaseConfigSubtitle(value) {
    const { changeBaseConfigSubtitle, folder } = this.props;
    changeBaseConfigSubtitle(folder, value);
  }

  changeBaseConfigDescription(value) {
    const { changeBaseConfigDescription, folder } = this.props;
    changeBaseConfigDescription(folder, value);
  }

  removeBaseConfig() {
    const { removeBaseConfig, folder } = this.props;
    removeBaseConfig(folder);
  }

  render() {
    const { folder } = this.props;

    return (
      <div style={{ margin: '20px 0', position: 'relative' }}>
        <Paper zDepth={2} style={{ margin: '20px 0', padding: '20px' }}>
          <div style={{ display: 'flex' }}>
            <div style={{
              float: 'left', width: '35%', display: 'flex', margin: '5px 20px 5px 5px'
            }}
            >
              <ProductImage
                image={folder.baseConfigImage}
                type="UPLOAD_BASE_CONFIG_IMAGE"
                data={{ folder }}
              />
            </div>
            <div style={{ float: 'left' }}>
              <TextField
                hintText="Type ID"
                floatingLabelText="Folder ID"
                value={folder.baseConfigID.toString()}
                sendValue={this.changeBaseConfigID}
              />
              <br />
              <TextField
                hintText="Type title"
                floatingLabelText="Folder Title"
                value={folder.baseConfigTitle}
                sendValue={this.changeBaseConfigTitle}
              />
              <br />
              <TextField
                hintText="Type subtitle"
                floatingLabelText="Folder Subtitle"
                value={folder.baseConfigSubtitle}
                sendValue={this.changeBaseConfigSubtitle}
              />
              <br />
              <TextField
                hintText="Type description"
                floatingLabelText="Folder Description"
                value={folder.baseConfigDescription}
                sendValue={this.changeBaseConfigDescription}
                multiLine
              />
            </div>
            <div style={{ clear: 'both' }} />
          </div>
          <ProductAutocomplete
            folder={folder}
          />
          {folder.productIDs.map((product) => (
            <Product
              product={product}
              key={product.productID}
              folder={folder}
            />
          ))}
          <FloatingActionButton
            secondary
            mini
            onClick={this.removeBaseConfig}
            style={{
              cursor: 'pointer',
              transform: 'rotate(45deg)',
              float: 'right',
              marginRight: '10px',
              position: 'absolute',
              right: '0px',
              top: '10px'
            }}
          >
            <ContentAdd />
          </FloatingActionButton>
          <List>
            {!!folder.accessoryIDs.length && <Subheader>Preselected accessories</Subheader>}
            {folder.accessoryIDs.map((accessory, key) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={key} disabled>
                {accessory}
              </ListItem>
            ))}
            {!!folder.requiredBaseConfigProductIDs.length && (
              <Subheader>Required accessories</Subheader>
            )}
            {folder.requiredBaseConfigProductIDs.map((accessory, key) => (
              // eslint-disable-next-line react/no-array-index-key
              <ListItem key={key} disabled>
                {accessory}
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    );
  }
}

export default Folder;

Folder.propTypes = {
  folder: PropTypes.object.isRequired,
  changeBaseConfigID: PropTypes.func.isRequired,
  changeBaseConfigTitle: PropTypes.func.isRequired,
  changeBaseConfigSubtitle: PropTypes.func.isRequired,
  changeBaseConfigDescription: PropTypes.func.isRequired,
  removeBaseConfig: PropTypes.func.isRequired
};
