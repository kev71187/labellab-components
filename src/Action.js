import React, { Component } from 'react'
import { Button } from 'reactstrap'

class Action extends Component {
  render() {
    const {name, callback, disabled, color } = this.props
    let col = color ? color : 'dark'
    return (
      <Button
        color={col}
        onClick={callback}
        style={{marginBottom: '5px', width: '100%'}}
        disabled={disabled}
      >
        { name }
      </Button>
    )
  }
}
export default Action
