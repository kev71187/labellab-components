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
      labelType,
      format,
      previewSize,
      labelChoices,
      labels,
      hideLabels
    } = this.props

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
          labelType={labelType}
          labelChoices={labelChoices}
          labels={labels}
          hideLabels={hideLabels}
        />
      </div>
    )
  }
}

LabelerComponent.propTypes = {
  fileType: PropTypes.oneOf(['text', 'json', 'xml', 'image']).isRequired,
  labelType: PropTypes.oneOf(['classification', 'freeform']),
  labelGeometry: PropTypes.oneOf(['none', 'box', 'polygon']),
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  interval: PropTypes.number
}

export default LabelerComponent
