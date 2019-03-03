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
import Label from './common/Label'
import {generateId} from "./utils/ids"
import {IMAGE_SIZE} from "./constants/image"
import ButtonSuccess from "./components/ButtonSuccess"
import ButtonSecondary from "./components/ButtonSecondary"
import Colors from "./constants/colors"

const Main = styled.div`
  display: flex;
  @media (max-width: 986px) {
    display: block;
    .ll-bounding {
      margin: 0 auto;
    }
  }
`

const Title = styled.h4`
  text-transform: capitalize;
  margin-bottom: 15px;
  text-align: center;
`

const InlineBlock = styled.div`
  display: inline-block;
  vertical-align: top;
  width: 100%;
  @media (max-width: 986px) {
    width: auto;
    &.ll-classification {
      margin-top: 15px;
    }
    margin: 0 auto;
    display: block;
  }
`
const MainContent = styled.div`
  @media (max-width: 986px) {
    margin: 0 auto;
  }
`

class LabelerComponent extends Component {
  constructor(props) {
    super()
    this.state = {
      dimensions: null,
      current: this.defaultLabel(props),
      labels: props.labels || []
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

  defaultLabel(props) {
    const {labelType, labelGeometry} = props
    let state = {}

    if (labelGeometry !== 'none') {
      state.geometry = []
    }

    return {
      uuid: generateId(),
      labelType,
      labelGeometry,
      label: null,
      options: {
      },
      state,
    }
  }

  onChange(e, type) {
    let current = JSON.parse(JSON.stringify(this.state.current))
    if (type === "label") {
      current.label = e
    } else {
      current.state[type] = e
    }

    this.next(current)
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

    if (dimensions) {
      current.options = {
        dimensions
      }
    }

    return current
  }

  amountComplete(current) {
    const dag = this.dag()
    const count = dag.requires.filter((f) => {
      if (f === "label") return current.label
      if (f === "geometry") return current.state.geometry && current.state.geometry.length > 0
      return true
    }).length
    return [count, dag.requires.length]
  }

  validLabel(current) {
    const ac = this.amountComplete(current)
    return ac[0] === ac[1]
  }

  next(c) {
    let current = c || this.state.current
    let labels = this.state.labels

    if (this.validLabel(current)) {
      const label = this.toLabel(c)
      labels.push(label)
      current = this.defaultLabel(this.props)
    }

    this.setState({labels, current})
    return labels
  }

  complete() {
    let {labels} = this.state
    this.props.onComplete(labels)
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

  renderPreview() {
    const { url,
      labelChoices,
      data,
      labelGeometry,
      fileType
    } = this.props

    const {labels} = this.state

    if (labelGeometry !== 'none') {
      return <Preview
        fileType={fileType}
        style={{marginTop: "5px"}}
        url={url}
        size={100}
        data={data}
        labels={this.state.labels}
      />
    }
  }

  renderEditControls() {
    { false && this.validLabel(current) &&
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
  }

  renderFinishControls() {
    const {labels} = this.state
    const totalLabels = labels.length

    return <div style={{textAlign: "left", display: "flex", marginTop: "15px"}}>
      <ButtonSecondary
        style={{flex: 1}}
        disabled={totalLabels > 0}
        onClick={() => {
          if (confirm("Confirm this file does not belong in this dataset")) {
            this.props.onReject()
          }
        }}
      >Reject</ButtonSecondary>
      <ButtonSuccess
        disabled={totalLabels === 0}
        style={{marginLeft: "10px", flex: 1}}
        onClick={() => {
          this.complete()
        }}
      >Save All</ButtonSuccess>
    </div>
  }

  renderRightPanel() {
    const {
      labelChoices,
      hideLabels,
      labelType,
      labelGeometry,
      hover,
    } = this.props
    const {labels, current} = this.state
    const ac = this.amountComplete(current)

    return <InlineBlock className="ll-classification" style={{marginLeft: "15px", maxWidth: "800px"}}>
      <div>
        <div style={{height: "290px"}}>
          <div style={{marginBottom: "5px", color: Colors.red}}>
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
            autoFocus={ac[1] - ac[0] === 1}
            labels={labelChoices}
            selected={ this.state.current.label }
            onSelect={(label) => {
              this.onChange(label, "label")
            }}
          />
        </div>
        <h6 style={{marginTop: "10px"}}>
          Complete Labels: {labels.length}
        </h6>
        <div style={{wordBreak: "break-all"}}>
          {
            this.state.labels.map((label, i) => {
              return <span key={label.label + "-" + i} style={{marginRight: "5px", marginTop: "10px", display: "inline-block"}} >
                <Label name={label.label}></Label>
              </span>
            })
          }
        </div>
      </div>
      { this.renderPreview() }
      { this.renderFinishControls() }
    </InlineBlock>
  }

  renderHelpText() {
    const { helpText, labelGeometry, fileType } = this.props

    let help = `classify this ${fileType}`

    if (labelGeometry === "box") {
      help = `box and ${help}`
    } else if (labelGeometry === "polygon") {
      help = `bound and ${help}`
    }

    if ( helpText) {
      help = helpText
    }

    return <Title>{help}</Title>
  }

  renderLabeler() {
    const {
      url,
      data,
      fileType,
      previewSize,
      labelType,
      labelGeometry,
    } = this.props
    const {labels} = this.state
    const file = {url, data}
    const size = previewSize || IMAGE_SIZE
    let LabelerWrapper = Default
    let Context = Text.Preview

    if (fileType === "image") {
      Context = Image.Image
    }

    if (labelGeometry === "box") {
      if (fileType !== "image") {
        return this.notSupported()
      }
      LabelerWrapper = BoxLabeler
    } else if (labelGeometry === "polygon") {
      if (fileType !== "image") {
        return this.notSupported()
      }
      LabelerWrapper = PolygonLabeler
    }

    return <LabelerWrapper
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
  }

  render() {
    const {fileType, url, data} = this.props

    return (
      <div>
        { this.renderHelpText()}
        <Main className="main-labeler">
          <InlineBlock>
            <MainContent>
              { this.renderLabeler() }
            </MainContent>
          </InlineBlock>
          { this.renderRightPanel() }
        </Main>
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
  hover: PropTypes.bool,
  onComplete: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
}
export default LabelerComponent
