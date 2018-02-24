import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import { 
  getFolders, 
  getFoldersProducts, 
  getAccessories, 
  getAllProducts
} from '../reducers/configurator';

import Paper from 'material-ui/Paper';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import List from 'material-ui/List/List';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';

import ProductImage from './ProductImage';
import TextField from './TextField';
import ProductListItem from './ProductListItem';
import AccessoriesTable from './AccessoriesTable';

const Product = ({ 
  product, 
  folder, 
  accessory, 
  folders,
  foldersProducts,
  accessories,
  allProducts,
  refreshProduct, 
  changeProductTitle,
  changeProductShortTitle,
  changeProductDescription,
  toggleAccessoryExternal ,
  togglePreselectedAccessory,
  toggleRequireAccessory,
  selectReusableProduct,
  selectRequiredAccessory,
  upAccessory,
  downAccessory,
  removeProduct
}) => (
  <Paper 
    zDepth={2} 
    style={{margin: '20px', position: 'relative'}}
  >
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
            type={
              accessory 
              ? 'UPLOAD_ACCESSORY_PRODUCT_IMAGE' 
              : 'UPLOAD_BASE_CONFIG_PRODUCT_IMAGE'
            }
            data={{ folder: folder, product: product }}
          />
        </div>
        <div>
          <RaisedButton 
            secondary={true}
            label="Refresh Product"
            onClick={() => refreshProduct(folder, product, product.productID, accessory)}
            style={{ display: 'inline-block', width: '50%'}}
          />
          {accessory
            ? <Checkbox 
                checked={product.isExternalAccessory}
                onCheck={() => toggleAccessoryExternal(product)}
                label="External accessory"
                style={{ display: 'inline-block', width: '50%', marginTop: '25px'}}
              />
            : null
          }

          <TextField
            hintText="Type title"
            floatingLabelText="Product title"
            value={product.productName}
            sendValue={(value) => changeProductTitle(folder, product, value, accessory)}
          />
          <br />
          <TextField
            hintText="Type short title"
            floatingLabelText="Product short title"
            value={product.productShortName}
            sendValue={(value) => changeProductShortTitle(folder, product, value, accessory)}
          />
          <br />
          <TextField
            hintText="Type description"
            floatingLabelText="Product description"
            value={product.description}
            sendValue={(value) => changeProductDescription(folder, product, value, accessory)}
            multiLine={true}
            style={{width: '50%'}}
          />
          {accessory
            ? <div>
                <AccessoriesTable 
                  folders={folders}
                  accessoryID={product.productID}
                  togglePreselectedAccessory={(folder, accessoryID) => togglePreselectedAccessory(folder, accessoryID)}
                  toggleRequireAccessory={(folder, accessoryID) => toggleRequireAccessory(folder, accessoryID)}
                />
                <SelectField 
                  floatingLabelText="Choose required accessory" 
                  value={product.requiredAccessoryID || ''} 
                  onChange={(event, index, id) => selectRequiredAccessory(id, product)}
                >
                  <MenuItem 
                    value={false} 
                    primaryText={'NONE'}
                  />
                  {accessories.map(accessory => {
                    return(
                      <MenuItem 
                        key={accessory.productID} 
                        value={accessory.productID} 
                        primaryText={accessory.productName}
                      />
                    )
                  })}
                </SelectField>
              </div>
            : null
          }
          <SelectField 
            floatingLabelText="Product with reusable" 
            value={product.reusePartsFromProductID || ''} 
            onChange={(event, index, id) => selectReusableProduct(id, product, folder, accessory)}
          >
            <MenuItem 
              value={false} 
              primaryText={'NONE'}
            />
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
        </div>
        <div style={{"clear": "both"}} />
        <List>
          {product.variations.map((variation, key) => {
            return (
              <ProductListItem 
                key={key}
                folder={folder}
                product={product}
                variation={variation} 
                accessory={accessory}
              />
            )
          })}
        </List>
      </CardText>
    </Card>
    <FloatingActionButton 
      secondary={true} 
      mini={true} 
      onClick={() => removeProduct(folder, product, accessory)} 
      style={{
        cursor: 'pointer',
        transform: 'rotate(45deg)',
        float: 'right',
        marginRight: '65px',
        position: 'absolute',
        right: '0px',
        top: '15px',
      }}
    >  
      <ContentAdd />
    </FloatingActionButton>
    {accessory
      ? <FloatingActionButton 
          mini={true} 
          onClick={() => downAccessory(product)} 
          style={{
            cursor: 'pointer',
            float: 'right',
            marginRight: '116px',
            position: 'absolute',
            right: '0px',
            top: '15px',
          }}
        >
          <ArrowDown />
        </FloatingActionButton>
      : null
    }
    {accessory
      ? <FloatingActionButton 
          mini={true} 
          onClick={() => upAccessory(product)} 
          style={{
            cursor: 'pointer',
            float: 'right',
            marginRight: '168px',
            position: 'absolute',
            right: '0px',
            top: '15px',
          }}
        >
          <ArrowUp />
        </FloatingActionButton>
      : null
    }
  </Paper>
);

const mapStateToProps = (state) => ({
  folders: getFolders(state),
  foldersProducts: getFoldersProducts(state),
  accessories: getAccessories(state),
  allProducts: getAllProducts(state)
});

export default connect(mapStateToProps, actions) (Product);

ProductImage.defaultProps = {
  accessory: false
};