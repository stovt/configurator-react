import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ListItem from 'material-ui/List/ListItem';
import Checkbox from 'material-ui/Checkbox';
import { GridTile } from 'material-ui/GridList';
import * as actions from '../actions/products';
import ProductImage from './ProductImage';
import ImageVariations from './ImageVariations';

class ProductListItem extends React.PureComponent {
  constructor() {
    super();

    this.toggleVariationEnable = this.toggleVariationEnable.bind(this);
    this.toggleVariationDefault = this.toggleVariationDefault.bind(this);
  }

  toggleVariationEnable() {
    const {
      toggleVariationEnable, folder, product, variation, accessory
    } = this.props;
    toggleVariationEnable(folder, product, variation, accessory);
  }

  toggleVariationDefault() {
    const {
      toggleVariationDefault, folder, product, variation, accessory
    } = this.props;
    toggleVariationDefault(folder, product, variation, accessory);
  }

  render() {
    const {
      variation, accessory, folder, product
    } = this.props;
    return (
      <ListItem
        disabled={!variation.enabled}
        style={(!variation.enabled) ? { backgroundColor: 'rgba(0, 0, 0, 0.0980392)' } : null}
      >
        <div style={{ float: 'left', minWidth: '30%' }}>
          <Checkbox
            checked={variation.enabled}
            onCheck={this.toggleVariationEnable}
            label="Enable this product"
            disabled={!variation.isOnline}
          />
          <h4>{variation.productName}</h4>
          <h4>Online flag:
            <span style={{ fontWeight: 'normal' }}>
              {variation.isOnline ? 'YES' : 'NO'}
            </span>
          </h4>
          <Checkbox
            checked={variation.isDefaultVariation}
            onCheck={this.toggleVariationDefault}
            disabled={!variation.enabled}
            label="Default Variation"
          />
        </div>
        <div style={{ float: 'left' }}>
          <GridTile
            key={1}
            title="Configuration image"
            style={{
              width: '180px',
              height: '180px',
              display: 'inline-block',
              margin: '10px',
              position: 'relative'
            }}
          >
            <ProductImage
              image={variation.realImage}
              type={
                accessory
                  ? 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_REAL_IMAGE'
                  : 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_REAL_IMAGE'
              }
              data={{
                variation,
                folder,
                product
              }}
              disabled={!variation.enabled}
            />
          </GridTile>
          <GridTile
            key={2}
            title="Thumbnail image"
            style={{
              width: '180px',
              height: '180px',
              display: 'inline-block',
              margin: '10px',
              position: 'relative'
            }}
          >
            <ProductImage
              image={variation.thumbnailImage}
              type={
                accessory
                  ? 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_THUMB_IMAGE'
                  : 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_THUMB_IMAGE'
              }
              data={{
                variation,
                folder,
                product
              }}
              disabled={!variation.enabled}
            />
          </GridTile>
          <GridTile
            key={3}
            title="Swatch image"
            style={{
              width: '180px',
              height: '180px',
              display: 'inline-block',
              margin: '10px',
              position: 'relative'
            }}
          >
            <ProductImage
              image={variation.swatchImage}
              type={
                accessory
                  ? 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_SWATCH_IMAGE'
                  : 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_SWATCH_IMAGE'
              }
              data={{
                variation,
                folder,
                product
              }}
              disabled={!variation.enabled}
            />
          </GridTile>
        </div>
        <ImageVariations
          variation={variation}
          product={product}
          folder={folder}
          accessory={accessory}
        />
        <div style={{ clear: 'both' }} />
      </ListItem>
    );
  }
}

export default connect(null, actions)(ProductListItem);

ProductListItem.propTypes = {
  variation: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  folder: PropTypes.object,
  accessory: PropTypes.bool,
  toggleVariationEnable: PropTypes.func.isRequired,
  toggleVariationDefault: PropTypes.func.isRequired
};
ProductListItem.defaultProps = {
  accessory: false,
  folder: null
};
