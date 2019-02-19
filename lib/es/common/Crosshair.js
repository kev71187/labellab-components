import React, { Component } from 'react';

class Crosshair extends Component {
  constructor() {
    super();
    this.state = this.defaultState();
  }

  defaultState() {
    return {
      x: null,
      y: null
    };
  }

  onMouseMove(mouse) {
    if (mouse) {
      this.setState(mouse);
    } else {
      this.setState(this.defaultState());
    }
  }

  render() {
    const {
      size
    } = this.props;
    if (!this.state.x) return null;
    const xPosition = {
      position: 'absolute',
      top: this.state.y + 'px',
      right: '10px',
      zIndex: 20,
      height: '1px',
      width: size + 'px',
      border: '1px dashed grey'
    };
    const yPosition = {
      position: 'absolute',
      left: this.state.x + 'px',
      right: '10px',
      zIndex: 20,
      width: '1px',
      height: size + 'px',
      border: '1px dashed grey'
    };
    return React.createElement("div", {
      style: {
        pointerEvents: 'none'
      }
    }, React.createElement("div", {
      style: xPosition
    }), React.createElement("div", {
      style: yPosition
    }));
  }

}

export default Crosshair;