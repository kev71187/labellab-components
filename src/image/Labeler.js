import React, { Component } from 'react'
import Image from './Image'
import Classifier from '../common/Classifier'
import SquareBox from './square_box'
import {IMAGE_SIZE} from "../constants/image"
import Dags from "../utils/dags"
import styled from 'styled-components'

const ImageLabeler = styled.div`
  display: flex;
`

const DefaultLabeler = styled.div`
`

const InlineBlock = styled.div`
  display: inline-block;
  vertical-align: top;
`

class Labeler extends Component {
  constructor(props) {
    super()
    this.state = {
      dimensions: null,
      current: this.defaultLabel(),
      labels: []
    }
  }

  defaultLabel() {
    return {
    }
  }

  componentDidMount() {
    setTimeout(() => {
      this._obj.dimensions().then((dimensions) => {
        this.setState({dimensions})
      }).catch((e) => {
        console.log(e)
      })
    },1)
  }

  onChange(e, type) {
    let current = JSON.parse(JSON.stringify(this.state.current))
    current[type] = e
    this.setState({current})
  }

  totalLabels() {
    const {labels} = this.state
    return labels.length + (this.validLabel() ? 1 : 0)
  }

  dag() {
    const { file, labelType, labelGeometry, labelChoices } = this.props
    console.log("HERE", labelGeometry, Dags.label)
    if (labelGeometry === "box" || labelGeometry === "polygon") {
      return Dags.geometry
    }

    console.log("HERE", Dags.label)
    return Dags.label
  }

  amountComplete() {
    const dag = this.dag()
    const count = dag.requires.filter((f) => this.state.current[f]).length

    return [count, dag.requires.length]
  }

  validLabel() {
    const ac = this.amountComplete()
    return ac[0] === ac[1]
  }

  renderEmpty() {
    return <div>No image found</div>
  }

  addAnother() {
    let labels = this.state.labels
    labels.push(this.state.current)
    let current = this.defaultLabel()
    this.setState({labels, current})
  }

  render() {
    const { file, labelType, labelGeometry, labelChoices } = this.props
    const {labels} = this.state
    const size = this.props.size || IMAGE_SIZE
    const totalLabels = this.totalLabels()
    const ac = this.amountComplete()

    let LabelerWrapper = DefaultLabeler

    if (labelGeometry === "box") {
      LabelerWrapper = SquareBox.Label
    }

    return (
      <ImageLabeler className="image-labeler">
        <InlineBlock>
          <LabelerWrapper
            key={labels.length}
            size={size}
            dimensions={this.state.dimensions}
            onComplete={(e, type) => {
              this.onChange(e, type)
            }}
          >
            <Image
              ref={c => (this._obj = c)}
              file={file}
              size={size}
              rotation={0}
            />
          </LabelerWrapper>
        </InlineBlock>
        <InlineBlock style={{marginLeft: "15px", width: "100%"}}>
          <div style={{height: "290px"}}>
            <div style={{marginBottom: "5px"}}>
              Requirements { ac[0] } / {[ac[1]]}
            </div>
            <Classifier
              key={labels.length}
              labels={labelChoices}
              selected={ this.state.current.label }
              onSelect={(label) => {
                this.onChange(label, "label")
              }}
            />
            { this.validLabel() &&
              <div>
                <button
                  onClick={() => {
                    this.addAnother()
                  }}
                  style={{marginTop: "10px"}}
                  className="btn btn-primary"
                >
                  Add another label
                </button>
              </div>
            }
          </div>
          <div style={{textAlign: "right"}}>
            <button className="btn btn-secondary"
              style={{width: "180px"}}
              disabled={totalLabels > 0}
              onClick={() => {
                if (confirm("Confirm this file does not belong in this dataset")) {
                  alert("removed")
                }
              }}
            >Not Applicable</button>
            <button
              className="btn btn-success"
              disabled={totalLabels === 0}
              style={{marginLeft: "10px", width: "180px"}}
              onClick={() => {
                alert()
              }}
            >Save {totalLabels} Labels</button>
          </div>
          {
            this.state.labels.map((label) => {
              return <div key={label.label}>{label.label}</div>
            })
          }
        </InlineBlock>
      </ImageLabeler>
    )
  }
}

export default Labeler
