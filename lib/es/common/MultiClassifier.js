import React, { Component } from 'react';
import colors from "../constants/colors";
import Classifier from "./Classifier";
import styled from 'styled-components';
const MultiClassifierComponent = styled.div`
`;

class MultiClassifier extends Component {
  constructor(props) {
    super();
    this.state = {
      selected: props.selected || [null],
      done: false
    };
  }

  onSelect(val, i) {
    let selected = this.cloneSelected();

    if (selected[i] === null) {
      selected.push(null);
    }

    selected[i] = val;
    this.setState({
      selected
    });
  }

  cloneSelected() {
    return JSON.parse(JSON.stringify(this.state.selected));
  }

  done() {
    let selected = this.cloneSelected();
    selected.pop();
    this.setState({
      done: true,
      selected
    });
    this.props.onComplete(selected);
  }

  render() {
    const {
      labels,
      completeButtonStyles,
      completeButtonText,
      placeholder
    } = this.props;
    const place = placeholder ? placeholder : "Type labeles";
    const {
      done,
      selected
    } = this.state;
    const compText = completeButtonText || "Done";
    return React.createElement(MultiClassifierComponent, null, !done && React.createElement("button", {
      className: "btn-complete-multi btn btn-primar",
      onClick: () => {
        this.done();
      }
    }, compText), selected.map((item, i) => {
      return React.createElement(Classifier, {
        key: i + JSON.stringify(item),
        placeholder: place,
        onRemove: label => {
          console.log(selected);
          const select = JSON.parse(JSON.stringify(selected));
          select.shift(i);
          console.log(select);
          this.setState({
            selected: select
          });
        },
        selected: item,
        labels: labels.filter(label => {
          const found = selected.find(item => item && item.name === label.name);
          return !found;
        }),
        onSelect: val => {
          this.onSelect(val, i);
        }
      });
    }));
  }

}

export default MultiClassifier;