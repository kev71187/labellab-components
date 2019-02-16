import { connect } from 'react-redux';
import React, { Component } from 'react';

class SelectName extends Component {
  onSelect(e) {
    const val = e.target.value;
    this.props.labelSelected(val);
  }

  render() {
    const {
      names,
      label
    } = this.props;
    return React.createElement("div", {
      className: "row"
    }, React.createElement("div", {
      className: "col-12"
    }, React.createElement("label", null, "Choose a label category to start labeling"), React.createElement("select", {
      className: "form-control",
      defaultValue: label,
      onChange: e => this.onSelect(e)
    }, React.createElement("option", {
      value: ""
    }, "Unselected"), names.map((name, i) => React.createElement("option", {
      key: i,
      value: name.name
    }, name.name)))));
  }

}

const mapStateToProps = (state, props) => {
  return {};
};

export default connect(mapStateToProps, {})(SelectName);