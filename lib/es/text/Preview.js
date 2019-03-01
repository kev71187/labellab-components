import React, { Component } from 'react';
import styled from 'styled-components';
const TextBox = styled.pre`
  overflow: scroll;
  height: 100%;

  &:hover {
    cursor: pointer;
    background-color: #f3f3f3;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  &::-webkit-scrollbar-thumb {
    background: lightgrey; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #grey; 
  }
`; // Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background

const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`;

const prettifyXml = sourceXml => {
  var xmlDoc = new DOMParser().parseFromString(sourceXml, 'application/xml');
  var xsltDoc = new DOMParser().parseFromString([// describes how we want to modify the XML - indent everything
  '<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform">', '  <xsl:strip-space elements="*"/>', '  <xsl:template match="para[content-style][not(text())]">', // change to just text() to strip space in text nodes
  '    <xsl:value-of select="normalize-space(.)"/>', '  </xsl:template>', '  <xsl:template match="node()|@*">', '    <xsl:copy><xsl:apply-templates select="node()|@*"/></xsl:copy>', '  </xsl:template>', '  <xsl:output indent="yes"/>', '</xsl:stylesheet>'].join('\n'), 'application/xml');
  var xsltProcessor = new XSLTProcessor();
  xsltProcessor.importStylesheet(xsltDoc);
  var resultDoc = xsltProcessor.transformToDocument(xmlDoc);
  var resultXml = new XMLSerializer().serializeToString(resultDoc);
  return resultXml;
};

class Preview extends Component {
  constructor(props) {
    super();
    this.state = {
      contents: props.data || null
    };
  }

  componentDidMount() {
    const {
      file,
      type,
      size,
      json
    } = this.props;

    if (!this.state.contents) {
      fetch(file.url).then(resp => {
        if (type === "json") {
          resp.json().then(json => {
            this.setState({
              contents: json
            });
          });
        } else {
          resp.text().then(text => {
            this.setState({
              contents: text
            });
          });
        }
      });
    }
  }

  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e);
    }
  }

  render() {
    const {
      file,
      size,
      type,
      data
    } = this.props;
    const {
      contents
    } = this.state;
    if (!file && !data) return null;
    const style = {
      width: size + 'px',
      height: size + 'px',
      position: 'relative',
      zIndex: 1
    };
    let out = "";

    if (contents) {
      switch (type) {
        case "json":
          out = JSON.stringify(contents, null, 2);
          break;

        case "xml":
          out = prettifyXml(contents);
          break;

        default:
          out = contents;
          break;
      }
    }

    return React.createElement("div", {
      className: "ll-text",
      style: style,
      onClick: e => this.onClick(e)
    }, React.createElement(TextBox, null, out));
  }

}

export default Preview;