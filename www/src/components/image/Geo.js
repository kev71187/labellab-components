import React, { Component } from 'react';
import {Labeler, Preview} from "../../labellab-components"
import styled from 'styled-components'
import geoData from "./geoData.json"
import image from '../../assets/santabarbarasat.jpeg'

// const url = "https://s3.amazonaws.com/labellab/santabarbarasat.jpeg"
const b = geoData.bounds.coordinates[0]
const bounds = {
  minLng: Math.min(...b.map((p) => p[0])),
  minLat: Math.min(...b.map((p) => p[1])),
  maxLng: Math.max(...b.map((p) => p[0])),
  maxLat: Math.max(...b.map((p) => p[1])),
}
const label = {
  labelType: "none",
  labelGeometry: "geoJson",
  label: "Santa Barbara County",
  options:{
    dimensions: {"width":1000,"height":1000},
    bounds,
  },
  state: {
    geoJson: geoData.county.geometry
  }
}

export default class extends Component {
  render() {
    return <div>
      <Labeler
        url={image}
        fileType="image"
        labelType={"classification"}
        labelGeometry={"geoJson"}
        previewSize={600}
        labelChoices={["Santa Barbara County"]}
        labels={[label]}
        fileBounds={bounds}
        onComplete={(labels) => {
          const { savedLabels } = this.state
          savedLabels[i] = labels
          this.setState({savedLabels})
          console.log(labels)
        }}
        onReject={() => {
          console.log("File has been rejected")
        }}
      />
      <hr/>
      <Preview
        size={500}
        url={image}
        fileType="image"
        labels={[label]}
      />
    </div>
  }
}

