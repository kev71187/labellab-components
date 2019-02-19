import React, { Component } from 'react'
import BoundingImage from '../BoundingImage'
import {IMAGE_SIZE} from "../../constants/image"

class Labeler extends Component {
  constructor() {
    super()
    this.state = this.defaultState()
  }

  defaultState() {
    return {
      dimensions: null,
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

  imageClick(x, y) {
    const {box} = this.state
    const newBox = JSON.parse(JSON.stringify(box))

    if (box.length === 0) {
      newBox.push({x, y})
      this.setState({box: newBox})
    } else if (box.length === 1) {
      newBox.push({x, y: box[0].y})
      newBox.push({x, y})
      newBox.push({x: box[0].x, y})
      this.props.onComplete(this.toLabel(newBox))
      this.setState({box: newBox})
    }
  }

  setDimensions(dimensions) {
    this.setState({dimensions})
  }

  toLabel(box) {
    const {dimensions} = this.state
    return {
      "state": box,
      "type": "SquareBoxAnnotation",
      "options": {
          "viewSize": IMAGE_SIZE,
          dimensions
      },
    }
  }

  onComplete() {
    this.props.onComplete(this.toLabel(this.state.box))
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
    const { file, containerStyle } = this.props
    let cs = containerStyle ? JSON.parse(JSON.stringify(containerStyle)) : {}
    const { box, rotation } = this.state
    const size = this.props.size || IMAGE_SIZE
    cs.width = size + "px"

    if (!file) return this.renderEmpty()
    return (
      <div style={cs} className="labeler">
        <BoundingImage
          onClear={() => this.clear()}
          onPointMove={(point, i) => {
            this.onPointMove(point, i)
          }}
          onAllMove={(b) => {
            this.onAllMove(b)
          }}
          setDemensions={(d) => {
            this.setDimensions(d)
          }}
          onComplete={(c) => {
            this.onComplete(c)
          }}
          box={box}
          size={size}
          rotation={rotation}
          complete={box.length === 4}
          file={file}
          onClick={(x,y) => this.imageClick(x, y)}
        />
      </div>
    )
  }
}

export default Labeler
