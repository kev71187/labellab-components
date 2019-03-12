import React, { Component } from 'react'
import styled from 'styled-components'

const Main = styled.div`
  margin: 0 auto;
  @media (max-width: 986px) {
    .ll-image-view {
      margin: 0 auto;
    }
  }
`

class Default extends Component {
  render() {
    return (
      <Main>
        {this.props.children}
      </Main>
    )
  }
}

export default Default
