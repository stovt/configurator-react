import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import * as actions from '../actions/configurator';
import { getActiveConfiguratorID } from '../reducers/configurator';

const styles = {
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0
  },
  imageContainer: {
    position: 'relative',
    height: '100%',
    width: '100%'
  },
  imageContainerDisabled: {
    position: 'relative',
    height: '100%',
    width: '100%',
    cursor: 'not-allowed'
  },
  image: {
    maxWidth: '100%',
    width: '100%'
  },
  emptyImage: {
    background: '#CCCCCC',
    height: '100%',
    width: '100%'
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
};

class ProductImage extends React.PureComponent {
  constructor() {
    super();

    this.state = {
      loading: false
    };

    this.uploadImage = this.uploadImage.bind(this);
  }

  uploadImage({ target: { files } }) {
    if (!files.length) return;
    const formData = new FormData();
    for (let i = 0; i < files.length; i += 1) {
      const file = files[i];
      if (file.type.match('image.*')) {
        formData.append('images[]', file, file.name);
      }
    }
    this.setState({
      loading: true
    });

    const {
      configuratorID, uploadImage, type, data
    } = this.props;
    uploadImage(configuratorID, formData, type, data);

    this.setState({
      loading: false
    });
  }

  render() {
    const { image, disabled, configuratorID } = this.props;

    return (
      <div style={disabled ? styles.imageContainer : styles.imageContainerDisabled}>
        {image
          ? <img src={image} style={styles.image} alt={configuratorID} />
          : <div style={styles.emptyImage} />}
        <input
          type="file"
          style={styles.imageInput}
          onChange={this.uploadImage}
          disabled={disabled}
        />
        {this.state.loading && <CircularProgress style={styles.loader} />}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  configuratorID: getActiveConfiguratorID(state)
});

export default connect(mapStateToProps, actions)(ProductImage);

ProductImage.propTypes = {
  disabled: PropTypes.bool,
  configuratorID: PropTypes.string,
  image: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.bool.isRequired
  ]),
  type: PropTypes.string.isRequired,
  data: PropTypes.object,
  uploadImage: PropTypes.func.isRequired
};
ProductImage.defaultProps = {
  disabled: false,
  configuratorID: null,
  data: null,
  image: false
};
