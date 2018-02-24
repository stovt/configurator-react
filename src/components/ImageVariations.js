import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import { getAllProducts } from '../reducers/configurator';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';
import ListItem from 'material-ui/List/ListItem';
import {GridList, GridTile} from 'material-ui/GridList';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';

import ProductImage from './ProductImage';

class ImageVariations extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dialog: false,
      errorDialog: false
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

  render() {
    const actions = [
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={() => this.handleCloseDialog()}
      />,
    ];
    const errorActions = [
      <FlatButton
       label="Ok"
       primary={true}
       onClick={() => this.handleCloseErrorDialog()}
      />,
    ];

    const { 
      allProducts, 
      variation, 
      product, 
      folder, 
      accessory, 
      addImageVariation,
      removeImageVariation,
    } = this.props;
    return (
      <div>
        <RaisedButton 
          label="Open Image Variations Dialog" 
          onClick={() => this.handleOpenDialog()} 
        />
        <Dialog
          title="Image Variations"
          actions={actions}
          modal={false}
          open={this.state.dialog}
          onRequestClose={() => this.handleCloseDialog()}
          autoScrollBodyContent={true}
        >
          <SelectField 
            floatingLabelText="Product with reusable" 
            value={false} 
            onChange={(event, index, id) => addImageVariation(
                id, event.target.innerText, product, variation, folder, accessory
            )}
          >
            {allProducts.map(product => {
              return(
                <MenuItem 
                  key={product.productID} 
                  value={product.productID} 
                  primaryText={product.productName}
                />
              )
            })}
          </SelectField>
          <List>
            {variation.imageVariations
              ? <div>
                  {variation.imageVariations.map((imageVariation) => {
                    return (
                      <ListItem key={imageVariation.productID}>
                        <div style={{float: "left", minWidth: "30%"}} >
                          <GridTile
                            title="change image"
                            style={{    
                              width: "180px",
                              height: "180px",
                              display: 'inline-block',
                              margin: '10px',
                              position: 'relative'
                            }}
                          >
                            <ProductImage 
                              image={imageVariation.realImage}
                              type={
                                accessory 
                                ? 'UPLOAD_ACCESSORY_IMAGE_VARIATION' 
                                : 'UPLOAD_BASE_CONFIG_IMAGE_VARIATION'
                              }
                              data={{ 
                                folder: folder, 
                                product: product,  
                                variation: variation,
                                imageVariation: imageVariation
                              }}
                            />
                          </GridTile>
                        </div>
                        <div style={{float: "left"}}>
                          <h4>{imageVariation.productName}</h4>
                        </div>
                        <FloatingActionButton 
                          secondary={true} 
                          mini={true} 
                          onClick={() => removeImageVariation(
                            imageVariation, product, variation, folder, accessory
                          )} 
                          style={{
                            cursor: 'pointer',
                            transform: 'rotate(45deg)',
                            float: 'right',
                            marginRight: '25px',
                            position: 'absolute',
                            right: '0px',
                            top: '15px',
                          }}
                        >
                          <ContentAdd />
                        </FloatingActionButton>
                        <div style={{clear: "both"}} />
                      </ListItem>
                    )
                  })}
                </div>
              : null
            }
          </List>
        </Dialog>
        <Dialog
          actions={errorActions}
          modal={false}
          open={this.state.errorDialog}
          onRequestClose={() => handleCloseErrorDialog()}
        >
          Product is already in a list
        </Dialog>
      </div>
    );
  }
};

const mapStateToProps = (state) => ({
  allProducts: getAllProducts(state)
});

export default connect(mapStateToProps, actions) (ImageVariations);