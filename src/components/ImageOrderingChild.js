import React from 'react';
import PropTypes from 'prop-types';
import FloatingActionButton from 'material-ui/FloatingActionButton';

class ImageOrderingChild extends React.PureComponent {
  constructor() {
    super();

    this.changeProductsOrder = this.changeProductsOrder.bind(this);
  }

  changeProductsOrder() {
    const { changeProductsOrder, product1, product2 } = this.props;
    changeProductsOrder(product1, product2);
  }

  render() {
    const { style } = this.props;

    return (
      <FloatingActionButton
        mini
        onClick={this.changeProductsOrder}
        style={style}
      />
    );
  }
}

export default ImageOrderingChild;

ImageOrderingChild.propTypes = {
  changeProductsOrder: PropTypes.func.isRequired,
  product1: PropTypes.object.isRequired,
  product2: PropTypes.object,
  style: PropTypes.object.isRequired
};
ImageOrderingChild.defaultProps = {
  product2: null
};
