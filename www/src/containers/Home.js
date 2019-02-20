import React, { Component } from 'react';
import { connect } from 'react-redux';
import CommonClassifier from "../components/common/Classifier"
import MultiCommonClassifier from "../components/common/MultiClassifier"
import ImageSquareBoxPreview from "../components/image/square_box/Preview"
import ImageSquareBoxLabeler from "../components/image/square_box/Labeler"
import ImagePolygonLabeler from "../components/image/polygon/Labeler"
import ImagePolygonPreview from "../components/image/polygon/Preview"

const contents = [
  {
    type: "Common",
    items: [
      "Labelers.Common.Classifier",
      "Labelers.Common.MultiClassifier",
    ]
  },
  {
    type: "Image",
    items: [
      "Labelers.Image.SquareBox.Labeler",
      "Labelers.Image.Polygon.Labeler",
      "Labelers.Image.Preview",
    ]
  },
  {
    type: "Text",
    items: [
    ]
  }
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
        <div className="row">
          <div className="col-3" style={{paddingRight: 0}}>
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
          <div className="col-9" style={{paddingTop: "15px"}}>
            <h4>Image:</h4>
            <div className="row">
              <h4 style={bigHeader}>Labelers.Common</h4>
            </div>
            <div className="row">
              <div className="col-6">
                <CommonClassifier/>
              </div>
              <div className="col-6">
                <MultiCommonClassifier/>
              </div>
            </div>
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
