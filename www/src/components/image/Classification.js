import React, { Component } from 'react';
import {Labeler} from "labellab-components"
const blue = "#007bff"

const bigHeader = {
  backgroundColor: blue,
  color: "white", width: "100%",
  textAlign: "center",
  padding: "10px",
  marginTop: "30px"
}
const state = [
  {
    url: "https://www.hakaimagazine.com/wp-content/uploads/header-bald-eagle-nests.jpg",
    labelChoices: ["bug", "whale", "bird", "dog", "cat", "human"],
    labelGeometry: "none",
    labelType: "classification",
  },
  {
    url: "http://www.nba.com/media/history/chamberlain_reb_200.jpg",
    labelChoices: ["basketball", "head", "foot", "arm", "body"],
    labelGeometry: "box",
    labelType: "classification",
  },
  {
    url: "https://images.pond5.com/girl-driving-motorcycles-first-person-footage-084718933_prevstill.jpeg",
    labelChoices: ["car", "motorcycle", "road", "person", "body", "stopped", "outbound", "inbound"],
    labelGeometry: "polygon",
    labelType: "classification",
  },
]

class Classification extends Component {
  renderLabeler(item) {
    const {labelGeometry, labelType, labelChoices, url} = item
    return <div className="card" style={{marginBottom: "30px"}}>
      <div className="card-body">
          <Labeler
            key="some-unique-key-for-the-file"
            url={url}
            fileType="image"
            labelType={labelType}
            labelGeometry={labelGeometry}
            previewSize={600}
            labelChoices={labelChoices}
            labels={[]}
            onComplete={(labels) => {
              console.log(labels)
            }}
          />
          <hr/>
          <pre>
            {`
  <Labeler
    key="some-unique-key-for-the-file"
    url="${url}"
    fileType="image"
    labelType="${labelType}"
    labelGeometry="${labelGeometry}"
    previewSize={450}
    labelChoices={["${labelChoices.join('","')}"]}
    labels={[]}
    onComplete={(labels) => {
      console.log(labels)
    }}
  />`
            }
          </pre>
      </div>
    </div>
  }
  render() {
   return  <div>
      <div className="row">
        <h4 style={bigHeader}>Image Classification Labeler</h4>
      </div>
      <div className="row">
        <div className="col-12">
          { state.map((item, i) => {
            return <div key={i}>
              { this.renderLabeler(item)}
            </div>
            })
          }
        </div>
      </div>
    </div>
  }

}

export default Classification
