import { connect } from 'react-redux'
import React, { Component } from 'react'

class SelectName extends Component {
  onSelect(e) {
    const val = e.target.value
    this.props.labelSelected(val)
  }

  render() {
    const {names, label} = this.props
    return (
      <div className="row">
        <div className='col-12'>
          <label>Choose a label category to start labeling</label>
          <select className='form-control' defaultValue={label} onChange={(e) => this.onSelect(e) }>
            <option value=''>Unselected</option>
            {names.map((name, i) => <option  key={i} value={name.name}>{name.name}</option>)}
          </select>
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, props) =>  {
  return {}
}

export default connect(mapStateToProps, {
})(SelectName)
