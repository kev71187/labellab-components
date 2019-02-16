import React, { Component } from 'react';
import { connect } from 'react-redux';
import ImagePreview from "../components/image/Preview"
import ImageSquareBoxLabeler from "../components/image/square_box/Labeler"
import ImagePolygonLabeler from "../components/image/polygon/Labeler"

const contents = [
  {
    type: "Image",
    items: [
      "Labelers.Image.SquareBox.Labeler",
      "Labelers.Image.Preview",
    ]
  },
  {
    type: "Text",
    items: [
    ]
  }
]
class Home extends Component {
  render() {
    return <div>
      <nav className="navbar navbar-dark" style={{backgroundColor: "#007bff"}}>
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
          <div className="col-3">
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
          <div className="col-7" style={{paddingTop: "15px"}}>
            <h4>Image:</h4>
            <ImageSquareBoxLabeler/>
            <hr style={{marginTop: "40px", marginBottom: "40px"}}/>
            <ImagePreview/>
            <hr style={{marginTop: "40px", marginBottom: "40px"}}/>
            <ImagePolygonLabeler/>
            <hr style={{marginTop: "40px", marginBottom: "40px"}}/>
            <ImagePreview/>
          </div>
          <div className="col-2">
            <div style={{borderLeft: "1px solid lightgrey", height: "100%", paddingTop: "15px"}}>
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
