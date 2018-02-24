import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions/meta';
import { getMeta } from '../reducers/meta';
import Paper from 'material-ui/Paper';
import TextField from './TextField';
import ProductImage from './ProductImage';

const MetaAttributes = ({ meta, changeTitle, changeKeywords, changeDescription, changeImage }) => (
  <Paper zDepth={1} style={{padding: 20}}>
    <h2>Meta Attributes</h2>
    <TextField
      hintText="Type page title"
      floatingLabelText="Page Title"
      value={meta.pageTitle}
      sendValue={(value) => changeTitle(value)}
    />
    <br />
    <TextField
      hintText="Type page keywords"
      floatingLabelText="Page Keywords"
      value={meta.pageKeywords}
      sendValue={(value) => changeKeywords(value)}
    />
    <br />
    <TextField
      hintText="Type page description"
      floatingLabelText="Page Description"
      value={meta.pageDescription}
      sendValue={(value) => changeDescription(value)}
      multiLine={true}
    />
    <br />
    <p>Page Image:</p>
    <div style={meta.pageImage ? {width: '35%'} : {backgroundColor: "#ccc", width: '35%', height: '64px'}}>
    <ProductImage 
      image={meta.pageImage} 
      type={'UPLOAD_META_PAGE_IMAGE'}
    />
    </div>
  </Paper>
);

const mapStateToProps = (state) => ({
  meta: getMeta(state)
});

export default connect(mapStateToProps, actions) (MetaAttributes);
