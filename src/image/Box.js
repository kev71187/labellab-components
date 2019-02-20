import React, { Component } from 'react'
import colors from '../constants/colors'
import {
  pointToCoord
} from '../utils/coordinates'

class Box extends Component {
  constructor() {
    super()
    this.state = {
      hover: false,
      cornerHover: null,
      dragging: null,
    }
  }

  callbackCompleteIfComplete() {
    const { notComplete } = this.props
    const complete = !(notComplete === true)
    if (complete) {
      if (this.props.onComplete) this.props.onComplete()
    }
  }
  render() {
    const { box, size, notComplete, editing, dimensions, viewSize } = this.props
    const complete = !(notComplete === true)
    const {name} = this.props
    const { hover, cornerHover, dragging } = this.state
    let color = colors.green
    let colorTransparent = colors.greenTransparent
    const isDragging = dragging !== null


    if (hover || cornerHover !== null) {
      color = colors.blue
      colorTransparent = colors.blueTransparent
    }
    const containerStyle = {position: "relative", zIndex: 3}
    if (!isDragging) {
      containerStyle.zIndex = 15
      containerStyle.pointerEvents = 'none'
    }
    const points = box.map((b) => {
      const coord = pointToCoord(b, dimensions, viewSize)
      return coord
    })
    const joinedPoints = points.map((p) => {
      return p.x + "," + p.y
    }
    ).join(" ")

    return <div style={containerStyle}
        >
        { hover && name && <div style={{backgroundColor: color, color: "#fff", padding: "1px 5px", borderRadius: "2px", position: "absolute", top: "5px", left: "5px"}}>{name}</div> }
        <svg
          onMouseUp={(e) => {
            this.setState({dragging: null})

            this.callbackCompleteIfComplete()
          }}
          onMouseLeave={() => {
            this.setState({dragging: null, cornerHover: null, hover: null})
          }}
          onMouseMove={(e) => {
            if (isDragging) {
              if (dragging !== "all") {
                this.props.onPointMove && this.props.onPointMove(e, dragging)
              } else {
                this.props.onAllMove && this.props.onAllMove(e)
              }
            }
          }}
          style={{ position: 'absolute', left: 0, top: 0}}
          viewBox={`0 0 ${viewSize} ${viewSize}`} xmlns="http://www.w3.org/2000/svg">
          { points.length > 1 && !complete &&
            <polyline points={joinedPoints} fill="transparent" stroke={color} strokeWidth="3" />
          }

          { complete &&
            <polygon
              style={{zIndex: 6, pointerEvents: "auto", cursor: "pointer", position: "relative"}}
              onMouseEnter={() => {
                if (isDragging) return
                this.setState({hover: true})
              }}

              onMouseUp={(e) => {
                this.setState({dragging: null})
              }}

              onMouseDown={(e) => {
                if (!editing) return
                this.props.setAnchor(e)
                this.setState({dragging: "all"})
              }}

              onMouseLeave={() => {
                if (isDragging) return
                this.setState({hover: false})
              }}
              points={joinedPoints}
              strokeWidth="2"
              fill={hover ? colorTransparent : 'transparent'} stroke={color}
            >
            </polygon>
          }
          { points.map((b, i) => {
            const active = i === cornerHover && editing
            const edgeColor = active || (editing && this.props.onComplete && i === 0 && !complete) ? "white" : color
            const edgeSize = active ? "4" : "3"

            return <circle
              key={i + 'vis' }
              style={{zIndex: 7, position: "relative"}}
              r={edgeSize} fill={edgeColor} cy={b.y} cx={b.x}
              />
            })
          }

          { editing && !isDragging && points.map((b, i) => {
            return <circle
              key={i + 'invis'}
              style={{ cursor: "pointer", pointerEvents: "auto", zIndex: 7}}
              onMouseEnter={() => {
                this.setState({cornerHover: i})
              }}

              onMouseUp={(e) => {
                this.setState({dragging: null})
              }}

              onMouseDown={(e) => {
                if (i === 0 && complete === false) {
                  if (this.props.onComplete) this.props.onComplete()
                } else {
                }
                this.setState({dragging: i})
              }}

              onMouseLeave={() => {
                if (isDragging) return
                this.setState({cornerHover: null})
              }}
              r="7" fill={"transparent"} cy={b.y} cx={b.x}/>
            })
          }
      </svg>
    </div>
  }
}

export default Box
