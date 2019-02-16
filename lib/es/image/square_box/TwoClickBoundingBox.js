import { connect } from 'react-redux';
import React, { Component } from 'react';
import Slide from 'react-reveal/Slide';
import { Link } from 'react-router';
import { paramsToDataset } from '../../lib/utils';
import { twoClickImageClick, rotateImage, setImageLabel, doneEditing } from '../../actions/imageLabel.js';
import { getDatasets } from '../../actions/datasets.js';
import { getRandomDocument, deleteAnnotation, createAnnotation, updateAnnotation } from '../../actions/annotations.js';
import Names from '../../components/Names';
import SelectName from './SelectName';
import Action from './Action';
import BoundingBox from './BoundingBox';
import BoxEditor from './BoxEditor';
import Badge from '../Badge';
import PreviewImage from './PreviewImage';

class TwoClickBoundingBox extends Component {
  constructor() {
    super();
    this.state = {
      hint: false
    };
  } // done(id) {
  //   const { image } = this.props
  //   const body = {
  //     document_id: image.id,
  //     name_id: id,
  //     state: this.state
  //   }
  //   this.props.createAnnotation(body)
  //   this.setState(this.defaultState())
  //   setTimeout(() => {
  //     this.fetchRandomDocument()
  //   }, 400)
  // }


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

  cancel() {
    this.setState({
      box: this.defaultCurrent()
    });
  }

  nameSelected(currentName) {
    this.props.setCurrentName(currentName.id);
    this.props.getImage(currentName.id);
  }

  setAnnotation(da) {
    this.props.setImageLabel(da);
  }

  saveAnnotation() {
    const {
      daId,
      ddId,
      doc,
      dataset,
      label,
      box
    } = this.props;
    this.props.createAnnotation({
      document_id: doc.id,
      datasets_document_id: ddId,
      dataset_id: dataset.id,
      name: label,
      type: 'box_annotation',
      state: box
    }).then(() => {
      this.props.doneEditing();
    });
  }

  componentWillUnmount() {
    this.props.doneEditing();
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
    const classification = label;
    return React.createElement("div", null, datasetsDocument && React.createElement("div", null, React.createElement("div", {
      className: "row",
      style: {
        padding: '0 15px'
      }
    }, React.createElement("div", {
      className: "col-12 col-lg-4"
    }, label && React.createElement("div", null, React.createElement("div", {
      style: {
        marginBottom: '10px'
      }
    }, "Click on the ", box.length === 0 ? 'top left' : 'bottom right', " of the ", React.createElement("span", {
      style: {
        fontWeight: 'bold'
      }
    }, "\"", classification, "\" in the image?")), React.createElement("div", {
      className: "text-center"
    }, box.length > 0 && !daId && React.createElement(BoxEditor, null), daId && React.createElement(Action, {
      name: 'Remove ' + classification,
      color: "danger",
      callback: () => this.props.deleteAnnotation(daId, ddId).then(() => this.props.doneEditing()),
      disabled: false
    }), box.length === 4 && !daId && React.createElement(Action, {
      name: 'Save ' + classification,
      color: "success",
      callback: () => this.saveAnnotation(),
      disabled: false
    }), box.length > 0 && React.createElement(Action, {
      name: daId ? 'Done' : 'Clear',
      color: "secondary",
      callback: () => this.props.doneEditing(),
      disabled: false
    }), box.length !== 4 && datasetsDocument.datasetsAnnotations.length === 0 && React.createElement(Action, {
      name: 'No ' + classification,
      color: "danger",
      callback: () => this.rotate(),
      disabled: false
    })), React.createElement("hr", null), React.createElement(Action, {
      name: "Next Document",
      color: "primary",
      callback: () => this.fetchRandomDocument(),
      disabled: false
    }), React.createElement("div", null, React.createElement("div", {
      onClick: () => this.setState({
        hint: !this.state.hint
      }),
      className: "btn btn-link"
    }, "Hints"), this.state.hint && React.createElement("ul", null, React.createElement("li", null, "Click number:", React.createElement("ul", null, React.createElement("li", null, "1 sets the top left corner"), React.createElement("li", null, "2 sets the bottom right corner"), React.createElement("li", null, "3+ adjusts"))), React.createElement("li", null, "Rotating the image will also rotate your bounding box")))), React.createElement(SelectName, {
      label: this.props.label,
      labelSelected: this.props.labelSelected,
      names: dataset.datasetsNames.map(d => d.name)
    })), React.createElement("div", {
      className: "col-12 col-lg-8"
    }, React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-12"
    }, React.createElement(BoundingBox, {
      onRotate: () => this.rotate(),
      imageClick: (x, y) => this.props.twoClickImageClick(x, y),
      dataset: dataset,
      doc: doc
    })), React.createElement("div", {
      className: "col-12"
    }, "Labels:", React.createElement("div", null, datasetsDocument.datasetsAnnotations.map(da => {
      const badge = React.createElement(Badge, {
        key: da.id,
        labelClick: e => {
          this.setAnnotation(da);
        },
        label: da.annotation.name
      });

      if (da.isNew) {
        return React.createElement("span", {
          key: da.id,
          className: "fade-in"
        }, badge);
      } else {
        return badge;
      }
    })), React.createElement("div", {
      style: {
        marginTop: '15px',
        marginBottom: '15px'
      }
    }, React.createElement(PreviewImage, {
      showLabels: true,
      annotations: datasetsDocument.datasetsAnnotations.map(da => da.annotation)
    }))))))));
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
  twoClickImageClick,
  rotateImage,
  getRandomDocument,
  setImageLabel,
  deleteAnnotation,
  doneEditing,
  createAnnotation
})(TwoClickBoundingBox);