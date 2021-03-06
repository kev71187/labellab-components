import React, { Component } from 'react'
import styled from 'styled-components'
import colors from "../../constants/colors"
import ButtonLink from "../ButtonLink"

const LabelEdit = styled.div`

  .ll-label-wrapper {
    flex: 1;
    margi-bottom: 15px;
  }
  .ll-label-item {
    width: 100%;
  }

  .ll-edit-view {
    text-align: right
  }

  &.editing {
    border: 1px solid lightgrey;
    border-radius: 3px;
  }
  .edit-header {
      border-bottom: 1px solid lightgrey;
    h5 {
      padding: 10px 0;
      text-align: center;
      margin: 0;
    }
  }
  .edit-footer {
      border-top: 1px solid lightgrey;
      display: flex;
  }

  &.editing {
    .ll-labels-content {
      padding: 15px;
    }
  }
`
class LabelEditComponent extends Component {
  render() {
    const { amountComplete, changed, editing, label } = this.props
    const complete = amountComplete[0] == amountComplete[1]
    const saveable = complete && changed
    return (
      <LabelEdit className={"editing"}>
          <div className="edit-header">
            <h5>Current Label</h5>
          </div>
        <div className="ll-labels-content">
          {this.props.children}
        </div>
        <div className="edit-footer">
          { complete &&
            <ButtonLink
              style={{flex: 1, color: "#dc3545", marginRight: "2px"}}
              onClick={() => {
               this.props.onRemove(label)
              }}
            >Remove</ButtonLink>
          }
          <ButtonLink
            style={{flex: 1, marginLeft: "2px", marginRight: "2px"}}
            onClick={() => {
             this.props.onCancel()
            }}
          >Cancel</ButtonLink>
            <ButtonLink
              style={{flex: 1, color: saveable ? "#28a745" : "lightgrey", marginLeft: "2px"}}
              disabled={!saveable}
              onClick={() => {
                if (saveable) {
                  this.props.onSave(label)
                }
              }}
            >Save</ButtonLink>
        </div>
      </LabelEdit>
    )
  }
}
        // { !editing &&
        //   <div style={{flex: 1, marginBottom: "5px"}}>
        //     Label Requirements { amountComplete[0] } / {amountComplete[1]}
        //   </div>
        // }

export default LabelEditComponent


