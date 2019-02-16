import React, { Component } from 'react';
import Image from '../Image';
import Box from './Box';
import { mouseEventToPosition } from '../../utils/coordinates';
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

  imageClicked(e) {
    if (this.props.frozen) return false;
    const coords = mouseEventToPosition(e, 'll-tracker');
    this.props.onClick(coords.x, coords.y);
  }

  shouldRenderDot() {
    if (!this.props.box) return false;
    const b = this.props.box;
    return b.length === 1;
  }

  shouldRenderBox() {
    if (!this.props.box) return false;
    return this.props.box.length === 4;
  }

  renderDot(b, i) {
    if (!this.shouldRenderDot()) return null;
    const x = b[0].x;
    const y = b[0].y;
    const left = x;
    const top = y;
    const style = {
      left,
      top,
      position: 'absolute',
      width: 6,
      borderRadius: '50%',
      height: 6,
      zIndex: 2,
      pointerEvents: 'none',
      backgroundColor: 'green'
    };
    return React.createElement("div", {
      key: i,
      style: style
    });
  }

  renderBox(b, i, override) {
    if (!this.shouldRenderBox() && !override) return null;
    const width = b[1].x - b[0].x;
    const left = b[0].x;
    const height = b[3].y - b[0].y;
    const top = b[0].y;
    const style = {
      left,
      top,
      position: 'absolute',
      width,
      height,
      zIndex: 2,
      pointerEvents: 'none',
      border: '2px solid green'
    };
    return React.createElement("div", {
      key: i,
      style: style
    });
  }

  renderImage() {
    const {
      file,
      size
    } = this.props;
    if (!file) return null;
    return React.createElement(Image, {
      file: file,
      size: size,
      rotation: 0,
      onClick: e => this.imageClicked(e)
    });
  }

  setBottomRight() {
    const {
      x,
      y
    } = this.state.question;
    alert();
  }

  setTopLeft() {
    const {
      x,
      y
    } = this.state.question;
    const box = this.props.box;
    box.xmin = relativeX;
    box.ymin = relativeY;
    this.props.onClick(box);
    this.setState({
      question: null
    });
  }

  clear() {
    this.setState({
      question: null
    });
  }

  renderLine() {}

  onPointMove(e, i) {
    const newCoords = mouseEventToPosition(e, "ll-tracker");
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
    const newCoords = mouseEventToPosition(e, "ll-tracker");
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
    const coords = mouseEventToPosition(e, "ll-tracker");
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
      id: "ll-tracker",
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
        const coords = mouseEventToPosition(e, 'll-tracker');
        this.setState({
          mouse: coords
        });
      }
    }, this.renderCrossHair(), React.createElement(Box, {
      editing: true,
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