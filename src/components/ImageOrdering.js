import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import { List, ListItem } from 'material-ui/List';
import ArrowDown from 'material-ui/svg-icons/navigation/arrow-downward';
import ArrowUp from 'material-ui/svg-icons/navigation/arrow-upward';
import Avatar from 'material-ui/Avatar';
import { getOrderProducts } from '../reducers/configurator';
import * as actions from '../actions/products';
import ImageOrderingChild from './ImageOrderingChild';

const ImageOrdering = ({ orderProducts, changeProductsOrder }) => (
  <Paper zDepth={1} style={{ padding: 20 }}>
    <List style={{ position: 'relative' }}>
      {orderProducts.map((product, index) => (
        <ListItem
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          primaryText={product.productName}
          leftAvatar={<Avatar src={product.realImage} />}
        >
          <ImageOrderingChild
            mini
            changeProductsOrder={changeProductsOrder}
            product1={product}
            product2={orderProducts[index + 1]}
            style={{
              cursor: 'pointer',
              float: 'right',
              position: 'absolute',
              right: '15px',
              top: '8px'
            }}
          >
            <ArrowDown />
          </ImageOrderingChild>
          <ImageOrderingChild
            mini
            changeProductsOrder={changeProductsOrder}
            product1={product}
            product2={orderProducts[index - 1]}
            style={{
              cursor: 'pointer',
              float: 'right',
              position: 'absolute',
              right: '70px',
              top: '8px'
            }}
          >
            <ArrowUp />
          </ImageOrderingChild>
        </ListItem>
      ))}
    </List>
  </Paper>
);

const mapStateToProps = state => ({
  orderProducts: getOrderProducts(state)
});

export default connect(mapStateToProps, actions)(ImageOrdering);

ImageOrdering.propTypes = {
  orderProducts: PropTypes.array.isRequired,
  changeProductsOrder: PropTypes.func.isRequired
};
