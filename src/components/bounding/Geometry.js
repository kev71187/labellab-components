import React, { Component } from 'react'
import Bounding from '../bounding/Bounding'

export default class extends Component {
  constructor(props) {
    super()
    let state = this.defaultState()
  }

  defaultState() {
    return {
      active: 0,
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
    // this.state.geometry.pop()
    // this.setState({geometry: this.state.geometry})
  }

  clear() {
    // this.setState(this.defaultState())
  }

  toLabel() {
    // return this.state.geometry
  }

  onInsert(i, xy) {
    const {geometry} = this.props
    geometry.splice(i,0, xy)
    this.props.onChange(geometry)
  }

  contextClick(x, y) {
    if (this.complete()) return
    const {geometry} = this.props
    geometry.push({x, y})
    this.props.onChange(geometry)
    // this.setState({geometry: geometry})
  }

  complete() {
    const { geometry } = this.props
    if (geometry.length < 2) return false
    const first = geometry[0]
    const last = geometry[geometry.length - 1]
    return first.x === last.x && first.y === last.y
  }

  onPointMove(point, i) {
    let { geometry } = this.props
    const complete = this.complete()
    geometry[i] = point

    if (i === geometry.length - 1 && complete) {
      geometry[0] = point
    }

    this.props.onChange(geometry)
  }

  onComplete() {
    let {geometry} = this.props
    geometry.push(geometry[0])
    this.props.onChange(geometry, true)
    // this.setState({geometry})
    // this.props.onComplete(geometry, "geometry")
  }

  onUpdate() {
    let {geometry} = this.props
    this.props.onChange(geometry, true)
  }

  onAllMove(geometry) {
    this.props.onChange(geometry)
    // this.setState({geometry})
  }

  cancel() {
  }

  render() {
    const { containerStyle } = this.props
    let cs = containerStyle ? JSON.parse(JSON.stringify(containerStyle)) : {}
    const { geometry, context: { rotation, dimensions, size } } = this.props
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
          onUpdate={(g) => {
            this.onUpdate(g)
          }}
          onClick={(x,y) => this.contextClick(x, y)}
          mouseTracking="tracer"
          box={geometry}
          size={size}
          dimensions={dimensions}
          rotation={rotation}
          complete={this.complete()}
        >
          { this.props.children }
        </Bounding>
      </div>
    )
  }
}

