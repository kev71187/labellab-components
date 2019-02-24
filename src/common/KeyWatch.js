import React, { Component } from 'react'
import PropTypes from 'prop-types'

class KeyWatch extends Component {
  constructor() {
    super()

    this._handleKey = this._handleKey.bind(this)
  }

  _handleKey(event){
    const { keyboardKey, shift, ctrl } = this.props

    if (event.key === keyboardKey && event.shiftKey === shift && event.ctrlKey === ctrl) {
      this.props.onSubmit(event)
    }
  }

  componentWillMount() {
     document.addEventListener("keyup", this._handleKey, false)
   }


   componentWillUnmount() {
      document.removeEventListener("keyup", this._handleKey, false)
   }

  render() {
    return (
      <div/>
    )
  }
}

KeyWatch.defaultProps = {
  ctrl: false,
  shift: false
}

KeyWatch.propTypes = {
  keyboardKey: PropTypes.string.isRequired,
  ctrl: PropTypes.bool,
  shift: PropTypes.bool,
}
export default KeyWatch
