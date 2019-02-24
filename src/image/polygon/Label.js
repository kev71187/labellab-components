import React, { Component } from 'react'
import Bounding from '../Bounding'
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
    return this.state.box
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
    this.props.onComplete(this.state.box, "geometry")
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
    const size = this.props.size || IMAGE_SIZE
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
          box={box}
          size={size}
          dimensions={dimensions}
          rotation={rotation}
          complete={this.state.complete}
          file={file}
          onClick={(x,y) => this.imageClick(x, y)}
        >
          { this.props.children }
        </Bounding>
      </div>
    )
  }
}

export default Labeler
