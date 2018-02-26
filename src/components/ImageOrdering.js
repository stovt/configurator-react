import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import { getOrderProducts } from '../reducers/configurator';

import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import Avatar from 'material-ui/Avatar';

const ImageOrdering = ({ orderProducts, changeProductsOrder }) => (
  <Paper zDepth={1} style={{padding: 20}}>
    <List style={{position: 'relative'}}>
      {orderProducts.map((product, index) => {
        return (
          <ListItem
            key={index}
            primaryText={product.productName}
            leftAvatar={<Avatar src={product.realImage} />}
          >
            <FloatingActionButton 
              mini={true} 
              onClick={() => changeProductsOrder(product, orderProducts[index + 1])} 
              style={{
                cursor: 'pointer',
                float: 'right',
                position: 'absolute',
                right: '15px',
                top: '8px',
              }}
            >
              <ArrowDown />
            </FloatingActionButton>
            <FloatingActionButton 
              mini={true} 
              onClick={() => changeProductsOrder(product, orderProducts[index - 1])} 
              style={{
                cursor: 'pointer',
                float: 'right',
                position: 'absolute',
                right: '70px',
                top: '8px',
              }}
            >
              <ArrowUp />
            </FloatingActionButton>
          </ListItem>
        );
      })}
    </List>
  </Paper>
);

const mapStateToProps = (state) => ({
  orderProducts: getOrderProducts(state)
});

export default connect(mapStateToProps, actions) (ImageOrdering);

ImageOrdering.propTypes = {
  orderProducts: PropTypes.array.isRequired,
  changeProductsOrder: PropTypes.func.isRequired
};
