import React, { Component } from 'react'
import Search from "./Search"
class Classifier extends Component {
  constructor(props) {
    super()
    const labels = props.labels.sort()
    this.state = {
      defaultLabels: labels,
      labels,
      selected: props.selected,
      term: null
    }
  }

  onSelect(val) {
    const select = this.props.onSelect(val)
    if (select !== false) {
      this.setState({selected: val})
    }
  }

  substring(term, name) {
    let resp = false
    var ii = 0
    for (var i = 0; i < name.length; i++ ) {
      if (name[i] == term[ii]) {
        ii += 1
      }
      if (ii === term.length) break
    }
    return ii === term.length
  }

  valid(item) {
    this.props.valid && this.props.valid(item)
  }
  render() {
    const {labels, selected, term, selectedStyle} = this.state
    const selectedS = selectedStyle || { marginLeft: "5px"}

    if (selected) {
      return <span style={selectedS}>
        {selected.name}
        <a href="javascript:void(0)" style={{marginLeft: "5px"}} onClick={() => {
          this.setState({selected: null})
          this.props.onRemove && this.props.onRemove()
        }}>remove</a>
      </span>
    }

    return (
      <div className={`ll-classifier ${this.state.labels.length > 5 ? 'scrollable' : ''}`}>
        <Search
          placeholder="Type Label"
          term={term}
          autoFocus
          onSearch={(term, key)=> {
            if (key === "Enter") {
              if (labels.length > 0 ) {
                const label = labels[0]
                this.onSelect(label)
              }
            }
            this.setState({
              term,
              labels: term ? this.state.defaultLabels.filter((label) => this.substring(term, label.name)) : this.state.defaultLabels
            })
            if (labels.length === 0) return null
          }}
        />
        <div style={{
          marginTop: "5px",
          borderTop: "1px solid lightgrey",
          WebkitOverflowScrolling: "touch",
          overflowY: "scroll",
          maxHeight: "200px",
          boxShadow: "0 2px 2px 0 rgba(0,0,0,.16),0 0 0 1px rgba(0,0,0,.08)"
        }}>
        { labels.length === 0 && <div style={{padding: "5px"}}>
          No selectable labels
        </div>}
          { labels.map((label, i) => {
            const itemStyle =  {
              padding: "5px 15px",
              borderBottom: "1px solid lightgrey",
            }
            if (labels.length - 1 === i) {
              itemStyle.borderBottom = "none"
            }
            return (

              <div onClick={() => {
                this.onSelect(label)
              }} className="classifier-item" key={i} style={itemStyle}
              value={label.id}>
              <a href="javascript:void(0)">{label.name}</a></div>)
            })
          }
        </div>
        <style>
          {
            `
              .ll-classifier .classifier-item {
                color: rgb(0, 123, 255);
              }
              .ll-classifier.scrollable .classifier-item:hover {
                cursor: pointer;
                background-color: #f3f3f3;
              }
              .ll-classifier.scrollable ::-webkit-scrollbar {
                width: 10px;
              }
              /* Track */
              .ll-classifier.scrollable ::-webkit-scrollbar-track {
                background: #f1f1f1; 
              }
              /* Handle */
              .ll-classifier.scrollable ::-webkit-scrollbar-thumb {
                background: lightgrey; 
              }
              /* Handle on hover */
              .ll-classifier.scrollable ::-webkit-scrollbar-thumb:hover {
                background: #grey; 
              }
            `
          }
        </style>
      </div>
    )
  }
}


export default Classifier
