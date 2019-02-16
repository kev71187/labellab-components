import React, { Component } from 'react';

class Box extends Component {
  constructor() {
    super();
    this.state = {
      hover: false,
      cornerHover: null,
      dragging: null
    };
  }

  render() {
    const {
      box,
      size,
      notComplete,
      editing
    } = this.props;
    const complete = !(notComplete === true);
    const {
      name
    } = this.props;
    const {
      hover,
      cornerHover,
      dragging
    } = this.state;
    let color = "rgb(40, 167, 69)";
    let colorTransparent = "rgba(40, 167, 69, .2)";
    const isDragging = dragging !== null;

    if (hover || cornerHover !== null) {
      color = "rgb(0, 123, 255)";
      colorTransparent = "rgb(0, 123, 255, .2)";
    }

    const containerStyle = {
      position: "relative",
      zIndex: 3
    };

    if (!isDragging) {
      containerStyle.zIndex = 15;
      containerStyle.pointerEvents = 'none';
    }

    const points = box.map(b => b.x + "," + b.y).join(" ");
    return React.createElement("div", {
      style: containerStyle
    }, hover && name && React.createElement("div", {
      style: {
        backgroundColor: color,
        color: "#fff",
        padding: "1px 5px",
        borderRadius: "2px",
        position: "absolute",
        top: "5px",
        left: "5px"
      }
    }, name), React.createElement("svg", {
      onMouseUp: e => {
        this.setState({
          dragging: null
        });
      },
      onMouseLeave: () => {
        this.setState({
          dragging: null,
          cornerHover: null,
          hover: null
        });
      },
      onMouseMove: e => {
        if (isDragging) {
          if (dragging !== "all") {
            this.props.onPointMove && this.props.onPointMove(e, dragging);
          } else {
            this.props.onAllMove && this.props.onAllMove(e);
          }
        }
      },
      style: {
        position: 'absolute',
        left: 0,
        top: 0
      },
      viewBox: "0 0 500 500",
      xmlns: "http://www.w3.org/2000/svg"
    }, box.length > 1 && !complete && React.createElement("polyline", {
      points: points,
      stroke: color,
      strokeWidth: "3"
    }), complete && React.createElement("polygon", {
      style: {
        zIndex: 6,
        pointerEvents: "auto",
        cursor: "pointer",
        position: "relative"
      },
      onMouseEnter: () => {
        if (isDragging) return;
        this.setState({
          hover: true
        });
      },
      onMouseUp: e => {
        this.setState({
          dragging: null
        });
      },
      onMouseDown: e => {
        this.props.setAnchor(e);
        this.setState({
          dragging: "all"
        });
      },
      onMouseLeave: () => {
        if (isDragging) return;
        this.setState({
          hover: false
        });
      },
      points: points,
      strokeWidth: "2",
      fill: hover ? colorTransparent : 'transparent',
      stroke: color
    }), box.map((b, i) => {
      const active = i === cornerHover && editing;
      const edgeColor = active ? "white" : color;
      const edgeSize = active ? "4" : "3";
      return React.createElement("circle", {
        key: i + 'vis',
        style: {
          zIndex: 7,
          position: "relative"
        },
        r: edgeSize,
        fill: edgeColor,
        cy: b.y,
        cx: b.x
      });
    }), editing && !isDragging && box.map((b, i) => {
      return React.createElement("circle", {
        key: i + 'invis',
        style: {
          cursor: "pointer",
          pointerEvents: "auto",
          zIndex: 7
        },
        onMouseEnter: () => {
          this.setState({
            cornerHover: i
          });
        },
        onMouseUp: e => {
          this.setState({
            dragging: null
          });
        },
        onMouseDown: e => {
          this.setState({
            dragging: i
          });
        },
        onMouseLeave: () => {
          if (isDragging) return;
          this.setState({
            cornerHover: null
          });
        },
        r: "7",
        fill: "transparent",
        cy: b.y,
        cx: b.x
      });
    })));
  }

}

export default Box;