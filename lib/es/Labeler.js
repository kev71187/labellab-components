function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LabelerComponent from "./LabelerComponent";
const Main = styled.div`
`;

class Labeler extends Component {
  constructor(props) {
    super();
    this.state = {
      hover: false
    };
  }

  render() {
    const {
      url,
      data
    } = this.props;
    const {
      hover
    } = this.state;
    return React.createElement(Main, {
      style: this.props.style,
      onMouseLeave: e => {
        this.setState({
          hover: false
        });
      },
      onMouseEnter: e => {
        this.setState({
          hover: true
        });
      }
    }, React.createElement(LabelerComponent, _extends({
      hover: hover,
      key: url || data
    }, this.props)));
  }

}

Labeler.defaultProps = {
  labelGeometry: 'none',
  labelType: 'classification'
};
Labeler.propTypes = {
  fileType: PropTypes.oneOf(['text', 'json', 'xml', 'image']).isRequired,
  labelChoices: PropTypes.array,
  labelGeometry: PropTypes.oneOf(['none', 'box', 'polygon']),
  labelType: PropTypes.oneOf(['classification', 'freeform']),
  url: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helpText: PropTypes.string,
  interval: PropTypes.number
};
export default Labeler;