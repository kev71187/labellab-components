import React, { Component } from 'react'
import styled from 'styled-components'

const Cross = styled.div`
    pointer-events: none;

    .x-crosshair {
      pointer-events: none;
      position: absolute;
      right 0;
      z-index: 20;
      height: 1px;
      width: 100%;
      border: 1px dashed grey;
    }

    .y-crosshair {
      pointer-events: none;
      position: absolute;
      right: 0;
      z-index: 20;
      height: 100%;
      border: 1px dashed grey
    }
`

class Crosshair extends Component {
  constructor() {
    super()
    this.state = this.defaultState()
  }
  defaultState() {
    return {
      x: 0,
      y: 0
    }
  }
  onMouseMove(mouse) {
    if (mouse) {
      this.setState(mouse)
    } else {
      this.setState(this.defaultState())
    }
  }

  render() {
    const {size} = this.props
    if (!this.state.x) return null
    const xPosition = {top: this.state.y + 'px'}
    const yPosition = {left: this.state.x + 'px'}

    return (
      <Cross>
        <div className="x-crosshair" style={xPosition}></div>
        <div className="y-crosshair" style={yPosition}></div>
      </Cross>
    )
  }
}

export default Crosshair

