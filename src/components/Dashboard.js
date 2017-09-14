import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'

class Dashboard extends Component {

  render() {
    //styles for navbar
    const link_style = {"margin": "0px", "padding": "0px", "color": "#fff", "textDecoration": "none"}
    const nav_item_style = {height: "50px", display: "inline", "marginLeft": "5%", "lineHeight": "50px"}
    const nav_bar_style = {"backgroundColor":"#00b0c7", height: "50px"}
    return (
      <div>
        <ul style={nav_bar_style}>
          <li style={nav_item_style}><Link style={link_style} to="/dashboard">Dashboard</Link></li>
          <li style={nav_item_style} onClick={()=> this.props.logout()}><Link style={link_style} to="/">Logout</Link></li>
        </ul>
        <div style={{"textAlign": "center"}}>
          <h1>{this.props.value}</h1>
        </div>
      </div>
    )
  }
}

Dashboard.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Dashboard
