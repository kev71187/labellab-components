import React, { Component } from 'react'
import Bounding from '../Bounding'

class PolygonLabeler extends Component {
  constructor(props) {
    super()
    let state = this.defaultState()

    if (props.labelState && props.labelState.geometry) {
      state.box = props.labelState.geometry
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
      box: [],
      rotation: 0,
      complete: false,
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
    if (this.state.complete) {
      this.setState({complete: false})
    } else {
      this.state.box.pop()
      this.setState({box: this.state.box})
    }
  }

  clear() {
    this.setState(this.defaultState())
  }

  toLabel() {
    return this.state.box
  }

  contextClick(x, y) {
    if (this.state.complete) return
    const {box} = this.state
    const newBox = JSON.parse(JSON.stringify(box))
    newBox.push({x, y})
    this.setState({box: newBox})
  }

  onPointMove(point, i) {
    const { box } = this.state
    const newBox = JSON.parse(JSON.stringify(box))
    newBox[i] = point
    this.setState({box: newBox})
  }

  onComplete() {
    this.setState({complete: true})
    this.props.onComplete(this.state.box, "geometry")
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
          complete={this.state.complete}
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
