import React, { Component } from 'react'
import styled from 'styled-components'
import colors from "../constants/colors"

const Label = styled.div`
  background-color: ${colors.blue};
  color: #fff;
  padding: 1px 5px;
  borderRadius: 2px;
  position: absolute;
  top: 5px;
  left: 5px;
`

export default (props) => {
  const {name} = props
  return <Label>{name}</Label>
}
