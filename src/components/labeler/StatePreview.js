import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LabelPreview from "../common/LabelPreview"
import Preview from '../elements/Preview'

export default class extends Component {
  renderFilePreview() {
    const { url,
      labelChoices,
      data,
      labelGeometry,
      labels,
      labelClicked,
      fileType
    } = this.props

    if (labelGeometry !== 'none') {
      return <Preview
        fileType={fileType}
        url={url}
        size={150}
        data={data}
        onClick={(label) => labelClicked(label)}
        labels={labels}
      />
    }
  }

  render() {
    const {
      labelType,
      labelGeometry,
      labels,
      labelClicked
    } = this.props

    return <div style={{display: "flex", flexDirection: "row", marginTop: "15px"}}>
        { this.renderFilePreview() }
        <div style={{marginLeft: "15px"}}>
          <LabelPreview
            labels={labels}
            labelClicked={(label) => {
              labelClicked(label)
            }}
          />
      </div>
    </div>
  }
}
