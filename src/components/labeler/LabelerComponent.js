import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
// import Text from './text'
import Image from '../image'
import KeyWatch from '../common/KeyWatch'
import StateInterface from "./StateInterface"
import StatePreview from "./StatePreview"
import PolygonLabeler from '../labelers/PolygonLabeler'
import BoxLabeler from '../labelers/BoxLabeler'
import Default from '../Default'
import Colors from "../../constants/colors"
import Dags from "../../utils/dags"
import {generateId} from "../../utils/ids"
import {IMAGE_SIZE} from "../../constants/image"
import InlineBlock from  './InlineBlock'
import HelpText from  './HelpText'

const Main = styled.div`
  display: flex;
  @media (max-width: 986px) {
    display: block;
    .ll-bounding {
      margin: 0 auto;
    }
  }
`
const MainContent = styled.div`
  @media (max-width: 986px) {
    margin: 0 auto;
  }
`
export default class extends Component {
  constructor(props) {
    super()
    const labels = props.labels || []

    labels.forEach((label) => {
      if (!label.uuid) {
        label.uuid = generateId()
      }
    })

    this.state = {
      dimensions: null,
      current: this.defaultLabel(props),
      labels,
      editing: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      if (this._obj) {
        this._obj.dimensions().then((dimensions) => {
          this.setState({dimensions})
          // this.workOn()
        }).catch((e) => {
          console.log(e)
        })
      }
    },1)
  }

  workOn() {
    console.log("remove me", this.state)
    const {labels} = this.state
    setTimeout(() => {
      this.labelClicked(labels[labels.length - 1])
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
    let current = this.state.current
    if (type === "label") {
      current.label = e
    } else {
      current.state[type] = e
    }
    this.setState({current})

    // if (!this.autoSave(current)) {
    //   this.setState({})
    // }
  }

  dag() {
    const { file, labelType, labelGeometry, labelChoices } = this.props
    if (labelGeometry === "box" || labelGeometry === "polygon") {
      return Dags.geometry
    }

    return Dags.label
  }


  toLabel(current) {
    const {labelGeometry} = this.props
    const {dimensions} = this.state

    if (dimensions && labelGeometry !== "none") {
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

  autoSave(c) {
    let current = c || this.state.current
    let labels = this.state.labels
    if (this.savedLabel(current)) return false

    if (this.validLabel(current)) {
      const label = this.toLabel(c)
      if (label.state && Object.keys(label.state).length === 0) {
        delete(label.state)
      }
      if (label.state && Object.keys(label.options).length === 0) {
        delete(label.options)
      }
      labels.push(label)
      current = this.defaultLabel(this.props)
    }

    this.setState({labels, current, editing: false})
    return labels
  }

  onComplete() {
    let {labels} = this.state
    this.props.onComplete(labels)
  }

  onReject() {
    this.props.onReject()
  }

  removeLabel(label) {
    const labels = this.state.labels.filter((l) => { return label.uuid !== l.uuid})
    this.props.onRemove && this.props.onRemove(label)
    this.setState({labels, editing: false, current: this.defaultLabel(this.props)})
  }

  complete() {
    const ac = this.amountComplete(this.state.current)
    return ac[0] === ac[1]
  }

  shouldEdit(current) {
    setTimeout(() => {
      if (current.uuid === this.state.current.uuid && !this.complete()) {
        this.setState({editing: true})
      }
    }, 1)
  }

  savedIndex() {
    return this.state.labels.findIndex((t) => t.uuid == this.state.current.uuid)
  }

  labelClicked(label) {
    if (!label.uuid) {
      label.uuid = generateId()
    }
    this.setState({current: JSON.parse(JSON.stringify(label)), editing: true})
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


  onCancel() {
    this.setState({editing: false,
      current: this.defaultLabel(this.props)
    })
  }

  onSave() {
    const {current} = this.state
    const savedIndex = this.savedIndex()


    if (savedIndex !== -1) {
      this.state.labels[savedIndex] = current
    } else {
      const labels = this.autoSave(current)
      this.props.onSave && this.props.onSave(current)
      return labels
    }

    this.props.onSave && this.props.onSave(current)

    this.setState({
      editing: false,
      current: this.defaultLabel(this.props),
    })
  }

  savedLabel(c) {
    let current = c || this.state.current
    return this.state.labels.find((l) => l.uuid === current.uuid)
  }

  getLabelWrapper() {
    const {
      fileType,
      labelGeometry,
    } = this.props

    if (labelGeometry === "box") {
      if (fileType !== "image") return this.notSupported()
      return BoxLabeler
    } else if (labelGeometry === "polygon") {
      if (fileType !== "image") return this.notSupported()
      return PolygonLabeler
    }

    return Default
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
    const {labels, current} = this.state
    const file = {url, data}
    const size = previewSize || IMAGE_SIZE
    const LabelerWrapper = this.getLabelWrapper()

    let Context = Text.Preview

    if (fileType === "image") {
      Context = Image.File
    }

    return <LabelerWrapper
        key={current.uuid}
        labelState={current.state}
        size={size}
        dimensions={this.state.dimensions}
        bounds={this.props.labelMetadata && this.props.labelMetadata.bounds}
        onChange={() => {
          this.setState({})
        }}
        onComplete={(e, type) => {
          this.onChange(e, type)
          this.shouldEdit(current)
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

  onSelect(label) {
    this.onChange(label, "label")
    this.shouldEdit(label)
  }

  renderStatePreview() {
    const {
      labelType,
      labelGeometry,
      url,
      data
    } = this.props

    const {
      labels,
    } = this.state

    return <StatePreview
      labels={labels}
      url={url}
      data={data}
      labelType={labelType}
      labelGeometry={labelGeometry}
      labelClicked={(label) => this.labelClicked(label)}
    />
  }

  renderStateInterface() {
    const {
      labelChoices,
      hideLabels,
      labelType,
      labelGeometry,
      hover,
    } = this.props

    const {
      labels,
      editing,
      current
    } = this.state

    const callbacks = {
      onCancel: () => this.onCancel(),
      onRemove: (label) => this.removeLabel(label),
      onSave: () => this.onSave(),
      onSelect: (label) => this.onSelect(label),
      onComplete: () => this.onComplete(),
      onReject: () => this.onReject(),
    }
    return <StateInterface
      labelChoices={labelChoices}
      savedLabel={this.savedLabel(current)}
      hideLabels={hideLabels}
      labelType={labelType}
      labelGeometry={labelGeometry}
      hover={hover}
      labels={labels}
      editing={editing}
      label={current}
      amountComplete={this.amountComplete(current)}
      dimensions={this.state.dimensions}
      callbacks={callbacks}
    />
  }

  render() {
    const {fileType, url, data, helpText, labelGeometry} = this.props

    return (
      <div>
        <HelpText
          helpText={helpText} labelGeometry={labelGeometry} fileType={fileType}
        />
        <Main className="main-labeler">
          <InlineBlock>
            <MainContent>
              { this.renderLabeler() }
            </MainContent>
            { this.renderStatePreview()}
          </InlineBlock>
          { this.renderStateInterface()}
        </Main>
      </div>
    )
  }
}
