import React, { Component } from 'react';

class Default extends Component {
  render() {
    return React.createElement("div", null, this.props.children);
  }

}

export default Default;