import React, { Component } from 'react'
// import { connect } from 'react-redux'
import Image from './Image'
import Box from './Box'
import colors from '../constants/colors'
import LabelOverlay from '../common/LabelOverlay'

class PreviewImage extends Component {
  render() {
    const {labels, file, hideLabels, size} = this.props
    const containerSize = size ? size : 100

    if (!file) return <div style={{
      lineHeight: "100px",
      textAlign: "center",
      border: "1px solid lightgrey",
      borderRadius: "2px",
      width: containerSize - 2,
      height: containerSize - 2
    }}>
      no file
    </div>

    return <Image file={file} size={containerSize}>
      { !hideLabels &&
        labels.map((label, i) => {
          if (label.type === 'SquareBoxAnnotation' || label.type === 'PolygonAnnotation' ) {
            return <Box
              key={i}
              box={label.state}
              viewSize={containerSize}
              dimensions={label.options.dimensions}
              name={label.name}
             />
          }
          if (label.type === 'ClassificationAnnotation') {
            return <LabelOverlay color={colors.blue} name={name}/>
          }

          return null
        })
      }
    </Image>
  }
}

export default PreviewImage
