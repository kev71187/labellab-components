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
import Default from './Default'
import Preview from './Preview'
import {IMAGE_SIZE} from "./constants/image"

const Main = styled.div`
  display: flex;
`

const Title = styled.h4`
  text-transform: capitalize;
  margin-bottom: 15px;
  text-align: center;
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
      if (this._obj) {
        this._obj.dimensions().then((dimensions) => {
          this.setState({dimensions})
        }).catch((e) => {
          console.log(e)
        })
      }
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

    return Dags.label
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

  notSupported() {
    const {
      fileType,
      labelType,
      labelGeometry
    } = this.props

    return (
      <div>
          {`labelGeometry: ${labelGeometry} and fileType: ${fileType} combination is not currently supported. Help get this supported by contributing `}
        <a href="https://github.com/kev71187/labellab-components">Here</a>
      </div>
    )
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
      labelGeometry,
      helpText,
      hover
    } = this.props
    const {labels, done} = this.state

    const file = {url, data}
    const size = previewSize || IMAGE_SIZE
    const totalLabels = this.totalLabels()
    const ac = this.amountComplete()

    let LabelerWrapper = Default
    let help = `classify this ${fileType}`

    let Context = Text.Preview

    if (fileType === "image") {
      Context = Image.Image
    }

    if (labelGeometry === "box") {
      if (fileType !== "image") {
        return this.notSupported()
      }
      LabelerWrapper = BoxLabeler
      help = `box and ${help}`
    } else if (labelGeometry === "polygon") {
      if (fileType !== "image") {
        return this.notSupported()
      }
      help = `bound and ${help}`
      LabelerWrapper = PolygonLabeler
    }

    if ( helpText) {
      help = helpText
    }

    return (
      <div>
        { !done &&
          <div>
            <Title>{help}</Title>
            <Main className="main-labeler">
              <InlineBlock>
                <LabelerWrapper
                  key={labels.length}
                  size={size}
                  dimensions={this.state.dimensions}
                  onComplete={(e, type) => {
                    this.onChange(e, type)
                  }}
                >
                  <Context
                    ref={c => (this._obj = c)}
                    file={file}
                    size={size}
                    rotation={0}
                  />
                </LabelerWrapper>
              </InlineBlock>
              <InlineBlock style={{marginLeft: "15px", width: "100%"}}>
                <div>
                <div style={{height: "290px"}}>
                  <div style={{marginBottom: "5px"}}>
                    Requirements { ac[0] } / {[ac[1]]}
                  </div>
                  <KeyWatch
                    onSubmit={(e) => {
                      if (totalLabels > 0 && hover) {

                        this.complete()
                      }
                    }}
                    keyboardKey="Enter"
                    shift={true}
                  />
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
                          if (hover) {
                            this.addAnother()
                          }
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
              </div>
            </InlineBlock>
          </Main>
        </div>
        }
        { done &&
          <Preview
            fileType={fileType}
            url={url}
            size={size}
            data={data}
            labels={this.state.labels}
          />
        }
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
  helpText: PropTypes.string,
  interval: PropTypes.number,
  hover: PropTypes.bool
}
export default LabelerComponent
