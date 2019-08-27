import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import List from 'material-ui/List/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import {
  getFolders,
  getFoldersProducts,
  getAccessories,
  getAllProducts
} from '../reducers/configurator';
import * as actions from '../actions/products';
import ProductImage from './ProductImage';
import TextField from './TextField';
import ProductListItem from './ProductListItem';
import AccessoriesTable from './AccessoriesTable';

class Product extends React.PureComponent {
  constructor() {
    super();

    this.refreshProduct = this.refreshProduct.bind(this);
    this.toggleAccessoryExternal = this.toggleAccessoryExternal.bind(this);
    this.changeProductTitle = this.changeProductTitle.bind(this);
    this.changeProductShortTitle = this.changeProductShortTitle.bind(this);
    this.changeProductDescription = this.changeProductDescription.bind(this);
    this.togglePreselectedAccessory = this.togglePreselectedAccessory.bind(this);
    this.toggleRequireAccessory = this.toggleRequireAccessory.bind(this);
    this.selectRequiredAccessory = this.selectRequiredAccessory.bind(this);
    this.selectReusableProduct = this.selectReusableProduct.bind(this);
    this.removeProduct = this.removeProduct.bind(this);
    this.downAccessory = this.downAccessory.bind(this);
    this.upAccessory = this.upAccessory.bind(this);
  }

  refreshProduct() {
    const {
      refreshProduct, folder, product, accessory
    } = this.props;
    refreshProduct(folder, product, product.productID, accessory);
  }

  toggleAccessoryExternal() {
    const { toggleAccessoryExternal, product } = this.props;
    toggleAccessoryExternal(product);
  }

  changeProductTitle(value) {
    const {
      changeProductTitle, folder, product, accessory
    } = this.props;
    changeProductTitle(folder, product, value, accessory);
  }

  changeProductShortTitle(value) {
    const {
      changeProductShortTitle, folder, product, accessory
    } = this.props;
    changeProductShortTitle(folder, product, value, accessory);
  }

  changeProductDescription(value) {
    const {
      changeProductDescription, folder, product, accessory
    } = this.props;
    changeProductDescription(folder, product, value, accessory);
  }

  togglePreselectedAccessory(folder, accessoryID) {
    this.props.togglePreselectedAccessory(folder, accessoryID);
  }

  toggleRequireAccessory(folder, accessoryID) {
    this.props.toggleRequireAccessory(folder, accessoryID);
  }

  selectRequiredAccessory(event, index, id) {
    const { selectRequiredAccessory, product } = this.props;
    selectRequiredAccessory(id, product);
  }

  selectReusableProduct(event, index, id) {
    const {
      selectReusableProduct, product, folder, accessory
    } = this.props;
    selectReusableProduct(id, product, folder, accessory);
  }

  removeProduct() {
    const {
      removeProduct, folder, product, accessory
    } = this.props;
    removeProduct(folder, product, accessory);
  }

  downAccessory() {
    const { downAccessory, product } = this.props;
    downAccessory(product);
  }

  upAccessory() {
    const { upAccessory, product } = this.props;
    upAccessory(product);
  }

