import React, { Component } from 'react'
import styled from 'styled-components'
import Image from '../image'
import Box from '../bounding/Box'
import colors from '../../constants/colors'
import Label from '../common/Label'

const PreviewComponent = styled.div`
  position: relative;
  display: inline-bloack;
`

class Preview extends Component {
  renderBox(label, geometry, i) {
    const {size} = this.props

    return <Box
      key={i}
      box={geometry}
      onClick={() => {
        this.props.onClick && this.props.onClick(label)
      }}
      viewSize={size}
      dimensions={label.options.dimensions}
      name={label.label}
     />
  }
  render() {
    const {size, fileType, url, data, labels} = this.props
    let File = Image.File

    return (
      <PreviewComponent style={this.props.style}>
        <File
          file={{url, data}}
          size={size}
        >
          { labels.map((label, i) => {
              if (['polygon', 'box'].includes(label.labelGeometry)) {
                return this.renderBox(label, label.state.geometry, i)
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
