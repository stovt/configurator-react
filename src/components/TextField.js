import React , { Component } from 'react';
import TextField from 'material-ui/TextField';

class CustomTextField extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };

    this.handleValueChange = this.handleValueChange.bind(this);
  };

  componentWillReceiveProps(nextProps) {
    if (this.state.value != nextProps.value) {
      this.setState({
        value: nextProps.value
      });
    }
  }

  handleValueChange(event, value) {
    this.setState({
      value: value
    });
  }

  render() {
    return (
      <TextField
        hintText={this.props.hintText}
        floatingLabelText={this.props.floatingLabelText}
        value={this.state.value}
        onChange={this.handleValueChange} 
        onBlur={() => this.props.sendValue(this.state.value)}
      />
    )
  }
}

export default CustomTextField;

