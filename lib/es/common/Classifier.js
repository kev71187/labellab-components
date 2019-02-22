import React, { Component } from 'react';
import Search from "./Search";
import styled from 'styled-components';
const LLClassifier = styled.div`
  .classifier-item {
    padding: 5px 15px;
    border-bottom: 1px solid lightgrey;
    color: rgb(0, 123, 255);
  }
  &.scrollable .classifier-item:hover {
    cursor: pointer;
    background-color: #f3f3f3;
  }
  &.scrollable ::-webkit-scrollbar {
    width: 10px;
  }
  &.scrollable ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }
  &.scrollable ::-webkit-scrollbar-thumb {
    background: lightgrey;
  }
  &.scrollable ::-webkit-scrollbar-thumb:hover {
    background: #grey;
  }
  .ll-select-container {
    margin-top: 5px;
    border-top: 1px solid lightgrey;
    webkit-overflow-scrolling: touch;
    overflow-y: scroll;
    max-height: 200px;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08);
  }
`;

class Classifier extends Component {
  constructor(props) {
    super();
    const labels = props.labels.sort();
    this.state = {
      defaultLabels: labels,
      labels,
      selected: props.selected,
      term: null
    };
  }

  onSelect(val) {
    const select = this.props.onSelect(val);

    if (select !== false) {
      this.setState({
        selected: val
      });
    }
  }

  substring(term, name) {
    let resp = false;
    var ii = 0;

    for (var i = 0; i < name.length; i++) {
      if (name[i] == term[ii]) {
        ii += 1;
      }

      if (ii === term.length) break;
    }

    return ii === term.length;
  }

  valid(item) {
    this.props.valid && this.props.valid(item);
  }

  render() {
    const {
      labels,
      selected,
      term,
      selectedStyle
    } = this.state;
    const selectedS = selectedStyle || {
      marginLeft: "5px"
    };

    if (selected) {
      return React.createElement("span", {
        style: selectedS
      }, selected.name, React.createElement("a", {
        href: "javascript:void(0)",
        style: {
          marginLeft: "5px"
        },
        onClick: () => {
          this.setState({
            selected: null
          });
          this.props.onRemove && this.props.onRemove();
        }
      }, "remove"));
    }

    return React.createElement(LLClassifier, {
      className: this.state.labels.length > 5 ? 'scrollable' : ''
    }, React.createElement(Search, {
      placeholder: "Type Label",
      term: term,
      autoFocus: true,
      onSearch: (term, key) => {
        if (key === "Enter") {
          if (labels.length > 0) {
            const label = labels[0];
            this.onSelect(label);
          }
        }

        this.setState({
          term,
          labels: term ? this.state.defaultLabels.filter(label => this.substring(term, label.name)) : this.state.defaultLabels
        });
        if (labels.length === 0) return null;
      }
    }), React.createElement("div", {
      className: "ll-select-container"
    }, labels.length === 0 && React.createElement("div", {
      style: {
        padding: "5px"
      }
    }, "No selectable labels"), labels.map((label, i) => {
      const itemStyle = {};

      if (labels.length - 1 === i) {
        itemStyle.borderBottom = "none";
      }

      return React.createElement("div", {
        key: i,
        onClick: () => {
          this.onSelect(label);
        },
        className: "classifier-item",
        style: itemStyle,
        value: label.id
      }, React.createElement("a", {
        href: "javascript:void(0)"
      }, label.name));
    })));
  }

}

export default Classifier;