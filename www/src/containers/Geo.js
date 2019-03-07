import React, { Component } from 'react';
import {Labeler, Preview} from "../labellab-components"
import styled from 'styled-components'
import geoData from "./geoData.json"

export default class extends Component {
  render() {
   return <div className="row">
        <div className="col-12">
          <Preview
            size={300}
            url={"https://s3.amazonaws.com/labellab/santabarbarasat.jpeg"}
            fileType="image"
            labels={[label]}
          />
      </div>
    </div>
  }
}

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
  label: "Santa Barbara",
  options:{
    dimensions: {"width":1000,"height":1000},
    bounds,
  },
  state: {
    geoJson: geoData.county.geometry
  }
}
