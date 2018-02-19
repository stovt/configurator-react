import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/products';
import { getProducts, getErrorMessage, getIsFetching } from '../reducers/products';
import { autoCompleteFilter } from '../helpers/MaterialUIHelper';
import FetchError from './FetchError';
import AutoComplete from 'material-ui/AutoComplete';
import CircularProgress from 'material-ui/CircularProgress';

class ProductAutocomplete extends Component {  

  constructor(props){
    super(props);
    
    this.state = {
      searchText: ''
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchProducts } = this.props;
    fetchProducts();
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

  render() {
    const { products, addProduct, type, baseConfigID, isFetching, errorMessage } = this.props;
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
        <AutoComplete
          floatingLabelText="Product name or ID"
          hintText="Type name or ID"
          dataSource={products}
          dataSourceConfig={{ text: 'name', value: 'id' }}
          onUpdateInput={(value) => this.searchTextChanged(value)}
          onNewRequest={(chosenRequest) => addProduct(chosenRequest.id, type, baseConfigID)}
          maxSearchResults={25}
          searchText={this.state.searchText}
          filter={autoCompleteFilter}
          onFocus={(value) => this.resetSearchText(value)}
        />
      );
    }
  }
}

const mapStateToProps = (state) => ({
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state),
  products: getProducts(state)
});

export default connect(mapStateToProps, actions) (ProductAutocomplete);