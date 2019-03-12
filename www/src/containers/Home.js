import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled from 'styled-components'
import ImageClassification from "../components/image/Classification"
import {Version} from "../labellab-components"
class Home extends Component {
  render() {
    return <div id="image">
      <ImageClassification/>
    </div>
  }

}

const mapStateToProps = (state, props) => {
  return {}
}

export default connect(mapStateToProps, {
})(Home);
