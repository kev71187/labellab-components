import React, { Component } from 'react';
import Labellab from "labellab-components"

const labels = [
  {id: 50,  name: "airplane"},
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

class MultiClassifier extends Component {
  render() {
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">{"<Labellab.Common.MultiClassifier>"}</h4>
      </div>
      <div className="card-body ">
        <Labellab.Common.MultiClassifier
          onComplete={(selected) => {
            console.log(selected)
          }}
          onSelect={(val) => {
            console.log(val)
          }}
          labels={labels}
        />
      </div>
    </div>
  }

}

export default MultiClassifier
