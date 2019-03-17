import React, { Component } from 'react'
import Bounding from '../common/Bounding'

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

  renderEmpty() {
    const {emptyMessage} = this.props
    const message = emptyMessage || "No file"

    return (
      <div>{emptyMessage}</div>
    )
  }

  undo() {
    this.state.geometry.pop()
    this.setState({geometry: this.state.geometry})
  }

  clear() {
    this.setState(this.defaultState())
  }

  toLabel() {
    return this.state.geometry
  }

  onInsert(i, xy) {
    const {geometry} = this.state
    geometry.splice(i,0, xy)
    this.setState({geometry: geometry})
  }

  contextClick(x, y) {
    if (this.complete()) return
    const {geometry} = this.state
    geometry.push({x, y})
    this.setState({geometry: geometry})
  }

  complete() {
    const { geometry } = this.state
    if (geometry.length < 2) return false
    const first = geometry[0]
    const last = geometry[geometry.length - 1]
    return first.x === last.x && first.y === last.y
  }

  onPointMove(point, i) {
    let { geometry } = this.state
    geometry[i] = point
    this.setState({geometry: geometry})
  }

  onComplete() {
    let {geometry} = this.state
    geometry.push(geometry[0])
    this.setState({geometry})
    this.props.onComplete(geometry, "geometry")
  }

  onAllMove(geometry) {
    this.setState({geometry})
  }

  cancel() {
  }

  render() {
    const { file, containerStyle, dimensions, size } = this.props
    let cs = containerStyle ? JSON.parse(JSON.stringify(containerStyle)) : {}
    const { geometry, rotation } = this.state
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
          onInsert={(i, xy) => {
            this.onInsert(i, xy)
          }}
          mouseTracking="tracer"
          box={geometry}
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

export default PolygonLabeler
