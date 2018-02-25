import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/configurators';
import { getActiveConfigurator } from '../reducers/configurator';

import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';

class ConfiguratorPreview extends Component {  

  constructor(props){
    super(props);
    
    this.state = {
      configuratorUrl: null
    };
  }

  getConfiguratorUrl() {
    const { configurator, getPreviewUrl, fetchConfiguratorsIds } = this.props;
    getPreviewUrl(configurator).then(
      response => {
        if (response) {
          this.setState({
            configuratorUrl: response
          });
          fetchConfiguratorsIds();
        }
      }
    );
  }

  render() {
    const { configurator } = this.props;
    return (
      <div style={{
        'margin': '10px auto',
        'textAlign': 'center'
      }}>
        <RaisedButton 
          secondary={true} 
          label="Preview Configurator"
          onClick={() => this.getConfiguratorUrl()}
        />
        {this.state.configuratorUrl  
          ? <Card style={{'marginTop': '10px'}}>
              <CardHeader
                title={configurator.config.configuratorID + '-temp'}
                subtitle={configurator.config.global.title}
                actAsExpander={true}
                showExpandableButton={true}
              />
              <CardText expandable={true}>
                <iframe src={this.state.configuratorUrl} style={{"width": "100%", "height": "700px"}}>
                    Your browser does not support iframe!
                 </iframe>
              </CardText>
            </Card>
          : null
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  configurator: getActiveConfigurator(state)
});

export default connect(mapStateToProps, actions) (ConfiguratorPreview);