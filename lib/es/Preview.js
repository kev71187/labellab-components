import React, { Component } from 'react';
import styled from 'styled-components';
import Image from './image';
import Box from './common/Box';
import colors from './constants/colors';
import Label from './common/Label';
const PreviewComponent = styled.div`
  position: relative;
`;

class Preview extends Component {
  render() {
    const {
      size,
      fileType,
      url,
      data,
      labels
    } = this.props;
    let File = Image.Image;
    return React.createElement(PreviewComponent, {
      style: this.props.style
    }, React.createElement(File, {
      file: {
        url,
        data
      },
      size: size
    }, labels.map((label, i) => {
      if (label.labelGeometry !== 'none') {
        return React.createElement(Box, {
          key: i,
          box: label.state.geometry,
          viewSize: size,
          dimensions: label.options.dimensions,
          name: label.label
        });
      }

      return null;
    }), React.createElement("div", {
      style: {
        wordBreak: "break-all",
        position: "absolute",
        top: "5px",
        left: "5px"
      }
    }, labels.map((label, i) => {
      if (label.labelGeometry === 'none') {
        return React.createElement("span", {
          key: label.label + "-" + i,
          style: {
            marginRight: "5px",
            marginTop: "10px",
            display: "inline-block"
          }
        }, React.createElement(Label, {
          name: label.label
        }));
      }

      return null;
    }))));
  }

}

export default Preview;