import React, { Component } from 'react';
import Labellab from "labellab-components"

class Labeler extends Component {
  render() {
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">{"<Labellab.Image.Polygon.Labeler>"}</h4>
      </div>
      <div className="card-body ">
        <Labellab.Image.Polygon.Labeler
          file={{url: "http://www.nba.com/media/history/chamberlain_reb_200.jpg"}}
          containerStyle={{margin: "0 auto"}}
          ref="labeler"
          onComplete={(label) => {
            console.log(JSON.stringify(label))
          }}
        />
        <div onClick={() => {this.refs.labeler.clear()}}
          style={{marginTop: "10px", cursor: "pointer"}} className="btn btn-success">clear</div>
      </div>
    </div>
  }

}

export default Labeler
