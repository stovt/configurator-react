import React from 'react';
import PropTypes from 'prop-types';
import ListItem from 'material-ui/List/ListItem';
import { GridTile } from 'material-ui/GridList';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ProductImage from './ProductImage';

class ImageVariation extends React.PureComponent {
  constructor() {
    super();

    this.removeImageVariation = this.removeImageVariation.bind(this);
  }

  removeImageVariation() {
    const {
      removeImageVariation, imageVariation, product, variation, folder, accessory
    } = this.props;
    removeImageVariation(imageVariation, product, variation, folder, accessory);
  }

  render() {
    const {
      imageVariation, folder, product, variation, accessory
    } = this.props;

    return (
      <ListItem key={imageVariation.productID}>
        <div style={{ float: 'left', minWidth: '30%' }}>
          <GridTile
            title="change image"
            style={{
              width: '180px',
              height: '180px',
              display: 'inline-block',
              margin: '10px',
              position: 'relative'
            }}
          >
            <ProductImage
              image={imageVariation.realImage}
              type={
                  accessory
                    ? 'UPLOAD_ACCESSORY_IMAGE_VARIATION'
                    : 'UPLOAD_BASE_CONFIG_IMAGE_VARIATION'
                }
              data={{
                folder,
                product,
                variation,
                imageVariation
              }}
            />
          </GridTile>
        </div>
        <div style={{ float: 'left' }}>
          <h4>{imageVariation.productName}</h4>
        </div>
        <FloatingActionButton
          secondary
          mini
          onClick={this.removeImageVariation}
          style={{
            cursor: 'pointer',
            transform: 'rotate(45deg)',
            float: 'right',
            marginRight: '25px',
            position: 'absolute',
            right: '0px',
            top: '15px'
          }}
        >
          <ContentAdd />
        </FloatingActionButton>
        <div style={{ clear: 'both' }} />
      </ListItem>
    );
  }
}

export default ImageVariation;

ImageVariation.propTypes = {
  variation: PropTypes.object.isRequired,
  imageVariation: PropTypes.object.isRequired,
  product: PropTypes.object.isRequired,
  folder: PropTypes.object,
  accessory: PropTypes.bool.isRequired,
  removeImageVariation: PropTypes.func.isRequired
};
ImageVariation.defaultProps = {
  folder: null
};
