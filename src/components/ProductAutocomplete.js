import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import { getProducts, getErrorMessage, getIsFetching } from '../reducers/products';
import { getFolderProductIDs, getAccessoryProductIDs } from '../reducers/configurator';
import { autoCompleteFilter } from '../helpers/MaterialUIHelper';
import FetchError from './FetchError';

import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';
import Snackbar from 'material-ui/Snackbar';

class ProductAutocomplete extends Component {  

  constructor(props){
    super(props);
    
    this.state = {
      searchText: '',
      showSnackbar: false
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchProducts, products, isFetching } = this.props;
    if (!products.length) {
      fetchProducts();
    }
  }

  searchTextChanged(value) {
    this.setState({
      searchText: value
    });
  }

  resetSearchText(value) {
    this.setState({
      searchText: ''
    });
  }

  addProduct(folder, productID, accessory) {
    const { addProduct, folderProductIDs, accessoryIDs } = this.props;
    
    if (accessory) {
      if (accessoryIDs.indexOf(productID) !== -1) {
        this.setState({
          showSnackbar: true
        });
        return;
      }
    } else {
      if (folderProductIDs.indexOf(productID) !== -1) {
        this.setState({
          showSnackbar: true
        });
        return;
      }
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
    const { products, folder, accessory, isFetching, errorMessage } = this.props;
    if (errorMessage && !products.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

    if (isFetching) {      
      return (<CircularProgress />);
    }
    else {
      return ( 
        <div>   
          <AutoComplete
            floatingLabelText="Product name or ID"
            hintText="Type name or ID"
            dataSource={products}
            dataSourceConfig={{ text: 'name', value: 'id' }}
            onUpdateInput={(value) => this.searchTextChanged(value)}
            onNewRequest={(chosenRequest) => this.addProduct(folder, chosenRequest.id, accessory)}
            maxSearchResults={25}
            searchText={this.state.searchText}
            filter={autoCompleteFilter}
            onFocus={(value) => this.resetSearchText(value)}
          />
          <Snackbar
            open={this.state.showSnackbar}
            message="Product is already in list"
            autoHideDuration={2000}
            onRequestClose={() => this.closeSnackbar()}
          />
        </div>
      );
    }
  }
}

const mapStateToProps = (state, { folder }) => ({
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state),
  products: getProducts(state),
  folderProductIDs: folder ? getFolderProductIDs(state, folder) : [],
  accessoryIDs: getAccessoryProductIDs(state)
});

export default connect(mapStateToProps, actions) (ProductAutocomplete);

ProductAutocomplete.defaultProps = {
  accessory: false  
};