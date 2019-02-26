import React, { Component } from 'react';
import {Labeler, Preview} from "labellab-components"
const blue = "#007bff"

const bigHeader = {
  backgroundColor: blue,
  color: "white", width: "100%",
  textAlign: "center",
  padding: "10px",
  marginTop: "30px"
}
const state = [
  {
    url: "https://www.hakaimagazine.com/wp-content/uploads/header-bald-eagle-nests.jpg",
    labelChoices: ["bug", "whale", "bird", "dog", "cat", "human"],
    labelGeometry: "none",
    labelType: "classification",
    exampleLabels: [{"labelType":"classification","labelGeometry":"none","label":"bird","options":{"dimensions":{"width":2500,"height":1201}},"state":{}}]
  },
  {
    url: "http://www.nba.com/media/history/chamberlain_reb_200.jpg",
    labelChoices: ["basketball", "head", "foot", "arm", "body"],
    labelGeometry: "box",
    labelType: "classification",
    exampleLabels: [{"labelType":"classification","labelGeometry":"box","label":"head","options":{"dimensions":{"width":200,"height":300}},"state":{"geometry":[{"x":75.5,"y":80.5},{"x":98.5,"y":80.5},{"x":98.5,"y":105.5},{"x":75.5,"y":105.5}]}},{"labelType":"classification","labelGeometry":"box","label":"head","options":{"dimensions":{"width":200,"height":300}},"state":{"geometry":[{"x":29.5,"y":135.5},{"x":50.5,"y":135.5},{"x":50.5,"y":160.5},{"x":29.5,"y":160.5}]}},{"labelType":"classification","labelGeometry":"box","label":"head","options":{"dimensions":{"width":200,"height":300}},"state":{"geometry":[{"x":98,"y":161},{"x":113.5,"y":161},{"x":113.5,"y":185},{"x":98,"y":185}]}},{"labelType":"classification","labelGeometry":"box","label":"head","options":{"dimensions":{"width":200,"height":300}},"state":{"geometry":[{"x":179.5,"y":205},{"x":195.5,"y":205},{"x":195.5,"y":224},{"x":179.5,"y":224}]}},{"labelType":"classification","labelGeometry":"box","label":"head","options":{"dimensions":{"width":200,"height":300}},"state":{"geometry":[{"x":73,"y":214},{"x":87,"y":214},{"x":87,"y":231},{"x":73,"y":231}]}},{"labelType":"classification","labelGeometry":"box","label":"basketball","options":{"dimensions":{"width":200,"height":300}},"state":{"geometry":[{"x":96.5,"y":7.5},{"x":128,"y":7.5},{"x":128,"y":36.5},{"x":96.5,"y":36.5}]}}]
  },
  {
    url: "https://images.pond5.com/girl-driving-motorcycles-first-person-footage-084718933_prevstill.jpeg",
    labelChoices: ["car", "motorcycle", "road", "person", "body", "stopped", "outbound", "inbound"],
    labelGeometry: "polygon",
    labelType: "classification",
    exampleLabels: [{"labelType":"classification","labelGeometry":"polygon","label":"motorcycle","options":{"dimensions":{"width":1920,"height":1080}},"state":{"geometry":[{"x":905.6,"y":492},{"x":880,"y":540},{"x":902.4,"y":591.2},{"x":934.4,"y":591.2},{"x":934.4,"y":536.8}]}},{"labelType":"classification","labelGeometry":"polygon","label":"car","options":{"dimensions":{"width":1920,"height":1080}},"state":{"geometry":[{"x":1219.2,"y":703.2},{"x":1216,"y":594.4},{"x":1388.8,"y":444},{"x":1616,"y":412},{"x":1910.4,"y":472.8},{"x":1913.6,"y":904.8},{"x":1779.2,"y":920.8},{"x":1648,"y":892},{"x":1561.6,"y":930.4}]}},{"labelType":"classification","labelGeometry":"polygon","label":"car","options":{"dimensions":{"width":1920,"height":1080}},"state":{"geometry":[{"x":393.59999999999997,"y":568.8},{"x":415.99999999999994,"y":498.4},{"x":512,"y":495.2},{"x":576,"y":543.2},{"x":572.8,"y":581.6}]}},{"labelType":"classification","labelGeometry":"polygon","label":"motorcycle","options":{"dimensions":{"width":1920,"height":1080}},"state":{"geometry":[{"x":217.6,"y":527.2},{"x":281.6,"y":543.2},{"x":297.6,"y":501.6},{"x":336,"y":604},{"x":288,"y":623.2},{"x":230.4,"y":597.6}]}},{"labelType":"classification","labelGeometry":"polygon","label":"car","options":{"dimensions":{"width":1920,"height":1080}},"state":{"geometry":[{"x":976,"y":511.2},{"x":976,"y":552.8},{"x":1036.8,"y":556},{"x":1027.2,"y":501.6}]}},{"labelType":"classification","labelGeometry":"polygon","label":"car","options":{"dimensions":{"width":1920,"height":1080}},"state":{"geometry":[{"x":1017.6,"y":479.2},{"x":1075.2,"y":476},{"x":1081.6,"y":549.6},{"x":1040,"y":549.6}]}},{"labelType":"classification","labelGeometry":"polygon","label":"car","options":{"dimensions":{"width":1920,"height":1080}},"state":{"geometry":[{"x":646.4,"y":600.8},{"x":646.4,"y":533.6},{"x":672,"y":482.4},{"x":726.4,"y":485.6},{"x":752,"y":546.4},{"x":742.4,"y":607.2}]}},{"labelType":"classification","labelGeometry":"polygon","label":"motorcycle","options":{"dimensions":{"width":1920,"height":1080}},"state":{"geometry":[{"x":441.6,"y":764},{"x":544,"y":722.4},{"x":649.6,"y":722.4},{"x":937.6,"y":616.8},{"x":1222.4,"y":716},{"x":1308.8,"y":725.6},{"x":1395.2,"y":757.6},{"x":1446.4,"y":658.4},{"x":1590.4,"y":556},{"x":1632,"y":402.4},{"x":1795.2,"y":357.6},{"x":1872,"y":463.2},{"x":1814.4,"y":578.4},{"x":1731.2,"y":607.2},{"x":1612.8,"y":613.6},{"x":1465.6,"y":709.6},{"x":1462.4,"y":773.6},{"x":1516.8,"y":824.8},{"x":1523.2,"y":930.4},{"x":1568,"y":994.4},{"x":1571.2,"y":1071.2},{"x":275.2,"y":1068},{"x":275.2,"y":1004},{"x":320,"y":981.6},{"x":297.6,"y":850.4},{"x":380.8,"y":802.4},{"x":358.4,"y":712.8},{"x":195.2,"y":613.6},{"x":9.6,"y":658.4},{"x":3.2,"y":412},{"x":99.2,"y":389.6},{"x":182.4,"y":456.8},{"x":227.2,"y":575.2},{"x":412.8,"y":700}]}}]
  },
]

