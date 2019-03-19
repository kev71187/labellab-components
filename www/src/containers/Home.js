import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import ImageClassification from "../containers/ImageClassification"
import ImageBox from "../containers/ImageBox"
import ImagePolygon from "../containers/ImagePolygon"
import {Version} from "../labellab-components"
class Home extends Component {
  render() {
    return <div id="image">
      <ImageClassification/>
      <div style={{marginTop: "15px"}}/>
      <ImageBox/>
      <div style={{marginTop: "15px"}}/>
      <ImagePolygon/>
    </div>
  }

}

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, {
})(Home);
