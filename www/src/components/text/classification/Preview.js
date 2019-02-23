import React, { Component } from 'react';
import Labellab from "labellab-components"

class Preview extends Component {

  render() {
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">{"Plain Text"}</h4>
      </div>
      <div className="card-body">
        <div
          style={{margin: "0 auto", width: "400px"}}
        >
          <Labellab.Text.Preview
            file={{url: "https://s3.amazonaws.com/labellab/t.txt"}}
            size={400}
          />
        </div>
        <div 
          style={{marginTop: "15px", marginBottom: "10px"}}
          className="col-12 text-center">Plain Text</div>
      </div>
    </div>
  }

}

export default Preview
