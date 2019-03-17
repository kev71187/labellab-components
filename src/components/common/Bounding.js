import React, { Component } from 'react'
import Box from './Box'
import Crosshair from '../common/Crosshair'
import Tracer from '../common/Tracer'
import {
  mouseEventToCoordinate,
  coordToPoint,
  pointToCoord
} from '../../utils/coordinates'
import {mobilecheck} from "../../utils/index"

const isMobile = mobilecheck()

class Bounding extends Component {
  constructor() {
    super()
    this.state = {
      anchor: null,
    }
  }

  contextClicked(e) {
    const {dimensions, size} = this.props
    if (this.props.frozen) return false
    const coords = mouseEventToCoordinate(e, this._input)
    const point = coordToPoint(coords, dimensions, size)
    if (this.invalidPoint(point)) {
      console.log(coords, point, dimensions, size)
      return
    }
    this.props.onClick(point.x, point.y)
  }
  onInsert(i, e) {
    const {dimensions, size} = this.props
    if (this.props.frozen) return false
    const coords = mouseEventToCoordinate(e, this._input)
    const point = coordToPoint(coords, dimensions, size)
    if (this.invalidPoint(point)) {
      console.log(coords, point, dimensions, size)
      return
    }
    this.props.onInsert && this.props.onInsert(i, {x: point.x, y: point.y})
  }

  invalidPoint(point) {
    const {dimensions} = this.props
    return point.x < 0 || point.x > dimensions.width || point.y < 0 || point.y > dimensions.height
  }

  onPointMove(e, i) {
    const {size} = this.props
    const coords = mouseEventToCoordinate(e, this._input)
    const point = coordToPoint(coords, this.props.dimensions, size)
    if (this.invalidPoint(point)) {
      return
    }
    this.props.onPointMove(point, i)
  }

  onAllMove(e) {
    if (!this.state.anchor) {}
    const {size} = this.props
    const {anchor: { point, box }} = this.state
    const coords = mouseEventToCoordinate(e, this._input)
    const p = coordToPoint(coords, this.props.dimensions, size)
    const deltaX = p.x - point.x
    const deltaY = p.y - point.y
    const newBox = JSON.parse(JSON.stringify(box))

    newBox.forEach((b) => {
      b.x = b.x + deltaX
      b.y = b.y + deltaY
    })

    let invalid = newBox.find((point) => this.invalidPoint(point))

    if (invalid) {
      return
    }

    this.props.onAllMove(newBox)
  }

  setAnchor(e) {
    const {box, size} = this.props
    const coords = mouseEventToCoordinate(e, this._input)
    const point = coordToPoint(coords, this.props.dimensions, size)

    this.setState({
      anchor: {
        box: JSON.parse(JSON.stringify(box)),
        point
      }
    })
  }

  render() {
    const { complete, boxes, box, size, mouseTracking } = this.props
    let MouseTool = Crosshair
    const point = box[box.length - 1]
    let coord

    if (point) {
      coord = pointToCoord(point, this.props.dimensions, size)
    }

    if (mouseTracking === 'tracer') {
      MouseTool = Tracer
    }


    const containerStyle = {
      backgroundColor: '#333',
      position: 'relative',
      height: size + "px",
      width: size + 'px',
    }

    if (!complete) containerStyle.cursor = 'crosshair'

    return (
      <div
        ref={c => (this._input = c)}
        className="ll-bounding"
        style={containerStyle}
        onMouseOut={(e) => {
          if (!isMobile && this._crosshair) {
            this._crosshair.onMouseMove(null)
          }
        }}
        onMouseMove={(e) => {
          if (!isMobile && this._crosshair) {
            const coords = mouseEventToCoordinate(e, this._input)
            this._crosshair.onMouseMove(coords)
          }
        }}
        onClick={e => this.contextClicked(e)}
      >
        { !complete && !isMobile &&
          <MouseTool
            ref={c => (this._crosshair = c)}
            coord={coord}
            size={size}
          />
        }
        <Box
          editing
          dimensions={this.props.dimensions}
          viewSize={size}
          onComplete={this.props.onComplete}
          onPointMove={(e, i) => {this.onPointMove(e, i)}}
          setAnchor={(e) => {
            this.setAnchor(e)
          }}
          onInsert={(i, e) => {
            this.onInsert(i, e)
          }}
          onAllMove={(e) => {
            this.onAllMove(e)
          }}
          notComplete={!complete}
          box={box}
        />
        { this.props.children }
      </div>
    )
  }
}

export default Bounding
