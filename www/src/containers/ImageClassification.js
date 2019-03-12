import React, { Component } from 'react';
import Display from "../components/Display"
import Labeler from "../components/image/Labeler"
import items from '../assets/imageData.js'
const {labelGeometry, labelType, labelChoices, url, exampleLabels} = items.classification

export default class extends Component {
  render() {
    return <Display>
      <Labeler
        labelGeometry={labelGeometry}
        labelType={labelType}
        labelChoices={labelChoices}
        exampleLabels={exampleLabels}
        url={url}
      />
    </Display>
  }
}

