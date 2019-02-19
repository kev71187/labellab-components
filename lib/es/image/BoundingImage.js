import React, { Component } from 'react';
import Image from './Image';
import Box from './Box';
import Crosshair from '../common/Crosshair';
import { mouseEventToCoordinate, coordToPoint } from '../utils/coordinates';
import { IMAGE_SIZE } from "../constants/image";

class BoundingImage extends Component {
  constructor() {
    super();
    this.state = {
      anchor: null,
      dimensions: null
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this._obj.dimensions().then(dimensions => {
        this.props.setDemensions(dimensions);
        this.setState({
          dimensions
        });
      }).catch(e => {
        console.log(e);
      });
    }, 1);
  }

  imageClicked(e) {
    const {
      dimensions
    } = this.state;
    if (this.props.frozen) return false;
    const coords = mouseEventToCoordinate(e, this._input);
    const point = coordToPoint(coords, dimensions, IMAGE_SIZE);

    if (this.invalidPoint(point)) {
      return;
    }

    this.props.onClick(point.x, point.y);
  }

  invalidPoint(point) {
    const {
      dimensions
    } = this.state;
    return point.x < 0 || point.x > dimensions.width || point.y < 0 || point.y > dimensions.height;
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
    const coords = mouseEventToCoordinate(e, this._input);
    const point = coordToPoint(coords, this.state.dimensions, IMAGE_SIZE);

    if (this.invalidPoint(point)) {
      return;
    }

    this.props.onPointMove(point, i);
  }

  onAllMove(e) {
    if (!this.state.anchor) {}

    const {
      anchor: {
        point,
        box
      }
    } = this.state;
    const coords = mouseEventToCoordinate(e, this._input);
    const p = coordToPoint(coords, this.state.dimensions, IMAGE_SIZE);
    const deltaX = p.x - point.x;
    const deltaY = p.y - point.y;
    const newBox = JSON.parse(JSON.stringify(box));
    newBox.forEach(b => {
      b.x = b.x + deltaX;
      b.y = b.y + deltaY;
    });
    let invalid = newBox.find(point => this.invalidPoint(point));

    if (invalid) {
      return;
    }

    this.props.onAllMove(newBox);
  }

  setAnchor(e) {
    const {
      box
    } = this.props;
    const coords = mouseEventToCoordinate(e, this._input);
    const point = coordToPoint(coords, this.state.dimensions, IMAGE_SIZE);
    this.setState({
      anchor: {
        box: JSON.parse(JSON.stringify(box)),
        point
      }
    });
  } // renderCrossHair() {
  //   const {complete} = this.props
  //   if (!this.state.mouse.x || complete) return null
  //   const xPosition = {position: 'absolute', top: this.state.mouse.y + 'px', right: '10px', zIndex: 20, height: '1px', width: IMAGE_SIZE + 'px', border: '1px dashed grey'}
  //   const yPosition = {position: 'absolute', left: this.state.mouse.x + 'px', right: '10px', zIndex: 20, width: '1px', height: IMAGE_SIZE + 'px', border: '1px dashed grey'}
  //   return (
  //     <div style={{pointerEvents: 'none'}}>
  //       <div style={xPosition}></div>
  //       <div style={yPosition}></div>
  //     </div>
  //   )
  // }


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
        if (this._crosshair) {
          this._crosshair.onMouseMove(null);
        }
      },
      onMouseMove: e => {
        if (this._crosshair) {
          const coords = mouseEventToCoordinate(e, this._input);

          this._crosshair.onMouseMove(coords);
        }
      }
    }, !complete && React.createElement(Crosshair, {
      ref: c => this._crosshair = c,
      size: size
    }), React.createElement(Box, {
      editing: true,
      dimensions: this.state.dimensions,
      viewSize: IMAGE_SIZE,
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