import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { paramsToDataset } from '../../lib/utils';
import { createAnnotation } from '../../actions/annotations.js';
import { getDatasets } from '../../actions/datasets.js';
import Names from '../../components/Names';
import BoundingImage from './BoundingImage';
import SelectName from './SelectName';
import Action from './Action';

class BoundingBox extends Component {
  constructor() {
    super();
    this.state = {
      question: null
    };
  }

  renderEmpty() {
    const {
      dataset
    } = this.props;
    return React.createElement("div", null, "You need to upload some documents to annotate them. Find out how ", React.createElement(Link, {
      to: dataset.uploadSlug
    }, "here"));
  }

  imageClick(x, y) {
    const {
      box
    } = this.props;

    if (box.length !== 4) {
      this.props.imageClick(x, y);
    } else {
      this.setState({
        question: {
          x,
          y
        }
      });
    }
  }

  render() {
    const {
      doc,
      dataset,
      box,
      rotation
    } = this.props;
    if (!doc) return this.renderEmpty();
    return React.createElement("div", {
      style: {
        backgroundColor: '#333'
      }
    }, React.createElement(BoundingImage, {
      onClear: () => this.cancel(),
      box: box,
      question: this.state.question,
      rotation: rotation,
      image: doc.file,
      onClick: (x, y) => this.imageClick(x, y)
    }));
  }

}

const mapStateToProps = (state, props) => {
  const {
    box,
    rotation
  } = state.imageLabel;
  return {
    box,
    rotation
  };
};

export default connect(mapStateToProps, {
  createAnnotation
})(BoundingBox);