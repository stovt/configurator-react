import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import { getActiveConfiguratorID } from '../reducers/configurator';

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import List from 'material-ui/List/List';

import ProductImage from './ProductImage';
import TextField from './TextField';
import ProductListItem from './ProductListItem';

const Product = ({ 
  product, 
  baseConfigID, 
  accessory, 
  configuratorID, 
  refreshProduct, 
  changeProductTitle,
  changeProductShortTitle,
  changeProductDescription,
  toggleExternalAccessory 
}) => (
  <Card>
    <CardHeader 
     avatar={product.realImage} 
     actAsExpander={true} 
     showExpandableButton={true} 
     title={product.productName}
     subtitle={(accessory && product.isExternalAccessory) ? 'External accessory' : ''}
    />
    <CardText expandable={true} style={{'overflow': 'hidden'}}>
      <div style={{
        ...{float: 'left', width: '40%', marginRight: "10px"}, 
        ...(product.realImage == '' ? {width: "64px", height: "64px"} : {})
       }}>
        <ProductImage 
          image={product.realImage} 
          configuratorID={configuratorID} 
          type={'UPLOAD_BASE_CONFIG_PRODUCT_IMAGE'}
          data={{ baseConfigID: baseConfigID, productID: product.productID }}
        />
      </div>
      <div>
        <RaisedButton 
          secondary={true}
          label="Refresh Product"
          onClick={() => refreshProduct(baseConfigID, product.productID, accessory)}
          style={{ display: 'inline-block', width: '50%'}}
        />
        {accessory
          ? <Checkbox 
              checked={product.isExternalAccessory}
              onCheck={toggleExternalAccessory}
              label="External accessory"
              style={{ display: 'inline-block', width: '50%'}}/>
          : null
        }

        <TextField
          hintText="Type title"
          floatingLabelText="Product title"
          value={product.productName}
          sendValue={(value) => changeProductTitle(baseConfigID, product.productID, value, accessory)}
        />
        <br />
        <TextField
          hintText="Type short title"
          floatingLabelText="Product short title"
          value={product.productShortName}
          sendValue={(value) => changeProductShortTitle(baseConfigID, product.productID, value, accessory)}
        />
        <br />
        <TextField
          hintText="Type description"
          floatingLabelText="Product description"
          value={product.description}
          sendValue={(value) => changeProductDescription(baseConfigID, product.productID, value, accessory)}
          multiLine={true}
          style={{width: '50%'}}
        />
      </div>
      <div style={{"clear": "both"}} />
      <List>
        {product.variations.map((variation, key) => {
          return (
            <ProductListItem 
              key={key}
              baseConfigID={baseConfigID}
              productID={product.productID}
              variation={variation} 
            />
          )
        })}
      </List>
    </CardText>
  </Card>
);

const mapStateToProps = (state) => ({
  configuratorID: getActiveConfiguratorID(state)
});

export default connect(mapStateToProps, actions) (Product);

ProductImage.defaultProps = {
  accessory: false  
};