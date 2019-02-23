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
  {id: 50, name: "airplane"},
  {id: 43, name: "automobile"},
  {id: 49, name: "bird"},
  {id: 48, name: "cat"},
  {id: 47, name: "deer"},
  {id: 45, name: "dog"},
  {id: 52, name: "frog"},
  {id: 46, name: "horse"},
  {id: 44, name: "ship"},
  {id: 51, name: "truck"},
]

class Classification extends Component {
  renderLabeler() {
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">{"Plain Text"}</h4>
      </div>
      <div className="card-body">
        <div
          style={{margin: "0 auto", width: "400px"}}
        >
          <Labeler.Labeler
            url="http://www.nba.com/media/history/chamberlain_reb_200.jpg"
            fileType="image"
            labelType="classification"
            previewSize={400}
            labelChoices={labels}
            labels={[]}
            onComplete={(label) => {
              console.log(label)
            }}
          />
        </div>
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
        <div className="col-6">
          {this.renderLabeler()}
        </div>
      </div>
    </div>
  }

}

export default Classification
