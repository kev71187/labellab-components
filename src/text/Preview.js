import React, { Component } from 'react'

class Preview extends Component {
  constructor() {
    super()
    this.state = {
      contents: null
    }
  }
  componentDidMount() {
    const { file, size } = this.props
    fetch(file.url).then((resp) => {
      resp.text().then((text) => {
        this.setState({contents: text})
      })
    })
  }
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
  render() {
    const { file, size } = this.props
    if (!file) return null

    const style = {
      width: size + 'px',
      height: size + 'px',
      position: 'relative',
      zIndex: 1,
    }

    return <div
      className="ll-text"
      style={style}
      onClick={e => this.onClick(e)}>
        <pre style={{overflow: "scroll", height: "100%"}}>
          {this.state.contents}
         </pre>
        <style>
          {
            `
              .ll-text pre:hover {
                cursor: pointer;
                background-color: #f3f3f3;
              }
              .ll-text pre::-webkit-scrollbar {
                width: 10px;
              }
              /* Track */
              .ll-text pre::-webkit-scrollbar-track {
                background: #f1f1f1; 
              }
              /* Handle */
              .ll-text pre::-webkit-scrollbar-thumb {
                background: lightgrey; 
              }
              /* Handle on hover */
              .ll-text pre::-webkit-scrollbar-thumb:hover {
                background: #grey; 
              }
            `
          }
        </style>
      </div>
  }
}

export default Preview
