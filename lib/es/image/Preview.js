import React, { Component } from 'react'; // import { connect } from 'react-redux'

import Image from './Image';
import Box from './Box';

class PreviewImage extends Component {
  render() {
    const {
      labels,
      file,
      hideLabels,
      size
    } = this.props;
    const containerSize = size ? size : 100;
    if (!file) return React.createElement("div", {
      style: {
        lineHeight: "100px",
        textAlign: "center",
        border: "1px solid lightgrey",
        borderRadius: "2px",
        width: containerSize - 2,
        height: containerSize - 2
      }
    }, "no file");
    return React.createElement(Image, {
      file: file,
      size: containerSize
    }, !hideLabels && labels.map((label, i) => {
      if (label.type === 'BoxAnnotation') {
        const ratio = containerSize / label.options.viewSize;
        const box = label.state.map(b => {
          return {
            x: b.x * ratio,
            y: b.y * ratio
          };
        });
        return React.createElement(Box, {
          key: i,
          box: box,
          name: label.name.name
        });
      }

      return null;
    }));
  }

}

export default PreviewImage;