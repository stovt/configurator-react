import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  Table, TableBody, TableHeader, TableHeaderColumn, TableRow
} from 'material-ui/Table';
import AutoComplete from 'material-ui/AutoComplete';
import RaisedButton from 'material-ui/RaisedButton';
import FetchError from '../FetchError';
import { getConfiguratorsIds, getErrorMessage, getIsFetching } from '../../reducers/configurators';
import * as actions from '../../actions/configurators';
import { autoCompleteFilter } from '../../helpers/MaterialUIHelper';
import CreateConfiguratorStepChild from './CreateConfiguratorStepChild';


class CreateConfiguratorStep extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: true,
      configuratorId: null
    };

    this.onUpdateProduct = this.onUpdateProduct.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.createOrFindConfigurator = this.createOrFindConfigurator.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  onUpdateProduct(value) {
    this.setState({
      btnDisabled: !value,
      configuratorId: value
    });
  }

  fetchData() {
    const { fetchConfiguratorsIds } = this.props;
    fetchConfiguratorsIds();
  }

  createOrFindConfigurator() {
    this.props.createOrFindConfigurator(this.state.configuratorId);
  }

  render() {
    const {
      configuratorsIds, isFetching, errorMessage, selectConfigurator, removeConfigurator
    } = this.props;

    if (isFetching && !configuratorsIds.length) {
      return <div>Loading...</div>;
    }
    if (errorMessage && !configuratorsIds.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={this.fetchData}
        />
      );
    }

    return (
      <div>
        <div style={{ width: '350px' }}>
          <Table>
            <TableHeader
              displaySelectAll={false}
              adjustForCheckbox={false}
            >
              <TableRow>
                <TableHeaderColumn style={{ paddingLeft: 0 }}>
                  Configurators:
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody
              displayRowCheckbox={false}
              showRowHover
            >
              {configuratorsIds.map(id => (
                <CreateConfiguratorStepChild
                  key={id}
                  configuratorId={id}
                  selectConfigurator={selectConfigurator}
                  removeConfigurator={removeConfigurator}
                />
              ))}
            </TableBody>
          </Table>
        </div>

        <AutoComplete
          floatingLabelText="Create of find configurator"
          hintText="Type ID"
          dataSource={configuratorsIds}
          dataSourceConfig={{ value: 'id', text: 'id' }}
          onUpdateInput={this.onUpdateProduct}
          onNewRequest={selectConfigurator}
          filter={autoCompleteFilter}
          openOnFocus
          style={{ width: '252px' }}
        />
        <RaisedButton
          secondary
          label="OK"
          disabled={this.state.btnDisabled}
          onClick={this.createOrFindConfigurator}
          style={{ margin: '40px 10px' }}
        />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  configuratorsIds: getConfiguratorsIds(state),
  isFetching: getIsFetching(state),
  errorMessage: getErrorMessage(state)
});

export default connect(mapStateToProps, actions)(CreateConfiguratorStep);

CreateConfiguratorStep.propTypes = {
  fetchConfiguratorsIds: PropTypes.func.isRequired,
  configuratorsIds: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string,
  selectConfigurator: PropTypes.func.isRequired,
  removeConfigurator: PropTypes.func.isRequired,
  createOrFindConfigurator: PropTypes.func.isRequired
};
CreateConfiguratorStep.defaultProps = {
  errorMessage: null
};
