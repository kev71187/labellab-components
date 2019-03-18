import React, { Component } from 'react'
import Bounding from '../bounding/Bounding'
import {convertGeoJsonToGeometry} from "../../utils/geoJson"

export default class extends Component {
  constructor(props) {
    super()
    let state = this.defaultState()

    if (props.labelState && props.labelState.geoJson) {
      const multiPolygons = convertGeoJsonToGeometry(props.labelState.geoJson, props.bounds, props.dimensions)
      state.box = multiPolygons[0][0]
    }

    this.state = state
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.labelState.geoJson !== this.props.labelState.geoJson) {
      const multiPolygons = convertGeoJsonToGeometry(label.state.geoJson, this.props.bounds, this.props.dimensions)
      this.setState({box: multiPolygons[0][0]})
    }
  }

  defaultState() {
    return {
      box: [],
      rotation: 0,
    }
  }

  renderEmpty() {
    const {emptyMessage} = this.props
    const message = emptyMessage || "No file"

    return (
      <div>{emptyMessage}</div>
    )
  }

  undo() {
    this.state.box.pop()
    this.setState({box: this.state.box})
  }

  clear() {
    this.setState(this.defaultState())
  }

  toLabel() {
    return this.state.box
  }

  contextClick(x, y) {
    if (this.complete()) return
    const {box} = this.state
    box.push({x, y})
    this.setState({box: box})
  }

  complete() {
    const { box } = this.state
    if (box.length < 2) return false
    const first = box[0]
    const last = box[box.length - 1]
    return first.x === last.x && first.y === last.y
  }

  onPointMove(point, i) {
    let { box } = this.state
    box[i] = point
    this.setState({box: box})
  }

  onComplete() {
    let {box} = this.state
    box.push(box[0])
    this.setState({box})
    this.props.onComplete(box, "geometry")
  }

  onAllMove(box) {
    this.setState({box})
  }

  cancel() {
  }

  render() {
    const { file, containerStyle, dimensions, size } = this.props
    let cs = containerStyle ? JSON.parse(JSON.stringify(containerStyle)) : {}
    const { box, rotation } = this.state
    cs.width = size + "px"

    return (
      <div className="polygon-labeler">
        <Bounding
          onClear={() => this.clear()}
          onPointMove={(point, i) => {
            this.onPointMove(point, i)
          }}
          onAllMove={(b) => {
            this.onAllMove(b)
          }}
          onComplete={(c) => {
            this.onComplete(c)
          }}
          mouseTracking="tracer"
          box={box}
          size={size}
          dimensions={dimensions}
          rotation={rotation}
          complete={this.complete()}
          file={file}
          onClick={(x,y) => this.contextClick(x, y)}
        >
          { this.props.children }
        </Bounding>
      </div>
    )
  }
}
