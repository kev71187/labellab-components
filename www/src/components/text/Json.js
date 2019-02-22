import React, { Component } from 'react';
import Labellab from "labellab-components"

class Json extends Component {

  render() {
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">{"<Labellab.Text.Preview>"}</h4>
      </div>
      <div className="card-body">
        <div
          style={{margin: "0 auto", width: "400px"}}
        >
          <Labellab.Text.Preview
            data={{
              example: "json"
            }}
            type="json"
            size={400}
          />
        </div>
        <div 
          style={{marginTop: "15px", marginBottom: "10px"}}
          className="col-12 text-center">Annotated Text</div>
      </div>
    </div>
  }
}

export default Json
