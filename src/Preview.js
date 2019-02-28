import React, { Component } from 'react'
import styled from 'styled-components'
import Image from './image'
import Box from './common/Box'
import colors from './constants/colors'
import Label from './common/Label'

const PreviewComponent = styled.div`
  position: relative;
`

class Preview extends Component {
  render() {
    const {size, fileType, url, data, labels} = this.props
    let File = Image.Image

    return (
      <PreviewComponent style={this.props.style}>
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

              return null
            })
          }
          <div style={{wordBreak: "break-all", position: "absolute", top: "5px", left: "5px"}}>
            {
              labels.map((label, i) => {
                if (label.labelGeometry === 'none') {
                  return <span key={label.label + "-" + i} style={{marginRight: "5px", marginTop: "10px", display: "inline-block"}} >
                    <Label name={label.label}></Label>
                  </span>
                }

                return null
              })
            }
          </div>
        </File>
      </PreviewComponent>
    )
  }
}

export default Preview
