import React, { Component } from 'react'
import Geometry from '../bounding/Geometry'

class PolygonLabeler extends Component {
  constructor(props) {
    super()
    let state = this.defaultState()

    if (props.labelState && props.labelState.geometry) {
      state.geometry = props.labelState.geometry
    }

    this.state = state
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.labelState.geometry !== this.props.labelState.geometry) {
      this.setState({geometry: this.props.labelState.geometry})
    }
  }

  defaultState() {
    return {
      geometry: [],
      rotation: 0,
    }
  }

  toLabel() {
    return this.state.geometry
  }

  onChange(geometry, complete) {
    this.setState({geometry})

    // this.props.onChange(geometry)
    if (complete) {
      this.props.onComplete(geometry, "geometry")
    }
  }

  render() {
    const { file, dimensions, size } = this.props
    const { geometry, rotation } = this.state

    const context = {
      size,
      dimensions,
      rotation
    }

    return (
      <div className="polygon-labeler">
        <Geometry
          geometry={geometry}
          context={context}
          onChange={(geometry, complete) => {
            this.onChange(geometry, complete)
          }}>
            { this.props.children }
        </Geometry>
      </div>
    )
  }
}

export default PolygonLabeler
