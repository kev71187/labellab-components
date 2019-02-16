import { connect } from 'react-redux'
import React, { Component } from 'react'
import { getRandomDocument, createAnnotation} from '../../actions/annotations.js'
import {  doneEditing } from '../../actions/imageLabel.js'
import Image from './Image'

class FreeForm extends Component {
  constructor() {
    super()
    this.state = {
      value: ''
    }
  }

  componentWillMount() {
    const {ddId} = this.props
    if (!ddId) {
      this.fetchRandomDocument()
    }
  }

  fetchRandomDocument() {
    const { dataset } = this.props
    this.props.getRandomDocument(dataset.id, null, false)
  }

  onChange(e) {
    this.setState({value: e.target.value})
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.submit()
    }
  }

  submit() {
    const { daId, ddId, doc, dataset } = this.props
    if (!this.state.value) { return null}
    this.props.createAnnotation({
      document_id: doc.id,
      datasets_document_id: ddId,
      dataset_id: dataset.id,
      type: 'freeform_annotation',
      state: this.state.value
    }).then(() => {
      this.props.doneEditing()
      this.fetchRandomDocument()
    })
  }

  render() {
    const {doc, datasetsDocument} = this.props
    if (!doc) {
      return null
    }

    return (
      <div className="row">
        <div className="col-4">
          <div className="row">
            <label>What is this?</label>
            <input
              autoFocus
              onKeyPress={(e) => this.handleKeyPress(e) }
              className="col-12 form-control" style={{marginBottom: '15px'}} onChange={(e) => this.onChange(e)} placeholder="label" type="text" name="label"/>
            <button className="col-12 btn btn-success"  disabled={this.state.value === ''} onClick={() => this.submit()}>Save</button>
          </div>
        </div>
        <div className='col-8'>
          <Image image={doc.file} rotation={0} />
          <div style={{marginTop: '15px', marginBottom: '15px'}}>
            {datasetsDocument.datasetsAnnotations.map((da) => {
              return <div className='btn btn-primary' key={da.id}>{da.annotation.state}</div>
            })}
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state, props) =>  {
  const {datasetsDocuments} = state.entities
  const datasetsDocument = datasetsDocuments[props.ddId]
  return {datasetsDocument}
}

export default connect(mapStateToProps, {
  getRandomDocument, createAnnotation,
  doneEditing
})(FreeForm)
