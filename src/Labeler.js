import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dag from './utils/dags'
import Text from './text'
import Image from './image'

class LabelerComponent extends Component {
  constructor() {
    super()
    this.state = {
      current: {},
      stage: 0,
      labels: []
    }
  }

  render() {
    const { url,
      data,
      fileType,
      format,
      previewSize,
      labelChoices,
      labels,
      hideLabels
    } = this.props

    let {
      labelType,
      labelGeometry
    } = this.props

    labelType = labelType || "classification"
    labelGeometry = labelGeometry || "none"

    let Labeler

    if (fileType === "image") {
      Labeler = Image.Labeler
    } else if (fileType === "text") {
      Labeler = Text.Labeler
    }

    return (
      <div>
        <Labeler
          file={{url}}
          fileType={fileType}
          data={data}
          format={format}
          size={previewSize}
          labelChoices={labelChoices}
          labelGeometry={labelGeometry}
          labelType={labelType}
          labels={labels}
          hideLabels={hideLabels}
        />
      </div>
    )
  }
}

LabelerComponent.propTypes = {
  fileType: PropTypes.oneOf(['text', 'json', 'xml', 'image']).isRequired,
  labelChoices: PropTypes.array,
  labelGeometry: PropTypes.oneOf(['none', 'box', 'polygon']),
  labelType: PropTypes.oneOf(['classification', 'freeform']),
  url: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  interval: PropTypes.number
}

export default LabelerComponent
