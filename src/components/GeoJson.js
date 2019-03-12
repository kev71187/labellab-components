import React, { Component } from 'react'
import colors from '../constants/colors'
import LabelOverlay from './common/LabelOverlay'
import {
  convertGeoJsonToGeometry
} from '../utils/geoJson'


class GeoJson extends Component {
  constructor(props) {
    super()
    // const points = toXYFromGeoJson(props.labelState.geoJson, props.bounds, props.dimensions)

    this.state = {
      polygon: points
    }
  }

  render() {
    const { } = this.props
    return <div style={{color: "white"}}>
      hi
    </div>
  }
}

export default GeoJson