class Classification extends Component {
  renderLabeler(item) {
    const {labelGeometry, labelType, labelChoices, url} = item
    return <div className="card" style={{marginBottom: "30px"}}>
      <div className="card-body">
          <Labeler
            key="some-unique-key-for-the-file"
            url={url}
            fileType="image"
            labelType={labelType}
            labelGeometry={labelGeometry}
            previewSize={600}
            labelChoices={labelChoices}
            labels={[]}
            onComplete={(labels) => {
              console.log(labels)
            }}
          />
          <hr/>
          <pre>
            {`
  <Labeler
    key="some-unique-key-for-the-file"
    url="${url}"
    fileType="image"
    labelType="${labelType}"
    labelGeometry="${labelGeometry}"
    previewSize={450}
    labelChoices={["${labelChoices.join('","')}"]}
    labels={[]}
    onComplete={(labels) => {
      console.log(labels)
    }}
  />`
            }
          </pre>
          <hr/>
          <h4 style={{textAlign: "center"}}>Preview</h4>
          <Preview
            size={300}
            url={url}
            fileType="image"
            labels={item.exampleLabels}
          />
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
          { state.map((item, i) => {
            return <div key={i}>
              { this.renderLabeler(item)}
            </div>
            })
          }
        </div>
      </div>
    </div>
  }

}

export default Classification
