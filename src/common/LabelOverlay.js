import React, { Component } from 'react'
export default (props) => {
  const {name, color} = props
  const style = {backgroundColor: color, color: "#fff", padding: "1px 5px", borderRadius: "2px", position: "absolute", top: "5px", left: "5px"}
  return <div style={style} className="ll-label">{name}</div>
}
