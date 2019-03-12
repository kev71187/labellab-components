import React, { Component } from 'react';

export default class extends Component {
  render() {
    return <div className="row">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            {this.props.children}
          </div>
        </div>
      </div>
    </div>
  }
}

