import React, { Component } from 'react'
import colors from '../../constants/colors'
import styled from 'styled-components'
import KeyWatch from '../common/KeyWatch'

const Line = styled.line`
  position: relative;
  pointer-events: auto;
  z-index: 9;
  stroke: transparent;
  &:hover {
    stroke: ${colors.blue};
  }
`

export default class extends Component {
  render() {
    return <Line
      strokeWidth="7"
      {... this.props}
    />
  }
}
