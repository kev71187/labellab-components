import React, { Component } from 'react';
import Image from './Image';
import Box from './Box';
import { mouseEventToPosition } from '../utils/coordinates';
const IMAGE_SIZE = 500;

class BoundingImage extends Component {
  constructor() {
    super();
    this.state = {
      anchor: null,
      mouse: {
        x: null,
        y: null
      }
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this._obj.dimensions().then(response => {}).catch(e => {
        console.log(e);
      });
    }, 1);
  }

  imageClicked(e) {
    if (this.props.frozen) return false;
    const coords = mouseEventToPosition(e, this._input);
    this.props.onClick(coords.x, coords.y);
  }

  shouldRenderBox() {
    if (!this.props.box) return false;
    return this.props.box.length === 4;
  }

  renderImage() {
    const {
      file,
      size
    } = this.props;
    if (!file) return null;
    return React.createElement(Image, {
      ref: c => this._obj = c,
      file: file,
      size: size,
      rotation: 0,
      onClick: e => this.imageClicked(e)
    });
  }

  onPointMove(e, i) {
    const newCoords = mouseEventToPosition(e, this._input);
    this.props.onPointMove(newCoords, i);
  }

  onAllMove(e) {
    if (!this.state.anchor) {}

    const {
      anchor: {
        point,
        box
      }
    } = this.state;
    const newCoords = mouseEventToPosition(e, this._input);
    const deltaX = newCoords.x - point.x;
    const deltaY = newCoords.y - point.y;
    const newBox = JSON.parse(JSON.stringify(box));
    newBox.forEach(b => {
      b.x = b.x + deltaX;
      b.y = b.y + deltaY;
    });
    this.props.onAllMove(newBox);
  }

  setAnchor(e) {
    const {
      box
    } = this.props;
    const coords = mouseEventToPosition(e, this._input);
    this.setState({
      anchor: {
        box: JSON.parse(JSON.stringify(box)),
        point: coords
      }
    });
  }

  renderCrossHair() {
    const {
      complete
    } = this.props;
    if (!this.state.mouse.x || complete) return null;
    const xPosition = {
      position: 'absolute',
      top: this.state.mouse.y + 'px',
      right: '10px',
      zIndex: 20,
      height: '1px',
      width: IMAGE_SIZE + 'px',
      border: '1px dashed grey'
    };
    const yPosition = {
      position: 'absolute',
      left: this.state.mouse.x + 'px',
      right: '10px',
      zIndex: 20,
      width: '1px',
      height: IMAGE_SIZE + 'px',
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

  render() {
    const {
      file,
      complete,
      boxes,
      box,
      size
    } = this.props;
    if (!file) return null;
    const containerStyle = {
      backgroundColor: '#333',
      position: 'relative',
      height: size + "px",
      width: size + 'px'
    };
    if (!complete) containerStyle.cursor = 'crosshair';
    return React.createElement("div", {
      ref: c => this._input = c,
      style: containerStyle,
      onMouseOut: e => {
        this.setState({
          mouse: {
            x: null,
            y: null
          }
        });
      },
      onMouseMove: e => {
        const coords = mouseEventToPosition(e, this._input);
        this.setState({
          mouse: coords
        });
      }
    }, this.renderCrossHair(), React.createElement(Box, {
      editing: true,
      onComplete: this.props.onComplete,
      onPointMove: (e, i) => {
        this.onPointMove(e, i);
      },
      setAnchor: e => {
        this.setAnchor(e);
      },
      onAllMove: e => {
        this.onAllMove(e);
      },
      notComplete: !complete,
      box: box
    }), this.renderImage());
  }

}

export default BoundingImage;