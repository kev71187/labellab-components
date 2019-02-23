import React, { Component } from 'react'
import Image from './Image'
import {IMAGE_SIZE} from "../constants/image"

class Labeler extends Component {
  // constructor() {
  //   super()
  //   this.state = this.defaultState()
  // }

  render() {
    const { file } = this.props
    const size = this.props.size || IMAGE_SIZE

    if (!file) return this.renderEmpty()

    return (
      <div className="labeler">
        <Image
          ref={c => (this._obj = c)}
          file={file}
          size={size}
          rotation={0}
        />
      </div>
    )
  }
}

export default Labeler
