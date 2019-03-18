import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LabelEdit from "../common/LabelEdit"
import LabelPreview from "../common/LabelPreview"
import Classifier from '../common/Classifier'
import StatePreview from './StatePreview'
import ButtonSuccess from "../ButtonSuccess"
import ButtonLink from "../ButtonLink"
import InlineBlock from  './InlineBlock'
import Box from '../bounding/Box'

export default class extends Component {
  renderFinishControls() {
    const {labels} = this.props
    const totalLabels = labels.length

    return <div style={{textAlign: "left", display: "flex", marginTop: "15px"}}>
      <ButtonLink
        style={{flex: 1, color: "#dc3545"}}
        onClick={() => {
          if (confirm("Confirm this file does not belong in this dataset")) {
            this.props.callbacks.onReject()
          }
        }}
      >Reject File</ButtonLink>
      <ButtonSuccess
        disabled={totalLabels === 0}
        style={{ flex: 1}}
        onClick={() => {
          this.props.callbacks.onComplete()
        }}
      >Complete File</ButtonSuccess>
    </div>
  }

  renderGeometry()  {
    const {label} = this.props
    const {geometry} = label.state
    const viewSize = 100

    return <div style={{display: "flex", marginTop: "15px", justifyContent: 'space-between'}}>
      <div style={{marginRight: "15px"}}>
        Geometry:
      </div>
      <div style={{textAlign: "right", height: viewSize, width: viewSize, border: "1px solid rgba(0, 0, 0, 0.1)", borderRadius: "3px" }}>
        <Box
          box={geometry}
          onClick={() => {
            console.log("clicked", label)
          }}
          viewSize={viewSize}
          dimensions={this.props.dimensions}
          name={label.label}
         />
      </div>
  </div>
  }
  render() {
    const {
      labelChoices,
      hideLabels,
      labelType,
      labelGeometry,
      hover,
      labels,
      savedLabel,
      editing,
      label,
      amountComplete
    } = this.props
    const ac = amountComplete
    let changed = ac[0] > 0

    if (savedLabel) {
      changed = JSON.stringify(savedLabel) !== JSON.stringify(label)
    }

    const complete = ac[0] === ac[1]
    return <InlineBlock className="ll-classification" style={{marginLeft: "15px", display: "flex", flexDirection: "column", justifyContent: "space-between", maxWidth: "800px"}}>
      <LabelEdit
        amountComplete={ac}
        label={label}
        savedLabel={savedLabel}
        editing={editing}
        changed={changed}
        onCancel={() => {
          this.props.callbacks.onCancel()
        }}
        onSave={() => {
          this.props.callbacks.onSave()
        }}
        onRemove={() => {
          this.props.callbacks.onRemove(label)
        }}
      >
        <div>
          <div style={{display: "flex"}}>
            <div style={{marginRight: "15px"}}>Label: </div>
            <div className="ll-label-wrapper">
              <Classifier
                className="ll-label-item"
                key={label.uuid}
                autoFocus={ac[1] - ac[0] === 1}
                labels={labelChoices}
                selected={ label.label }
                onSelect={(label) => {
                  this.props.callbacks.onSelect(label)
                }}
              />
            </div>
          </div>
          { this.props.labelGeometry !== "none" && this.renderGeometry() }
        </div>
      </LabelEdit>
      { this.renderFinishControls() }
    </InlineBlock>
  }
}
