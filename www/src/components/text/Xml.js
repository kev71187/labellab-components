import React, { Component } from 'react';
import Labellab from "labellab-components"

const example = `
  <root>
    <test><nested>
      <withsome-strange-formatting>wow this is awesome content here!!!!</withsome-strange-formatting>
      <wow><cool><yep>text</yep></cool></wow>
    </nested></test>
  </root>
`
class Json extends Component {

  render() {
    return <div className="card">
      <div className="card-header">
        <h4 className="text-center">{"XML"}</h4>
      </div>
      <div className="card-body">
        <div
          style={{margin: "0 auto", width: "400px"}}
        >
          <Labellab.Text.Preview
            data={example}
            type="xml"
            size={400}
          />
        </div>
        <div 
          style={{marginTop: "15px", marginBottom: "10px"}}
          className="col-12 text-center">XML Text</div>
      </div>
    </div>
  }
}

export default Json
