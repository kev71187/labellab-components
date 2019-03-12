import React, { Component } from 'react'
import styled from 'styled-components'
import colors from "../../constants/colors"
import Label from './Label'

const LabelPreview = styled.div`
`
class Preview extends Component {
  render() {
    const {labels, labelClicked} = this.props

    return (
      <LabelPreview>
        <h6 style={{paddingTop: "15px"}}>
          Labels:
        </h6>
        <div style={{wordBreak: "break-all"}}>
          {
            labels.map((label, i) => {
              return <span key={label.label + "-" + i} style={{marginRight: "5px", marginTop: "10px", display: "inline-block"}} >
                <Label onClick={() => {
                    this.props.labelClicked(label)
                }
                } name={label.label}></Label>
              </span>
            })
          }
        </div>
      </LabelPreview>
    )
  }
}

export default Preview


