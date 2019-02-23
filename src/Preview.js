import React, { Component } from 'react'
import styled from 'styled-components'

const Labeler = styled.div`
`

class LabelerComponent extends Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    const {size} = this.props
    if (!this.state.x) return null
    const xPosition = {top: this.state.y + 'px'}
    const yPosition = {left: this.state.x + 'px'}

    return (
      <Labeler>
      </Labeler>
    )
  }
}

export default LabelerComponent
