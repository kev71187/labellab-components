import React, { Component } from 'react'
import styled from 'styled-components'
import Image from './image'
import Box from './common/Box'
import colors from './constants/colors'
import LabelOverlay from './common/LabelOverlay'

const PreviewComponent = styled.div`
`

class Preview extends Component {
  render() {
    const {size, fileType, url, data, labels} = this.props
    let File = Image.Image
    console.log(url)

    return (
      <PreviewComponent>
        <File
          file={{url, data}}
          size={size}
        >
          { labels.map((label, i) => {
              if (label.labelGeometry !== 'none') {
                return <Box
                  key={i}
                  box={label.state.geometry}
                  viewSize={size}
                  dimensions={label.options.dimensions}
                  name={label.label}
                 />
              }
              if (label.labelGeometry === 'none') {
                return <LabelOverlay key={i} offset={i * 30} color={colors.blue} name={label.label}/>
              }

              return null
            })
          }
        </File>
      </PreviewComponent>
    )
  }
}

export default Preview
