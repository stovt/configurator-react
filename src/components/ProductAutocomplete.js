import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';
import * as actions from '../actions/products';
import { getProducts, getErrorMessage, getIsFetching } from '../reducers/products';
import { getFolderProductIDs, getAccessoryProductIDs } from '../reducers/configurator';
import { autoCompleteFilter } from '../helpers/MaterialUIHelper';
import FetchError from './FetchError';

class ProductAutocomplete extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      searchText: '',
      showSnackbar: false
    };

    this.fetchData = this.fetchData.bind(this);
    this.searchTextChanged = this.searchTextChanged.bind(this);
    this.resetSearchText = this.resetSearchText.bind(this);
    this.addProduct = this.addProduct.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchProducts, products } = this.props;
    if (!products.length) {
      fetchProducts();
    }
  }

  searchTextChanged(value) {
    this.setState({
      searchText: value
    });
  }

  resetSearchText() {
    this.setState({
      searchText: ''
    });
  }

  addProduct(chosenRequest) {
    const {
      addProduct, folderProductIDs, accessoryIDs, accessory, folder
    } = this.props;
    const { id: productID } = chosenRequest;

    if (accessory) {
      if (accessoryIDs.indexOf(productID) !== -1) {
        this.setState({
          showSnackbar: true
        });
        return;
      }
    } else if (folderProductIDs.indexOf(productID) !== -1) {
      this.setState({
        showSnackbar: true
      });
      return;
    }

    addProduct(folder, productID, accessory);
    this.setState({
      searchText: ''
    });
  }

  closeSnackbar() {
    this.setState({
      showSnackbar: false
    });
  }

  render() {
    const {
      products, isFetching, errorMessage
    } = this.props;
    if (errorMessage && !products.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={this.fetchData}
        />
      );
    }

    if (isFetching) {
      return (<CircularProgress />);
    }

    return (
      <div>
        <AutoComplete
          floatingLabelText="Product name or ID"
          hintText="Type name or ID"
          dataSource={products}
          dataSourceConfig={{ text: 'name', value: 'id' }}
          onUpdateInput={this.searchTextChanged}
          onNewRequest={this.addProduct}
          maxSearchResults={25}
          searchText={this.state.searchText}
          filter={autoCompleteFilter}
          onFocus={this.resetSearchText}
        />
        <Snackbar
          open={this.state.showSnackbar}
          message="Product is already in list"
          autoHideDuration={2000}
          onRequestClose={this.closeSnackbar}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, { folder }) => ({
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state),
  products: getProducts(state),
  folderProductIDs: folder ? getFolderProductIDs(state, folder) : [],
  accessoryIDs: getAccessoryProductIDs(state)
});

export default connect(mapStateToProps, actions)(ProductAutocomplete);


ProductAutocomplete.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  products: PropTypes.array.isRequired,
  folderProductIDs: PropTypes.array.isRequired,
  accessoryIDs: PropTypes.array.isRequired,
  folder: PropTypes.object,
  accessory: PropTypes.bool,
  fetchProducts: PropTypes.func.isRequired,
  addProduct: PropTypes.func.isRequired
};
ProductAutocomplete.defaultProps = {
  accessory: false,
  folder: null,
  errorMessage: null
};
