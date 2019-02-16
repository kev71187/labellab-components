import React, { Component } from 'react';
import Labelers from "labellab-components"

const labels = [
  {
    "state": [
      {"x":212,"y":135},{"x":248,"y":135},{"x":248,"y":179},{"x":212,"y":179}
    ],
    "name": {
        "id": 1,
        "name": "head"
    },
    "reviewed": null,
    "type": "BoxAnnotation",
    "options": {
        "viewSize": 500
    },
  },
  {
    "state": [
      {"x":245,"y":269},{"x":277,"y":269},{"x":277,"y":309},{"x":245,"y":309}
    ],
    "name": {
        "id": 1,
        "name": "head"
    },
    "reviewed": null,
    "type": "BoxAnnotation",
    "options": {
        "viewSize": 500
    },
  },
  {
    "state": [
      {"x":132,"y":225},{"x":166,"y":225},{"x":166,"y":264},{"x":132,"y":264}
    ],
    "name": {
        "id": 1,
        "name": "head"
    },
    "reviewed": null,
    "type": "BoxAnnotation",
    "options": {
        "viewSize": 500
    },
  },
  {"state":[{"x":383,"y":342},{"x":408,"y":342},{"x":408,"y":372},{"x":383,"y":372}],"name":{"id":1,"name":"head"},"reviewed":null,"type":"BoxAnnotation","options":{"viewSize":500}},
  {"state":[{"x":203,"y":353},{"x":230,"y":353},{"x":230,"y":380},{"x":203,"y":380}],"name":{"id":1,"name":"head"},"reviewed":null,"type":"BoxAnnotation","options":{"viewSize":500}}
]

class Preview extends Component {

  render() {
    return <div>
      <h4 style={{marginBottom: "30px"}}>{"<Labelers.Image.Preview>"}</h4>
      <Labelers.Image.Preview
        file={{url: "http://www.nba.com/media/history/chamberlain_reb_200.jpg"}}
        hideLabels={false}
        size={500}
        labels={labels}
      />
    </div>
  }

}

export default Preview
