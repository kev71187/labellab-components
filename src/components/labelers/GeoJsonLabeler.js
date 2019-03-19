import React, { Component } from 'react'
import Bounding from '../bounding/Bounding'
import {convertGeoJsonToGeometry} from "../../utils/geoJson"
import Geometry from '../bounding/Geometry'
import PolygonLabeler from './PolygonLabeler'

export default class extends PolygonLabeler {
  constructor(props) {
    super(props)
    let state = this.defaultState()

    if (props.labelState && props.labelState.geoJson) {
      const multiPolygons = convertGeoJsonToGeometry(props.labelState.geoJson, props.bounds, props.dimensions)
      state.geometry = multiPolygons[0][0]
    }

    this.state = state
  }

  defaultState() {
    return {
      geometry: [],
      rotation: 0,
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.labelState.geoJson !== this.props.labelState.geoJson) {
      const multiPolygons = convertGeoJsonToGeometry(label.state.geoJson, this.props.bounds, this.props.dimensions)
      this.setState({geometry: multiPolygons[0][0]})
    }
  }
}
