import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/configurator';
import { getActiveConfiguratorID } from '../reducers/configurator';
import CircularProgress from 'material-ui/CircularProgress';

class ProductImage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  };

  uploadImage(files) {
    let formData = new FormData();
    if ( files.length == 0 ) {
      return false;
    }
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      if (!file.type.match('image.*')) {
        continue;
      }
      formData.append('images[]', file, file.name);
    }
    this.setState({
      loading: true
    });

    const { configuratorID, uploadImage, type, data } = this.props;
    uploadImage(configuratorID, formData, type, data);

    this.setState({
      loading: false
    });
  };

  render() {
    const { 
      image, 
      disabled,
      configuratorID
    } = this.props;

    return (
      <div style={disabled ? styles.imageContainer : styles.imageContainerDisabled}>
        {image 
          ? <img src={image} style={styles.image}/>
          : <div style={styles.emptyImage} />
        }
        <input
          type="file"
          style={styles.imageInput}
          onChange={(e) => this.uploadImage(e.target.files)}
          disabled={disabled} 
        />
        {this.state.loading ? <CircularProgress style={styles.loader}/> : ""}
      </div>
    )
  }
};

const mapStateToProps = (state) => ({
  configuratorID: getActiveConfiguratorID(state)
});

export default connect(mapStateToProps, actions) (ProductImage);

ProductImage.defaultProps = {
  disabled: false  
};

const styles = {
  imageInput: {
    cursor: 'pointer',
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    width: '100%',
    opacity: 0,
  },
  imageContainer: {
    position: 'relative',    
    height: "100%",
    width: "100%"
  },
  imageContainerDisabled: {
    position: 'relative',    
    height: "100%",
    width: "100%",
    cursor: "not-allowed"
  },
  image: {    
    maxWidth: "100%",
    width: "100%"
  },
  emptyImage: {
    background: "#CCCCCC",
    height: "100%",
    width: "100%"
  },
  loader: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0
  }
};