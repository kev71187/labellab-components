import React, { Component } from 'react';
import Labeler from "labellab-components"
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
  renderLabeler() {
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">{"Box Classification"}</h4>
      </div>
      <div className="card-body">
          <Labeler.Labeler
            url="http://www.nba.com/media/history/chamberlain_reb_200.jpg"
            fileType="image"
            labelType="classification"
            labelGeometry="box"
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
          {this.renderLabeler()}
        </div>
      </div>
    </div>
  }

}

export default Classification
