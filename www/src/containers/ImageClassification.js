import React, { Component } from 'react';
import Display from "../components/Display"
import Labeler from "../components/image/Labeler"
import items from '../assets/imageData.js'
console.log(items)

export default class extends Component {
  render() {
    return <Display>
      <Labeler item={items.classification}/>
    </Display>
  }
}

