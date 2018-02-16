import React , { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/locales';
import { getLocales, getErrorMessage, getIsFetching, getActiveLocaleID } from '../reducers/locales';
import FetchError from './FetchError';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';


class Locales extends Component {
  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchLocales } = this.props;
    fetchLocales();
  }

  render() {
    const { locales, isFetching, errorMessage, activeLocaleID, selectLocale } = this.props;
    if (isFetching && !locales.length) {
      return <div>Loading...</div>;
    }
    if (errorMessage && !locales.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

    return (
      <SelectField 
        value={activeLocaleID} 
        onChange={(event, index, id) => selectLocale(id)}
        floatingLabelText="Locales:"
        autoWidth={true}
      >
        {locales.map((locale) =>
          <MenuItem value={locale.id} key={locale.id} primaryText={locale.value} />
        )}
      </SelectField>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    isFetching: getIsFetching(state),
    errorMessage: getErrorMessage(state),
    activeLocaleID: getActiveLocaleID(state),
    locales: getLocales(state)
  }
};

export default connect(mapStateToProps, actions) (Locales);

