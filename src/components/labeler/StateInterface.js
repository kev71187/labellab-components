import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LabelEdit from "../common/LabelEdit"
import LabelPreview from "../common/LabelPreview"
import Classifier from '../common/Classifier'
import ButtonSuccess from "../ButtonSuccess"
import ButtonLink from "../ButtonLink"
import InlineBlock from  './InlineBlock'

export default class extends Component {
  renderFinishControls() {
    const {labels} = this.props
    const totalLabels = labels.length

    return <div style={{textAlign: "left", display: "flex", marginTop: "15px"}}>
      <ButtonLink
        style={{flex: 1, color: "#dc3545", textAlign: "left"}}
        onClick={() => {
          if (confirm("Confirm this file does not belong in this dataset")) {
            this.props.onReject()
          }
        }}
      >Reject File</ButtonLink>
      <ButtonSuccess
        disabled={totalLabels === 0}
        style={{marginRight: "5px"}}
        onClick={() => {
          this.props.onComplete()
        }}
      >Complete</ButtonSuccess>
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
      current,
      labelClicked,
      filePreview,
      amountComplete
    } = this.props
    const ac = amountComplete
    let changed = ac[0] > 0

    if (savedLabel) {
      changed = JSON.stringify(savedLabel) !== JSON.stringify(current)
    }

    const complete = ac[0] === ac[1]
    return <InlineBlock className="ll-classification" style={{marginLeft: "15px", maxWidth: "800px"}}>
      <LabelEdit
        amountComplete={ac}
        label={current}
        savedLabel={savedLabel}
        editing={editing}
        changed={changed}
        onCancel={() => {
          this.props.onCancel()
        }}
        onSave={() => {
          this.props.onSave()
        }}
        onRemove={() => {
          this.props.onRemove(current)
        }}
      >
        <div>
          <div style={{display: "flex"}}>
            { editing && <div style={{flex: .5}}>Label: </div>}
            <div className="ll-label-wrapper">
              <Classifier
                className="ll-label-item"
                key={current.uuid}
                autoFocus={ac[1] - ac[0] === 1}
                labels={labelChoices}
                selected={ current.label }
                onSelect={(label) => {
                  this.props.onSelect(label)
                }}
              />
            </div>
          </div>
          { editing && current.state && current.state.geometry &&
            <div style={{display: "flex", marginTop: "15px"}}>
              <div style={{flex: .5}}>
                Geometry:
              </div>
              <div style={{flex: 1, textAlign: "right" }}>
                shown on image
              </div>
          </div>
          }
        </div>
      </LabelEdit>
      { filePreview }
      <div>
        <LabelPreview
          labels={labels}
          labelClicked={(label) => {
            this.props.labelClicked(label)
          }}
        />
      </div>
      { this.renderFinishControls() }
    </InlineBlock>
  }
}
