import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LabelerComponent from "./LabelerComponent"

class Labeler extends Component {
  constructor(props) {
    super()
    this.state = {
      hover: false,
    }
  }

  render() {
    const { url,
      data,
    } = this.props
    const { hover } = this.state

    return (
      <div
        onMouseLeave={(e) => {
          this.setState({hover: false})
        }}
        onMouseEnter={(e) => {
          this.setState({hover: true})
        }}
      >
        <LabelerComponent hover={hover} key={url || data} {...this.props}/>
      </div>
    )
  }
}


Labeler.defaultProps = {
  labelGeometry: 'none',
  labelType: 'classification'
}

Labeler.propTypes = {
  fileType: PropTypes.oneOf(['text', 'json', 'xml', 'image']).isRequired,
  labelChoices: PropTypes.array,
  labelGeometry: PropTypes.oneOf(['none', 'box', 'polygon']),
  labelType: PropTypes.oneOf(['classification', 'freeform']),
  url: PropTypes.string,
  data: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  helpText: PropTypes.string,
  interval: PropTypes.number
}

export default Labeler
