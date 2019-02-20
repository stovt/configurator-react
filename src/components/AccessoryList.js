import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Paper from 'material-ui/Paper';
import RaisedButton from 'material-ui/RaisedButton';
import * as actions from '../actions/products';
import { getAccessories } from '../reducers/configurator';
import ProductAutocomplete from './ProductAutocomplete';
import Product from './Product';

class AccessoryList extends React.PureComponent {
  constructor() {
    super();

    this.refreshAllAccessories = this.refreshAllAccessories.bind(this);
  }

  refreshAllAccessories() {
    const { refreshAllAccessories, accesories } = this.props;
    refreshAllAccessories(accesories);
  }

  render() {
    const { accesories } = this.props;

    return (
      <div>
        <Paper
          zDepth={2}
          style={{ margin: '20px', padding: '20px' }}
        >
          <ProductAutocomplete
            accessory
          />
          <br />
          {accesories.length > 1 && (
            <RaisedButton
              secondary
              label="Refresh all accesories"
              onClick={this.refreshAllAccessories}
            />
          )}
        </Paper>
        {accesories.map(accessory => (
          <Product
            product={accessory}
            key={accessory.productID}
            accessory
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  accesories: getAccessories(state)
});

export default connect(mapStateToProps, actions)(AccessoryList);

AccessoryList.propTypes = {
  accesories: PropTypes.array.isRequired,
  refreshAllAccessories: PropTypes.func.isRequired
};
