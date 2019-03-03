import React, { Component } from 'react'
import styled from 'styled-components'
import colors from "../constants/colors"

const Label = styled.span`
  background-color: ${colors.blue};
  color: #fff;
  padding: 5px;
  border-radius: 2px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
`

export default (props) => {
  const {name, style} = props
  return <Label onClick={() => props.onClick && props.onClick() } style={style}>{name}</Label>
}
