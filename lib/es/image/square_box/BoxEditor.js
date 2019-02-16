import { connect } from 'react-redux';
import React, { Component } from 'react';
import { editBox } from '../../actions/imageLabel.js';

class BoxEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      box: props.box
    };
  }

  componentWillReceiveProps(nextProps) {
    const {
      box
    } = this.props;
    const box2 = nextProps.box;

    if (box !== box2) {
      this.setState({
        box: box2
      });
    }
  }

  onChange(value, i, coord) {
    const {
      box
    } = this.state;

    if (coord == 'x') {
      if (i == 0) {
        box[0].x = value;
        box[3].x = value;
      } else {
        box[1].x = value;
        box[2].x = value;
      }
    }

    if (coord == 'y') {
      if (i == 0) {
        box[0].y = value;
        box[1].y = value;
      } else {
        box[2].y = value;
        box[3].y = value;
      }
    }

    this.setState({
      box
    });
    this.props.editBox(box);
  }

  renderInput(value, i, coord) {
    return React.createElement("input", {
      style: {
        maxWidth: '70px'
      },
      onChange: e => this.onChange(e.target.value ? parseFloat(e.target.value) : 0, i, coord),
      value: value
    });
  }

  render() {
    const {
      box
    } = this.state;
    return React.createElement("div", null, box.map((b, i) => {
      return React.createElement("div", {
        className: "row text-left",
        key: i
      }, React.createElement("div", {
        className: "col-6"
      }, "x: ", i === 0 || i == 1 ? this.renderInput(b.x, i, 'x') : b.x), React.createElement("div", {
        className: "col-6"
      }, "y: ", i === 0 || i === 3 ? this.renderInput(b.y, i, 'y') : b.y), React.createElement("hr", {
        className: "col-12"
      }));
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
  editBox
})(BoxEditor);