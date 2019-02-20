import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import * as actions from '../actions/configurators';
import { getActiveConfigurator } from '../reducers/configurator';

class ConfiguratorPreview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      configuratorUrl: null
    };

    this.getConfiguratorUrl = this.getConfiguratorUrl.bind(this);
  }

  getConfiguratorUrl() {
    const { configurator, getPreviewUrl, fetchConfiguratorsIds } = this.props;
    getPreviewUrl(configurator).then(
      (response) => {
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
        margin: '10px auto',
        textAlign: 'center'
      }}
      >
        <RaisedButton
          secondary
          label="Preview Configurator"
          onClick={this.getConfiguratorUrl}
        />
        {this.state.configuratorUrl && (
          <Card style={{ marginTop: '10px' }}>
            <CardHeader
              title={`${configurator.config.configuratorID}-temp`}
              subtitle={configurator.config.global.title}
              actAsExpander
              showExpandableButton
            />
            <CardText expandable>
              <iframe
                title={`${configurator.config.configuratorID}-temp`}
                src={this.state.configuratorUrl}
                style={{ width: '100%', height: '700px' }}
              >
                Your browser does not support iframe!
              </iframe>
            </CardText>
          </Card>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  configurator: getActiveConfigurator(state)
});

export default connect(mapStateToProps, actions)(ConfiguratorPreview);

ConfiguratorPreview.propTypes = {
  configurator: PropTypes.object,
  getPreviewUrl: PropTypes.func.isRequired,
  fetchConfiguratorsIds: PropTypes.func.isRequired
};
ConfiguratorPreview.defaultProps = {
  configurator: null
};
