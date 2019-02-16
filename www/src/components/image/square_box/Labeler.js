import React, { Component } from 'react';
import Labelers from "labellab-components"

class Labeler extends Component {
  render() {
    return <div>
      <h4 style={{marginBottom: "30px"}}>{"<Labelers.Image.SquareBox.Labeler>"}</h4>
      <Labelers.Image.SquareBox.Labeler
        file={{url: "http://www.nba.com/media/history/chamberlain_reb_200.jpg"}}
        ref="labeler"
        onComplete={(label) => {
          console.log("done", JSON.stringify(label))
        }}
      />
      <div onClick={() => {this.refs.labeler.clear()}} style={{marginTop: "15px"}} className="btn btn-danger">clear</div>
    </div>
  }

}

export default Labeler
