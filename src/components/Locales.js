import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import * as actions from '../actions/locales';
import {
  getLocales, getErrorMessage, getIsFetching, getActiveLocaleID
} from '../reducers/locales';
import FetchError from './FetchError';

class Locales extends React.PureComponent {
  constructor() {
    super();

    this.fetchData = this.fetchData.bind(this);
    this.handleOnChange = this.handleOnChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchLocales } = this.props;
    fetchLocales();
  }

  handleOnChange(event, index, id) {
    this.props.selectLocale(id);
  }

  render() {
    const {
      locales, isFetching, errorMessage, activeLocaleID
    } = this.props;

    if (isFetching && !locales.length) {
      return <div>Loading...</div>;
    }
    if (errorMessage && !locales.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={this.fetchData}
        />
      );
    }

    return (
      <SelectField
        value={activeLocaleID}
        onChange={this.handleOnChange}
        floatingLabelText="Locales:"
        autoWidth
      >
        {locales.map((locale) => (
          <MenuItem value={locale.id} key={locale.id} primaryText={locale.value} />
        ))}
      </SelectField>
    );
  }
}


const mapStateToProps = (state) => ({
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state),
  activeLocaleID: getActiveLocaleID(state),
  locales: getLocales(state)
});

export default connect(mapStateToProps, actions)(Locales);

Locales.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  fetchLocales: PropTypes.func.isRequired,
  errorMessage: PropTypes.string,
  activeLocaleID: PropTypes.string.isRequired,
  locales: PropTypes.array.isRequired,
  selectLocale: PropTypes.func.isRequired
};
Locales.defaultProps = {
  errorMessage: null
};