  render() {
    const {
      product, folder, accessory,
      folders, accessories, allProducts
    } = this.props;

    return (
      <Paper
        zDepth={2}
        style={{ margin: '20px', position: 'relative' }}
      >
        <Card>
          <CardHeader
            avatar={product.realImage}
            actAsExpander
            showExpandableButton
            title={product.productName}
            subtitle={(accessory && product.isExternalAccessory) ? 'External accessory' : ''}
          />
          <CardText expandable style={{ overflow: 'hidden' }}>
            <div style={{
              ...{ float: 'left', width: '40%', marginRight: '10px' },
              ...(!product.realImage ? { width: '64px', height: '64px' } : {})
            }}
            >
              <ProductImage
                image={product.realImage}
                type={
                  accessory
                    ? 'UPLOAD_ACCESSORY_PRODUCT_IMAGE'
                    : 'UPLOAD_BASE_CONFIG_PRODUCT_IMAGE'
                }
                data={{ folder, product }}
              />
            </div>
            <div>
              <RaisedButton
                secondary
                label="Refresh Product"
                onClick={this.refreshProduct}
                style={{ display: 'inline-block', width: '50%' }}
              />
              {accessory && (
                <Checkbox
                  checked={product.isExternalAccessory}
                  onCheck={this.toggleAccessoryExternal}
                  label="External accessory"
                  style={{ display: 'inline-block', width: '50%', marginTop: '25px' }}
                />
              )}

              <TextField
                hintText="Type title"
                floatingLabelText="Product title"
                value={product.productName}
                sendValue={this.changeProductTitle}
              />
              <br />
              <TextField
                hintText="Type short title"
                floatingLabelText="Product short title"
                value={product.productShortName}
                sendValue={this.changeProductShortTitle}
              />
              <br />
              <TextField
                hintText="Type description"
                floatingLabelText="Product description"
                value={product.description}
                sendValue={this.changeProductDescription}
                multiLine
                style={{ width: '50%' }}
              />
              {accessory && (
                <div>
                  <AccessoriesTable
                    folders={folders}
                    accessoryID={product.productID}
                    togglePreselectedAccessory={this.togglePreselectedAccessory}
                    toggleRequireAccessory={this.toggleRequireAccessory}
                  />
                  <SelectField
                    floatingLabelText="Choose required accessory"
                    value={product.requiredAccessoryID || ''}
                    onChange={this.selectRequiredAccessory}
                  >
                    <MenuItem
                      value={false}
                      primaryText="NONE"
                    />
                    {accessories.map((acc) => (
                      <MenuItem
                        key={acc.productID}
                        value={acc.productID}
                        primaryText={acc.productName}
                      />
                    ))}
                  </SelectField>
                </div>
              )}
              <SelectField
                floatingLabelText="Product with reusable"
                value={product.reusePartsFromProductID || ''}
                onChange={this.selectReusableProduct}
              >
                <MenuItem
                  value={false}
                  primaryText="NONE"
                />
                {allProducts.map((p) => (
                  <MenuItem
                    key={p.productID}
                    value={p.productID}
                    primaryText={p.productName}
                  />
                ))}
              </SelectField>
            </div>
            <div style={{ clear: 'both' }} />
            <List>
              {product.variations.map((variation, key) => (
                <ProductListItem
                  // eslint-disable-next-line react/no-array-index-key
                  key={key}
                  folder={folder}
                  product={product}
                  variation={variation}
                  accessory={accessory}
                />
              ))}
            </List>
          </CardText>
        </Card>
        <FloatingActionButton
          secondary
          mini
          onClick={this.removeProduct}
          style={{
            cursor: 'pointer',
            transform: 'rotate(45deg)',
            float: 'right',
            marginRight: '65px',
            position: 'absolute',
            right: '0px',
            top: '15px'
          }}
        >
          <ContentAdd />
        </FloatingActionButton>
        {accessory && (
          <>
            <FloatingActionButton
              mini
              onClick={this.downAccessory}
              style={{
                cursor: 'pointer',
                float: 'right',
                marginRight: '116px',
                position: 'absolute',
                right: '0px',
                top: '15px'
              }}
            >
              <ArrowDown />
            </FloatingActionButton>
            <FloatingActionButton
              mini
              onClick={this.upAccessory}
              style={{
                cursor: 'pointer',
                float: 'right',
                marginRight: '168px',
                position: 'absolute',
                right: '0px',
                top: '15px'
              }}
            >
              <ArrowUp />
            </FloatingActionButton>
          </>
        )}
      </Paper>
    );
  }
}

const mapStateToProps = (state) => ({
  folders: getFolders(state),
  foldersProducts: getFoldersProducts(state),
  accessories: getAccessories(state),
  allProducts: getAllProducts(state)
});

export default connect(mapStateToProps, actions)(Product);

Product.propTypes = {
  folder: PropTypes.object,
  accessory: PropTypes.bool,
  product: PropTypes.object.isRequired,
  folders: PropTypes.array.isRequired,
  accessories: PropTypes.array.isRequired,
  allProducts: PropTypes.array.isRequired,
  refreshProduct: PropTypes.func.isRequired,
  changeProductTitle: PropTypes.func.isRequired,
  changeProductShortTitle: PropTypes.func.isRequired,
  changeProductDescription: PropTypes.func.isRequired,
  toggleAccessoryExternal: PropTypes.func.isRequired,
  togglePreselectedAccessory: PropTypes.func.isRequired,
  toggleRequireAccessory: PropTypes.func.isRequired,
  selectReusableProduct: PropTypes.func.isRequired,
  selectRequiredAccessory: PropTypes.func.isRequired,
  upAccessory: PropTypes.func.isRequired,
  downAccessory: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired
};
Product.defaultProps = {
  folder: null,
  accessory: false
};
