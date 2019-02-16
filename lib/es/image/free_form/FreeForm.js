import { connect } from 'react-redux';
import React, { Component } from 'react';
import { getRandomDocument, createAnnotation } from '../../actions/annotations.js';
import { doneEditing } from '../../actions/imageLabel.js';
import Image from './Image';

class FreeForm extends Component {
  constructor() {
    super();
    this.state = {
      value: ''
    };
  }

  componentWillMount() {
    const {
      ddId
    } = this.props;

    if (!ddId) {
      this.fetchRandomDocument();
    }
  }

  fetchRandomDocument() {
    const {
      dataset
    } = this.props;
    this.props.getRandomDocument(dataset.id, null, false);
  }

  onChange(e) {
    this.setState({
      value: e.target.value
    });
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.submit();
    }
  }

  submit() {
    const {
      daId,
      ddId,
      doc,
      dataset
    } = this.props;

    if (!this.state.value) {
      return null;
    }

    this.props.createAnnotation({
      document_id: doc.id,
      datasets_document_id: ddId,
      dataset_id: dataset.id,
      type: 'freeform_annotation',
      state: this.state.value
    }).then(() => {
      this.props.doneEditing();
      this.fetchRandomDocument();
    });
  }

  render() {
    const {
      doc,
      datasetsDocument
    } = this.props;

    if (!doc) {
      return null;
    }

    return React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-4"
    }, React.createElement("div", {
      className: "row"
    }, React.createElement("label", null, "What is this?"), React.createElement("input", {
      autoFocus: true,
      onKeyPress: e => this.handleKeyPress(e),
      className: "col-12 form-control",
      style: {
        marginBottom: '15px'
      },
      onChange: e => this.onChange(e),
      placeholder: "label",
      type: "text",
      name: "label"
    }), React.createElement("button", {
      className: "col-12 btn btn-success",
      disabled: this.state.value === '',
      onClick: () => this.submit()
    }, "Save"))), React.createElement("div", {
      className: "col-8"
    }, React.createElement(Image, {
      image: doc.file,
      rotation: 0
    }), React.createElement("div", {
      style: {
        marginTop: '15px',
        marginBottom: '15px'
      }
    }, datasetsDocument.datasetsAnnotations.map(da => {
      return React.createElement("div", {
        className: "btn btn-primary",
        key: da.id
      }, da.annotation.state);
    }))));
  }

}

const mapStateToProps = (state, props) => {
  const {
    datasetsDocuments
  } = state.entities;
  const datasetsDocument = datasetsDocuments[props.ddId];
  return {
    datasetsDocument
  };
};

export default connect(mapStateToProps, {
  getRandomDocument,
  createAnnotation,
  doneEditing
})(FreeForm);