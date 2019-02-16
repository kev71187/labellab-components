import React, { Component } from 'react';
import { Button } from 'reactstrap';

class Action extends Component {
  render() {
    const {
      name,
      callback,
      disabled,
      color
    } = this.props;
    let col = color ? color : 'dark';
    return React.createElement(Button, {
      color: col,
      onClick: callback,
      style: {
        marginBottom: '5px',
        width: '100%'
      },
      disabled: disabled
    }, name);
  }

}

export default Action;