import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import { getAllProducts } from '../reducers/configurator';
import * as actions from '../actions/products';
import ImageVariation from './ImageVariation';

class ImageVariations extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      dialog: false,
      errorDialog: false
    };

    this.handleOpenDialog = this.handleOpenDialog.bind(this);
    this.handleCloseDialog = this.handleCloseDialog.bind(this);
    this.handleOpenErrorDialog = this.handleOpenErrorDialog.bind(this);
    this.handleCloseErrorDialog = this.handleCloseErrorDialog.bind(this);
    this.addImageVariation = this.addImageVariation.bind(this);
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

  handleOpenErrorDialog() {
    this.setState({
      errorDialog: true
    });
  }

  handleCloseErrorDialog() {
    this.setState({
      errorDialog: false
    });
  }

  addImageVariation(event, index, id) {
    const {
      addImageVariation, product, variation, folder, accessory
    } = this.props;
    addImageVariation(id, event.target.innerText, product, variation, folder, accessory);
  }

  render() {
    const successActions = [
      <FlatButton
        label="Submit"
        primary
        keyboardFocused
        onClick={this.handleCloseDialog}
      />
    ];
    const errorActions = [
      <FlatButton
        label="Ok"
        primary
        onClick={this.handleCloseErrorDialog}
      />
    ];

    const {
      allProducts, variation, product, folder, accessory, removeImageVariation
    } = this.props;
    return (
      <div>
        <RaisedButton
          label="Open Image Variations Dialog"
          onClick={this.handleOpenDialog}
        />
        <Dialog
          title="Image Variations"
          actions={successActions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={this.handleCloseDialog}
          autoScrollBodyContent
        >
          <SelectField
            floatingLabelText="Product with reusable"
            value={false}
            onChange={this.addImageVariation}
          >
            {allProducts.map((p) => (
              <MenuItem
                key={p.productID}
                value={p.productID}
                primaryText={p.productName}
              />
            ))}
          </SelectField>
          <List>
            {variation.imageVariations && (
              <div>
                {variation.imageVariations.map((imageVariation, index) => (
                  <ImageVariation
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                    imageVariation={imageVariation}
                    accessory={accessory}
                    folder={folder}
                    product={product}
                    variation={variation}
                    removeImageVariation={removeImageVariation}
                  />
                ))}
              </div>
            )}
          </List>
        </Dialog>
        <Dialog
          actions={errorActions}
          modal={false}
          open={this.state.errorDialog}
          onRequestClose={this.handleCloseErrorDialog}
        >
          Product is already in a list
        </Dialog>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  allProducts: getAllProducts(state)
});

export default connect(mapStateToProps, actions)(ImageVariations);

ImageVariations.propTypes = {
  allProducts: PropTypes.array.isRequired,
  variation: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  folder: PropTypes.object,
  accessory: PropTypes.bool,
  addImageVariation: PropTypes.func.isRequired,
  removeImageVariation: PropTypes.func.isRequired
};
ImageVariations.defaultProps = {
  folder: null,
  accessory: false
};
