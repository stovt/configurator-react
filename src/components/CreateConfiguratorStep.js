import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/configurators';
import { getConfiguratorsIds, getErrorMessage, getIsFetching } from '../reducers/configurators';
import FetchError from './FetchError';

import {
  Table, 
  TableBody, 
  TableFooter, 
  TableHeader, 
  TableHeaderColumn, 
  TableRow, 
  TableRowColumn
} from 'material-ui/Table';
import Subheader from 'material-ui/Subheader';
import ContentRemove from 'material-ui/svg-icons/content/delete-sweep';
import AutoComplete from 'material-ui/AutoComplete';
import { autoCompleteFilter } from '../helpers/MaterialUIHelper';
import RaisedButton from 'material-ui/RaisedButton';


class ConfiguratorsIds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: true,
      configuratorId: null
    };

    this.onUpdateProduct = this.onUpdateProduct.bind(this);
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    const { fetchConfiguratorsIds } = this.props;
    fetchConfiguratorsIds();
  }

  onUpdateProduct(value) {
    this.setState({
      btnDisabled: value ? false : true,
      configuratorId: value
    });
  }

  render() {
    const { 
      configuratorsIds, 
      isFetching, 
      errorMessage, 
      selectConfigurator, 
      removeConfigurator,
      createOrFindConfigurator 
    } = this.props;

    if (isFetching && !configuratorsIds.length) {
      return <div>Loading...</div>;
    }
    if (errorMessage && !configuratorsIds.length) {
      return (
        <FetchError
          message={errorMessage}
          onRetry={() => this.fetchData()}
        />
      );
    }

    return (
      <div>
        <div style={{width: '350px'}}>
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
              showRowHover={true}
            >
              {configuratorsIds.map((id) =>            
                <TableRow key={id} >
                  <TableRowColumn style={{ paddingLeft: 0 }}>
                    <Subheader 
                      style={{ paddingLeft: 0, cursor: 'pointer' }} 
                      onClick={() => selectConfigurator(id)}
                    >
                      {id}
                    </Subheader>
                  </TableRowColumn>
                  <TableRowColumn style={{ width: '100px', textAlign: 'center' }}>
                    <ContentRemove 
                      style={{ cursor: 'pointer' }} 
                      onClick={() => removeConfigurator(id)}
                    />
                  </TableRowColumn>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <AutoComplete
          floatingLabelText="Create of find configurator"
          hintText="Type ID"
          dataSource={configuratorsIds}
          dataSourceConfig={{value: 'id',text: 'id'}}
          onUpdateInput={this.onUpdateProduct}
          onNewRequest={(id) => selectConfigurator(id)}
          filter={autoCompleteFilter}
          openOnFocus={true}
          style={{width: '252px'}}
        />
        <RaisedButton 
          secondary={true} 
          label="OK" 
          disabled={this.state.btnDisabled}
          onClick={() => createOrFindConfigurator(this.state.configuratorId)}
          style={{margin: '40px 10px'}}
        />
      </div>   
    )
  }
}


const mapStateToProps = (state) => {
  return {
    configuratorsIds: getConfiguratorsIds(state),
    isFetching: getIsFetching(state),
    errorMessage: getErrorMessage(state)
  }
};

export default connect(mapStateToProps, actions) (ConfiguratorsIds);