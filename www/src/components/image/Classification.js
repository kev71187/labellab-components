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
const labels = [
  "airplane",
  "automobile",
  "bird",
  "cat",
  "deer",
  "dog",
  "frog",
  "horse",
  "ship",
  "truck",
]

class Classification extends Component {
  renderLabeler(labelType, labelGeometry) {
    const url = "http://www.nba.com/media/history/chamberlain_reb_200.jpg"
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">Image {labelType} {labelGeometry}</h4>
      </div>
      <div className="card-body">
          <Labeler
            url={url}
            fileType="image"
            labelType={labelType}
            labelGeometry={labelGeometry}
            previewSize={400}
            labelChoices={labels}
            labels={[]}
            onComplete={(label) => {
              console.log(label)
            }}
          />
        <div
          style={{marginTop: "15px", marginBottom: "10px"}}
          className="col-12 text-center">Image Classification</div>
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
          {
            this.renderLabeler("classification", "none")
          }
          {
            this.renderLabeler("classification", "box")
          }
          {
            this.renderLabeler("classification", "polygon")
          }
        </div>
      </div>
    </div>
  }

}

export default Classification
