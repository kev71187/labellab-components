import React, { Component } from 'react'
import styled from 'styled-components'

const Wrapper = styled.svg`
    pointer-events: none;
    polyline {
      pointer-events: none;
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

   return (
      <Wrapper
        style={{ position: 'absolute', zIndex: 3, left: 0, top: 0}}
        viewBox={`0 0 ${size} ${size}`} xmlns="http://www.w3.org/2000/svg">
        <line x1={0} y1={this.state.y} x2={size} y2={this.state.y} stroke={"white"} strokeDasharray="10 4" />
        <line x1={this.state.x} y1={0} x2={this.state.x} y2={size} stroke={"white"} strokeDasharray="10 4" />
      </Wrapper>
    )
  }
}

export default Crosshair
