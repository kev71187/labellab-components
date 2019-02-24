import React, { Component } from 'react'
import Bounding from '../Bounding'

class BoxLabeler extends Component {
  constructor() {
    super()
    this.state = this.defaultState()
  }

  defaultState() {
    return {
      box: [],
      rotation: 0
    }
  }

  renderEmpty() {
    const {emptyMessage} = this.props
    const message = emptyMessage || "No file"

    return (
      <div>{emptyMessage}</div>
    )
  }

  clear() {
    this.setState(this.defaultState())
  }

  contextClick(x, y) {
    const {box} = this.state
    const newBox = JSON.parse(JSON.stringify(box))

    if (box.length === 0) {
      newBox.push({x, y})
      this.setState({box: newBox})
    } else if (box.length === 1) {
      newBox.push({x, y: box[0].y})
      newBox.push({x, y})
      newBox.push({x: box[0].x, y})
      this.setState({box: newBox})
      this.onComplete(newBox)
    }
  }

  toLabel(box) {
    return box
  }

  onComplete(newBox) {
    this.props.onComplete(newBox || this.state.box, "geometry")
  }

  onPointMove(point, i) {
    const { box } = this.state
    const newBox = JSON.parse(JSON.stringify(box))
    newBox[i] = point
    if (newBox.length > 1) {
      newBox[3 - i].x = point.x
      if (i === 0) newBox[1].y = point.y
      if (i === 1) newBox[0].y = point.y
      if (i === 2) newBox[3].y = point.y
      if (i === 3) newBox[2].y = point.y
    }

    this.setState({box: newBox})
  }

  onAllMove(box) {
    this.setState({box})
  }

  cancel() {
  }

  render() {
    const { file, containerStyle, dimensions } = this.props
    let cs = containerStyle ? JSON.parse(JSON.stringify(containerStyle)) : {}
    const { box, rotation } = this.state
    const size = this.props.size
    cs.width = size + "px"

    return (
      <div className="box-labeler">
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
          box={box}
          size={size}
          dimensions={dimensions}
          rotation={rotation}
          complete={box.length === 4}
          file={file}
          onClick={(x,y) => this.contextClick(x, y)}
        >
          { this.props.children }
        </Bounding>
      </div>
    )
  }
}

export default BoxLabeler
