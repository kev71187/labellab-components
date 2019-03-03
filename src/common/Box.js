import React, { Component } from 'react'
import colors from '../constants/colors'
import LabelOverlay from '../common/LabelOverlay'
import KeyWatch from '../common/KeyWatch'
import {
  pointToCoord
} from '../utils/coordinates'
import {mobilecheck} from "../utils/index"

const isMobile = mobilecheck()

const edgeOptionSizes = {
  mobile: {
    active: 10,
    passive: 5
  },
  desktop: {
    active: 5,
    passive: 3
  }
}

const edgeSizes = isMobile ? edgeOptionSizes.mobile : edgeOptionSizes.desktop

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
    const complete = this.complete()
    if (complete) {
      if (this.props.onComplete) this.props.onComplete()
    }
  }

  onMouseUp() {
    this.setState({dragging: null})
  }
  onMouseEnter(i) {
    this.setState({cornerHover: i})
  }

  onMouseLeave() {
    const isDragging = this.isDragging()
    if (isDragging) return
    this.setState({cornerHover: null})
  }

  onMouseDown(i) {
    const {dragging} = this.state
    const complete = this.complete()
    if (i === 0 && complete === false) {
      if (this.props.onComplete) this.props.onComplete()
    } else {
    }
    this.setState({dragging: i})
  }

  onDrag(e) {
    const {dragging} = this.state
    const isDragging = this.isDragging()

    if (isDragging) {
      if (dragging !== "all") {
        this.props.onPointMove && this.props.onPointMove(e, dragging)
      } else {
        this.props.onAllMove && this.props.onAllMove(e)
      }
    }
  }

  complete() {
    const {notComplete} = this.props
    return !(notComplete === true)
  }

  isDragging() {
    const {dragging} = this.state
    return dragging !== null
  }

  render() {
    const { box, size, notComplete, editing, dimensions, viewSize } = this.props
    const complete = this.complete()
    const {name} = this.props
    const { hover, cornerHover} = this.state
    let color = colors.green
    let colorTransparent = colors.greenTransparent
    const isDragging = this.isDragging()


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
          { hover && name && <LabelOverlay color={color} name={name}/> }
        <svg
          onMouseUp={(e) => {
            this.setState({dragging: null})
            this.callbackCompleteIfComplete()
            e.preventDefault()
          }}

          onMouseLeave={(e) => {
            this.setState({dragging: null, cornerHover: null, hover: null})
            e.preventDefault()
          }}

          onMouseMove={(e) => {
            this.onDrag(e)
            e.preventDefault()
          }}
          onTouchMove={(e) => {
            const {layerX, layerY} = e.nativeEvent
            this.onDrag({clientX: layerX, clientY: layerY, mobileDrag: true})
            e.preventDefault()
          }}


          style={{ position: 'absolute', left: 0, top: 0}}
          viewBox={`0 0 ${viewSize} ${viewSize}`} xmlns="http://www.w3.org/2000/svg">
          { points.length > 1 && !complete &&
            <polyline points={joinedPoints} fill="transparent" stroke={color} strokeWidth="3" />
          }

          { complete &&
            <polygon
              style={{zIndex: 6, pointerEvents: "auto", cursor: "pointer", position: "relative"}}
              onMouseEnter={(e) => {
                if (isDragging) return
                this.setState({hover: true})
                e.preventDefault()
              }}

              onMouseUp={(e) => {
                this.setState({dragging: null})
                e.preventDefault()
              }}

              onMouseDown={(e) => {
                if (!editing) return
                this.props.setAnchor(e)
                this.setState({dragging: "all"})
                e.preventDefault()
              }}

              onMouseLeave={(e) => {
                if (isDragging) return
                this.setState({hover: false})
                e.preventDefault()
              }}

              onTouchEnd={(e) => {
                this.setState({dragging: null})
                e.preventDefault()
              }}

              onTouchStart={(e) => {
                if (!editing) return
                const {layerX, layerY} = e.nativeEvent
                this.props.setAnchor({clientX: layerX, clientY: layerY, mobileDrag: true})
                this.setState({dragging: "all"})
                e.preventDefault()
              }}

              onClick={() => this.props.onClick && this.props.onClick()}

              points={joinedPoints}
              strokeWidth="2"
              fill={hover ? colorTransparent : 'transparent'} stroke={color}
            >
            </polygon>
          }
          { editing && points.map((b, i) => {
            const completeWithMe = editing && this.props.onComplete && i === 0 && !complete
            const active = i === cornerHover && editing
            const edgeColor = active || (completeWithMe) ? "white" : color
            const edgeSize = active || completeWithMe ? edgeSizes.active : edgeSizes.passive

            return <circle
              key={i + 'vis' }
              style={{zIndex: 7, position: "relative"}}
              stroke={active || completeWithMe ? "rgba(0, 0, 0, 0.285)" : "transparent"}
              r={edgeSize} fill={edgeColor} cy={b.y} cx={b.x}
              />
            })
          }

          { editing && !isDragging && points.map((b, i) => {
            const completeWithMe = editing && this.props.onComplete && i === 0 && !complete
            const edgeSize = completeWithMe ? edgeSizes.active : edgeSizes.passive

            return <circle
              key={i + 'invis'}
              style={{ cursor: "pointer", pointerEvents: "auto", zIndex: 10}}
              onMouseEnter={(e) => {
                this.onMouseEnter(i)
                e.preventDefault()
              }}
              onMouseLeave={(e) => {
                this.onMouseLeave()
                e.preventDefault()
              }}

              onMouseUp={(e) => {
                this.onMouseUp()
                e.preventDefault()
              }}
              onTouchEnd={(e) => {
                this.onMouseUp()
                e.preventDefault()
              }}

              onMouseDown={(e) => {
                this.onMouseDown(i)
                e.preventDefault()
              }}
              onTouchStart={(e) => {
                this.onMouseDown(i)
                e.preventDefault()
              }}

              r={edgeSize * 1.3} fill={"transparent"} cy={b.y} cx={b.x}/>
            })
          }
      </svg>
    </div>
  }
}

export default Box
