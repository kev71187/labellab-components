import React, { Component } from 'react'

class ImageComponent extends Component {
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
  dimensions() {
    var promise = new Promise((resolve, reject) => {
      var img = new Image()
      img.onerror = function(e){
        reject(e)
      }
      img.onload = function(){
        var height = img.height
        var width = img.width
        resolve({width, height})

        // code here to use the dimensions
      }

      img.src = this.props.file.url
    })

    return promise
  }
  render() {
    const { file, rotation, size } = this.props
    if (!file) return null

    const imageStyles = {
      width: size + 'px',
      height: size + 'px',
      position: 'relative',
      zIndex: 1,
      background: `#333 url("${file.url}") center/contain no-repeat`,
      transform: `rotate(${this.props.rotation}deg)`
    }

    return <div
      style={imageStyles}
      onClick={e => this.onClick(e)}>
       {this.props.children}
      </div>
  }
}

export default ImageComponent
