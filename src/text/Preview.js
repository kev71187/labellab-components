import React, { Component } from 'react'
import styled from 'styled-components'

const TextBox = styled.pre`
  overflow: scroll;
  height: 100%;

  &:hover {
    cursor: pointer;
    background-color: #f3f3f3;
  }

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1; 
  }

  &::-webkit-scrollbar-thumb {
    background: lightgrey; 
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #grey; 
  }
`

// Create a <Wrapper> react component that renders a <section> with
// some padding and a papayawhip background
const Wrapper = styled.section`
  padding: 4em;
  background: papayawhip;
`
class Preview extends Component {
  constructor(props) {
    super()
    this.state = {
      contents: props.data || null
    }
  }
  componentDidMount() {
    const { file, type, size, json} = this.props
    if (this.state.contents) {
      fetch(file.url).then((resp) => {
        if (type === "json") {
          resp.json().then((text) => {
            this.setState({contents: text})
          })
        } else {
          resp.text().then((text) => {
            this.setState({contents: text})
          })
        }
      })
    }
  }
  onClick(e) {
    if (this.props.onClick) {
      this.props.onClick(e)
    }
  }
  render() {
    const { file, size, type } = this.props
    const { contents } = this.state

    if (!file) return null

    const style = {
      width: size + 'px',
      height: size + 'px',
      position: 'relative',
      zIndex: 1,
    }

    let out = ""

    if (contents) {
      switch(type) {
        case "json":
          out = JSON.stringify(contents, null, 2)
          break
        default:
          out = contents
          break
      }
    }

    return <div
      className="ll-text"
      style={style}
      onClick={e => this.onClick(e)}>
        <TextBox>
          {out}
        </TextBox>
      </div>
  }
}

export default Preview
