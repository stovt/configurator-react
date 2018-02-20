import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import { getActiveConfiguratorID } from '../reducers/configurator';

import ListItem from 'material-ui/List/ListItem';
import Checkbox from 'material-ui/Checkbox';
import {GridList, GridTile} from 'material-ui/GridList';
import ProductImage from './ProductImage';

const ProductListItem = ({ 
  variation, 
  productID, 
  baseConfigID, 
  accessory, 
  configuratorID,
  toggleVariationEnable,
  toggleVariationDefault
}) => (
  <ListItem 
    disabled={!variation.enabled} 
    style={
      (!variation.enabled) ? { backgroundColor: 'rgba(0, 0, 0, 0.0980392)' } : null}
    >
    <div style={{float: "left", minWidth: "30%"}}>
      <Checkbox 
        checked={variation.enabled}
        onCheck={() => toggleVariationEnable(baseConfigID, productID, variation.variationID, accessory)}
        label="Enable this product"
        disabled={!variation.isOnline}
      />
      <h4>{variation.productName}</h4>
      <h4>Online flag: 
        <span style={{"fontWeight": "normal"}}>
          {variation.isOnline ? "YES" : "NO"}
        </span>
      </h4>
      <Checkbox 
        checked={variation.isDefaultVariation}
        onCheck={() => toggleVariationDefault(baseConfigID, productID, variation.variationID, accessory)}
        disabled={!variation.enabled}
        label="Default Variation"
      />
    </div>
    <div style={{float: "left"}}>
      <GridTile
        key={1}
        title="Configuration image"
        style={{    
          width: "180px",
          height: "180px",
          display: 'inline-block',
          margin: '10px',
          position: 'relative'
        }}
      >
        <ProductImage 
          image={variation.realImage} 
          configuratorID={configuratorID} 
          type={
            accessory 
            ? 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_REAL_IMAGE' 
            : 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_REAL_IMAGE'
          }
          data={{ 
            variationID: variation.variationID,
            baseConfigID: baseConfigID, 
            productID: productID 
          }}
          disabled={!variation.enabled}
        />
      </GridTile>
      <GridTile
        key={2}
        title="Thumbnail image"
        style={{    
          width: "180px",
          height: "180px",
          display: 'inline-block',
          margin: '10px',
          position: 'relative'
        }}
      >
        <ProductImage 
          image={variation.thumbnailImage} 
          configuratorID={configuratorID} 
          type={
            accessory 
            ? 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_THUMB_IMAGE' 
            : 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_THUMB_IMAGE'
          }
          data={{ 
            variationID: variation.variationID,
            baseConfigID: baseConfigID, 
            productID: productID 
          }}
          disabled={!variation.enabled}
        />
      </GridTile>
      <GridTile
        key={3}
        title="Swatch image"
        style={{    
          width: "180px",
          height: "180px",
          display: 'inline-block',
          margin: '10px',
          position: 'relative'
        }}
      >
        <ProductImage 
          image={variation.swatchImage} 
          configuratorID={configuratorID} 
          type={
            accessory 
            ? 'UPLOAD_ACCESSORY_PRODUCT_VARIATION_SWATCH_IMAGE' 
            : 'UPLOAD_BASE_CONFIG_PRODUCT_VARIATION_SWATCH_IMAGE'
          }
          data={{ 
            variationID: variation.variationID,
            baseConfigID: baseConfigID, 
            productID: productID 
          }}
          disabled={!variation.enabled}
        />
      </GridTile>
    </div>
    <div style={{clear: "both"}}/>
  </ListItem>
);

const mapStateToProps = (state) => ({
  configuratorID: getActiveConfiguratorID(state)
});

export default connect(mapStateToProps, actions) (ProductListItem);