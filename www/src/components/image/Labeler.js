import React, { Component } from 'react';
import {Labeler, Preview} from "../../labellab-components"
import ReactJson from 'react-json-view'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight as dark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import styled from 'styled-components'

const ClassificationDiv = styled.div`
  hr {
    margin: 20px 0;
  }
`

const blue = "#007bff"

const bigHeader = {
  backgroundColor: blue,
  color: "white", width: "100%",
  textAlign: "center",
  padding: "10px",
  marginTop: "30px"
}

export default class extends Component {
  constructor() {
    super()
    this.state = {
      savedLabels: []
    }
  }
  render() {
    const {labelGeometry, labelType, labelChoices, labelMetadata, url, exampleLabels} = this.props
    const currentLabels = this.state.savedLabels
    return <ClassificationDiv id={`image-${labelType}-${labelGeometry}`}>
          <Labeler
            url={url}
            fileType="image"
            labelType={labelType}
            labelGeometry={labelGeometry}
            previewSize={600}
            labelChoices={labelChoices}
            labels={exampleLabels}
            labelMetadata={labelMetadata}
            onSave={(label) => {
              console.log("save", label)
            }}
            onRemove={(label) => {
              console.log("remove", label)
            }}
            onComplete={(labels) => {
              const { savedLabels } = this.state
              this.setState({savedLabels: labels})
              console.log(labels)
            }}
            onReject={() => {
              console.log("File has been rejected")
            }}
          />
            { currentLabels.length > 0 &&
            <div>
              <h4 style={{textAlign: "left"}}>Label Output</h4>
              <hr/>
              <ReactJson
                name="labels"
                key={JSON.stringify(currentLabels.length)}
                displayDataTypes={false}
                displayObjectSize={false}
                indentWidth={2}
                sortKeys={true}
                enableClipboard={false}
                src={currentLabels}/>
            </div>
          }
          <h4 style={{textAlign: "left", marginTop: "60px"}}>Previously Labeled Preview</h4>
          <hr/>
            <Preview
              size={300}
              url={url}
              fileType="image"
              labels={exampleLabels}
            />
          <h4 style={{textAlign: "left", marginTop: "60px"}}>Example Usage</h4>
          <hr/>
          <SyntaxHighlighter language="javascript" style={dark}>
            {`
  <Labeler
    url="${url}"
    fileType="image"
    labelType="${labelType}"
    labelGeometry="${labelGeometry}"
    previewSize={600}
    labelChoices={["${labelChoices.join('","')}"]}
    labelMetadata={${JSON.stringify(labelMetadata)}}
    labels={[]}
    onComplete={(labels) => {
      console.log(labels)
    }}
    onReject={() => {
      console.log("File has been rejected")
    }}
  />`
            }
          </SyntaxHighlighter>
    </ClassificationDiv>
  }
}
