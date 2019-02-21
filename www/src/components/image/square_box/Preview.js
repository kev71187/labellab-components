import React, { Component } from 'react';
import Labellab from "labellab-components"

const labels = [
  {
    "name": "head",
    "state":[{"x":77.5,"y":81.6},{"x":98.49999999999999,"y":81.6},{"x":98.49999999999999,"y":108.6},{"x":77.5,"y":108.6}],"type":"SquareBoxAnnotation","options":{"dimensions":{"width":200,"height":300}}
  },
  {
    "name": "head",
    "state":[{"x":30.699999999999992,"y":134.4},{"x":52.89999999999999,"y":134.4},{"x":52.89999999999999,"y":160.79999999999998},{"x":30.699999999999992,"y":160.79999999999998}],"type":"SquareBoxAnnotation","options":{"dimensions":{"width":200,"height":300}}
  },
  {
    "name": "head",
    "state":[{"x":72.69999999999999,"y":213},{"x":87.1,"y":213},{"x":87.1,"y":232.79999999999998},{"x":72.69999999999999,"y":232.79999999999998}],"type":"SquareBoxAnnotation","options":{"dimensions":{"width":200,"height":300}}
  },
  {
    "name": "head",
    "state":[{"x":98.49999999999999,"y":160.79999999999998},{"x":115.29999999999998,"y":160.79999999999998},{"x":115.29999999999998,"y":187.2},{"x":98.49999999999999,"y":187.2}],"type":"SquareBoxAnnotation","options":{"dimensions":{"width":200,"height":300}}
  },
  {
    "name": "head",
    "state":[{"x":180.09999999999997,"y":204.6},{"x":195.69999999999996,"y":204.6},{"x":195.69999999999996,"y":224.39999999999998},{"x":180.09999999999997,"y":224.39999999999998}],"type":"SquareBoxAnnotation","options":{"dimensions":{"width":200,"height":300}}
  }
]

class Preview extends Component {
  render() {
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">{"<Labellab.Image.Preview>"}</h4>
      </div>
      <div className="card-body">
        <div
          style={{margin: "0 auto", width: "400px"}}
        >
          <Labellab.Image.Preview
            file={{url: "http://www.nba.com/media/history/chamberlain_reb_200.jpg"}}
            hideLabels={false}
            size={400}
            labels={labels}
          />
        </div>
        <div 
          style={{marginTop: "15px", marginBottom: "10px"}}
          className="col-12 text-center">Annotated image</div>
      </div>
    </div>
  }

}

export default Preview
