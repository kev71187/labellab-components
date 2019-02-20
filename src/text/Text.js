import React, { Component } from 'react'

class TextComponent extends Component {
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
  render() {
    const { file, rotation, size } = this.props
    if (!file) return null

    const style = {
      width: size + 'px',
      height: size + 'px',
      position: 'relative',
      zIndex: 1,
    }

    return <div
      style={style}
      onClick={e => this.onClick(e)}>
       {this.props.children}
      </div>
  }
}

export default TextComponent
