import React, { Component } from 'react'
import SearchBar from "./SearchBar"
class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      term: props.term ? props.term : '',
      focused: false,
      scope: props.scope
    }
    this.onInputChange = this.onInputChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
    this.submit = this.submit.bind(this)
    this.onFocus = this.onFocus.bind(this)
    this.handleKeyPress = this.handleKeyPress.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
  }

  onBlur() {
    this.setState({ focused: false })
  }

  submit(key) {
    const canSearch = this.props.onSearch(this.state.term, key) === false
    console.log(key)
    if (canSearch) {
      this.done()
    }
  }

  cancel() {
    this.done()
    this.setState({ term: '' })
  }

  done() {
    this._searchBar.blur()
  }

  onFocus(e) {
    var val = e.target.value
    e.target.value = ''
    e.target.value = val
    this.setState({ focused: true })
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.submit(e.key)
    }
  }

  handleKeyDown(e) {
    let { scope, term } = this.state

    if (e.keyCode === 27) {
      this.cancel()
    } else if (e.keyCode === 8) {
      if (scope && term === '') {
        this.setState({scope: null})
      }
    }
  }

  onInputChange(term) {
    this.setState({ term })
    setTimeout(() => {
      if (this.state.term == term) {
        this.props.onSearch(this.state.term)
      }
    }, 100)
  }

  render() {
    let { scope } = this.state
    let { placeholder, width } = this.props
    if (!placeholder) placeholder = 'Search'
    if (!width) width = '100%'
    return (
      <div className="search-section">
        <div style={{width}} className={`search-bar${this.state.focused ? ' input-focused' : ''}${scope ? ' scoped' : ''}`}>
          <div className="the-bar">
            <input
              ref={c => (this._searchBar = c)}
              className="input1"
              value={this.state.term}
              placeholder={placeholder}
              maxLength="2048"
              name="search"
              title="Search"
              type="text"
              role="combobox"
              spellCheck="true"
              autoComplete="off"
              autoFocus={this.props.autoFocus}
              onBlur={this.onBlur}
              onFocus={this.onFocus}
              onKeyDown={this.handleKeyDown}
              onKeyPress={this.handleKeyPress}
              onChange={event => this.onInputChange(event.target.value)}
            />
            <div className='scope' >{scope}</div>
            <div className="search-right">
              <div className="search-button" onClick={this.submit}>
                <svg focusable="false" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        <style>
          {SearchBar.css}
        </style>
      </div>
    )
  }
}

export default Search
