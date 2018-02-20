import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import { getAccessories } from '../reducers/configurator';

import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';

import ProductAutocomplete from './ProductAutocomplete';
import Product from './Product';

const AccessoryList = ({ accesories, refreshAllAccessories }) => (
  <div>
    <Paper 
      zDepth={2} 
      style={{margin: '20px', padding: '20px'}}
    >
      <ProductAutocomplete 
        accessory={true}
      />
      <br/>
      {accesories.length > 1
        ? <RaisedButton 
            secondary={true} 
            label="Refresh all accesories" 
            onClick={() => refreshAllAccessories(accesories)} 
          />
        : null 
      }
    </Paper>
    {accesories.map((accessory, index) => {  
      return (
        <Product 
          product={accessory}
          key={accessory.productID} 
          accessory={true}
        />
      )
    })}
  </div>
);

const mapStateToProps = (state) => ({
  accesories: getAccessories(state)
});

export default connect(mapStateToProps, actions) (AccessoryList);