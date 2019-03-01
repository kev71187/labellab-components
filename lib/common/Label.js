import React, { Component } from 'react';
import styled from 'styled-components';
import colors from "../constants/colors";
const Label = styled.span`
  background-color: ${colors.blue};
  color: #fff;
  padding: 5px;
  border-radius: 2px;
`;
export default (props => {
  const {
    name,
    style
  } = props;
  return React.createElement(Label, {
    style: style
  }, name);
});