import React, { Component } from 'react'
import styled from 'styled-components'

const Title = styled.h4`
  text-transform: capitalize;
  margin-bottom: 15px;
  text-align: center;
`

export default ({ helpText, labelGeometry, fileType }) => {
  let help = `classify this ${fileType}`

  if (labelGeometry === "box") {
    help = `box and ${help}`
  } else if (labelGeometry === "polygon") {
    help = `bound and ${help}`
  }

  if ( helpText) {
    help = helpText
  }

  return <Title>{help}</Title>
}
