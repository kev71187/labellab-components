import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Dags from "./utils/dags"
import Text from './text'
import Image from './image'
import Classifier from './common/Classifier'
import KeyWatch from './common/KeyWatch'
import PolygonLabeler from './common/labelers/PolygonLabeler'
import BoxLabeler from './common/labelers/BoxLabeler'
import Polygon from './image/polygon'
import Default from './Default'
import {IMAGE_SIZE} from "./constants/image"

const Main = styled.div`
  display: flex;
`

const InlineBlock = styled.div`
  display: inline-block;
  vertical-align: top;
`

class LabelerComponent extends Component {
  constructor(props) {
    super()
    this.state = {
      dimensions: null,
      current: this.defaultLabel(),
      labels: props.labels || [],
      done: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      console.log(this)
      this._obj.dimensions().then((dimensions) => {
        this.setState({dimensions})
      }).catch((e) => {
        console.log(e)
      })
    },1)
  }

  defaultLabel() {
    return {
    }
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
    if (labelGeometry === "box" || labelGeometry === "polygon") {
      return Dags.geometry
    }

    return Dags.labelType
  }


  toLabel(current) {
    const {dimensions} = this.state
    const {labelType, labelGeometry} = this.props
    let state = {}
    const { geometry } = this.state.current

    if (geometry) {
      state.geometry = geometry
    }

    return {
      labelType,
      labelGeometry,
      label: current.label,
      options: {
          dimensions
      },
      state,
    }
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

  addAnother() {
    let labels = this.state.labels
    const label = this.toLabel(this.state.current)
    labels.push(label)
    let current = this.defaultLabel()
    this.setState({labels, current})
    return labels
  }

  complete() {
    let {labels} = this.state
    if (this.validLabel()) {
      labels = this.addAnother()
    }
    this.props.onComplete(labels)
    this.setState({done: true})
  }

  render() {
    const { url,
      data,
      fileType,
      format,
      labelChoices,
      hideLabels,
      previewSize,
      labelType,
      labelGeometry
    } = this.props
    const {labels, done} = this.state
    if (done) {
      return null
    }
    const file = {url, data}
    const size = previewSize || IMAGE_SIZE
    const totalLabels = this.totalLabels()
    const ac = this.amountComplete()

    let LabelerWrapper = Default

    if (labelGeometry === "box") {
      LabelerWrapper = BoxLabeler
    } else if (labelGeometry === "polygon") {
      LabelerWrapper = PolygonLabeler
    }

    return (
      <Main className="main-labeler">
        <KeyWatch
          onSubmit={(e) => {
            if (totalLabels > 0) {
              this.complete()
            }
          }}
          keyboardKey="Enter"
          shift={true}
        />
        <InlineBlock>
          <LabelerWrapper
            key={labels.length}
            size={size}
            dimensions={this.state.dimensions}
            onComplete={(e, type) => {
              this.onChange(e, type)
            }}
          >
            <Image.Image
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
                <KeyWatch
                  onSubmit={() => {
                    this.addAnother()
                  }}
                  keyboardKey="Enter"
                  ctrl={true}
                />
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
                this.complete()
              }}
            >Save {totalLabels} Labels</button>
          </div>
          {
            this.state.labels.map((label, i) => {
              return <div key={label.label + "-" + i}>{label.label}</div>
            })
          }
        </InlineBlock>
      </Main>
    )
  }

  // render() {
  //   const { url,
  //     data,
  //     fileType,
  //     format,
  //     previewSize,
  //     labelChoices,
  //     labels,
  //     hideLabels
  //   } = this.props

  //   let {
  //     labelType,
  //     labelGeometry
  //   } = this.props

  //   labelType = labelType || "classification"
  //   labelGeometry = labelGeometry || "none"

  //   let Labeler

  //   if (fileType === "image") {
  //     Labeler = Image.Labeler
  //   } else if (fileType === "text") {
  //     Labeler = Text.Labeler
  //   }

  //   return (
  //     <div>
  //       <Labeler
  //         file={{url}}
  //         fileType={fileType}
  //         data={data}
  //         format={format}
  //         size={previewSize}
  //         labelChoices={labelChoices}
  //         labelGeometry={labelGeometry}
  //         labelType={labelType}
  //         labels={labels}
  //         hideLabels={hideLabels}
  //       />
  //     </div>
  //   )
  // }
}

LabelerComponent.defaultProps = {
  labelGeometry: 'none',
  labelType: 'classification'
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
