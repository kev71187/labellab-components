import { connect } from 'react-redux';
import React, { Component } from 'react';
import { Link } from 'react-router';
import { paramsToDataset } from '../../lib/utils';
import { twoClickImageClick, rotateImage, setImageLabel, doneEditing } from '../../actions/imageLabel.js';
import { getDatasets } from '../../actions/datasets.js';
import { getRandomDocument } from '../../actions/annotations.js'; // import TwoClickBoundingBox from '../../components/labelers/TwoClickBoundingBox'
// import FreeForm from '../../components/labelers/FreeForm'

class Show extends Component {
  constructor() {
    super();
    this.state = {
      hint: false
    };
  }

  fetchRandomDocument() {
    const {
      dataset,
      label
    } = this.props;
    if (!label || !dataset) return null;
    this.props.doneEditing();
    this.props.getRandomDocument(dataset.id, label, false);
  }

  componentWillMount() {
    const {
      ddId
    } = this.props;

    if (!ddId) {
      this.fetchRandomDocument();
    }

    window.addEventListener('keydown', event => {
      if (event.key === 'Enter') {// this.done()
      }
    });
  }

  componentWillReceiveProps(nextProps) {
    const {
      daId,
      datasetsDocument
    } = nextProps;

    if (!this.props.datasetsDocument && daId && datasetsDocument) {
      const da = datasetsDocument.datasetsAnnotations.find(da => daId == da.id);
      this.props.setImageLabel(da);
    }
  }

  nameSelected(currentName) {
    this.props.setCurrentName(currentName.id);
    this.props.getImage(currentName.id);
  }

  setAnnotation(da) {
    this.props.setImageLabel(da);
  }

  freeForm() {
    const {
      dataset
    } = this.props;
    const dn = dataset.datasetsNames[0];
    return dn.option === "label_freform";
  }

  render() {
    const {
      doc,
      datasetsDocument,
      dataset,
      label,
      box,
      daId,
      ddId
    } = this.props;
    const freeForm = this.freeForm();
    return React.createElement("div", null, freeForm && React.createElement(FreeForm, {
      key: label ? 0 : 1,
      ddId: ddId,
      dataset: dataset,
      doc: doc,
      daId: daId,
      datasetsDocument: datasetsDocument
    }), !freeForm && React.createElement(TwoClickBoundingBox, {
      key: label ? 0 : 1,
      ddId: ddId,
      label: label,
      labelSelected: name => this.props.labelSelected(name),
      dataset: dataset,
      doc: doc,
      daId: daId,
      datasetsDocument: datasetsDocument
    }));
  }

}

const mapStateToProps = (state, props) => {
  const {
    imageLabel: {
      box,
      question,
      rotation
    }
  } = state;
  const {
    doc
  } = props;
  return {
    box,
    question,
    rotation
  };
};

export default connect(mapStateToProps, {
  rotateImage,
  getRandomDocument
})(Show);