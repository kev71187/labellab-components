import React, { Component } from 'react';
import { connect } from 'react-redux';
import TextClassificationLabeler from "../components/text/classification/Labeler"
import TextJsonPreview from "../components/text/Json"
import TextXmlPreview from "../components/text/Xml"
import TextClassificationPreview from "../components/text/classification/Preview"
import CommonClassifier from "../components/common/Classifier"
import MultiCommonClassifier from "../components/common/MultiClassifier"
import ImageSquareBoxPreview from "../components/image/square_box/Preview"
import ImageSquareBoxLabeler from "../components/image/square_box/Labeler"
import ImagePolygonLabeler from "../components/image/polygon/Labeler"
import ImagePolygonPreview from "../components/image/polygon/Preview"
import ImageClassification from "../components/image/Classification"

const contents = [
  {
    type: "Image",
    items: [
      "Labellab.Image.SquareBox",
      "Labellab.Image.Polygon",
      "Labellab.Image.Classification",
    ]
  },
  {
    type: "Text",
    items: [
      "Labellab.Text.Classification",
    ]
  },
  {
    type: "Common",
    items: [
      "Labellab.Common.Classifier",
      "Labellab.Common.MultiClassifier",
      "Labellab.Common.Preview",
    ]
  },
]
const blue = "#007bff"
const bigHeader = {
  backgroundColor: blue,
  color: "white", width: "100%",
  textAlign: "center",
  padding: "10px",
  marginTop: "30px"
}
class Home extends Component {
  render() {
    return <div>
      <nav className="navbar navbar-dark" style={{backgroundColor: blue}}>
        <a className="navbar-brand" href="#">
          <img
            style={{width: "40px", height: "40px"}}
            src="https://d1d09e79yja1m6.cloudfront.net/annotation-web/build/static/media/logo-over-dark.72869e75.png"/>
          <span style={{marginLeft: "10px", verticalAlign: "middle"}}>
            Labellab Developer Components
          </span>
        </a>
      </nav>
      <div className="container-fluid" style={{borderLeft: "1px solid lightgrey", borderRight: "1px solid lightgrey"}}>
        <div style={{display: "flex", flexDirection: "row", paddingLeft: "15px", paddingRight: "15px"}}>
          <div style={{paddingRight: 0, width: "300px"}}>
            <div style={{borderRight: "1px solid lightgrey", height: "100%", paddingTop: "15px"}}>
              <h4>Components</h4>
              {
                contents.map((content, idx) => {
                  return <div key={idx}>
                    <div>
                      {content.type}
                    </div>
                    {
                      content.items.map((comp) => {
                        return <div className="btn btn-link" key={comp}>
                          {comp}
                        </div>
                      })
                    }
                  </div>
                })
              }
            </div>
          </div>
          <div className="container-fluid" style={{marginLeft: "15px", paddingTop: "15px", flex: 1}}>
            <ImageClassification/>
            <h4>Image:</h4>
            <div className="row">
              <h4 style={bigHeader}>Labelers.Image.SquareBox</h4>
            </div>
            <div className="row">
              <div className="col-6">
                <ImageSquareBoxLabeler/>
              </div>
              <div className="col-6">
                  <ImageSquareBoxPreview/>
              </div>
            </div>
            <div className="row">
              <h4 style={bigHeader}>Labelers.Image.Polygon</h4>
            </div>
            <div className="row">
              <div className="col-6">
                <ImagePolygonLabeler/>
              </div>
              <div className="col-6">
                <ImagePolygonPreview/>
              </div>
            </div>
            <h4>Text:</h4>
            <div className="row">
              <h4 style={bigHeader}>Labelers.Text.Classification</h4>
            </div>
            <div className="row">
              <div className="col-6">
                <TextClassificationPreview/>
              </div>
              <div className="col-6">
                <TextJsonPreview/>
              </div>
              <div className="col-6">
                <TextXmlPreview/>
              </div>
            </div>
            <div className="row">
              <h4 style={bigHeader}>Labelers.Common</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  }

}

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, {
})(Home);
