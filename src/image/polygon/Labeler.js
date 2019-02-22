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
    const {box, dimensions} = this.state

    return {
      "state": box,
      "type": "PolygonAnnotation",
      "options": {
        "viewSize": IMAGE_SIZE,
        dimensions
      },
    }
  }

  setDimensions(dimensions) {
    this.setState({dimensions})
  }

  imageClick(x, y) {
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
    this.props.onComplete(this.toLabel())
  }

  onAllMove(box) {
    this.setState({box})
  }

  cancel() {
  }

  render() {
    const { file, containerStyle } = this.props
    let cs = containerStyle ? JSON.parse(JSON.stringify(containerStyle)) : {}
    console.log(cs)
    const { box, rotation } = this.state
    const size = this.props.size || IMAGE_SIZE

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
          box={box}
          setDemensions={(d) => {
            this.setDimensions(d)
          }}
          size={size}
          rotation={rotation}
          complete={this.state.complete}
          onComplete={() => this.onComplete()}
          file={file}
          onClick={(x,y) => this.imageClick(x, y)}
        />
      </div>
    )
  }
}

export default Labeler
