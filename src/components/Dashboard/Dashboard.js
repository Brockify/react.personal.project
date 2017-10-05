import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ChangePassword from '../ChangePassword/ChangePassword'
import { Redirect } from 'react-router';
import ResetUsername from '../ResetUsername/ResetUsername'
import ResetPassword from '../ResetPassword/ResetPassword'
import Search from '../Search/Search'
import styles from './styles';
class Dashboard extends Component {
  searchStyle = styles.modal;
  lastSearch = false
  constructor(props){
    super(props)
  }
  render() {
    //styles for navbar
    const link_style = {"paddingLeft": "10%", "width": "10%", "float": "left", "color": "#fff", "textDecoration": "none", "height": "50px", "lineHeight": "50px", "fontSize": "18pt"}
    const nav_item_style = {height: "50px", display: "inline", "marginLeft": "5%", "lineHeight": "50px"}
    const nav_bar_style = {"backgroundColor":"#ff6666", height: "50px"}
    if(this.props.search){
      this.searchStyle = styles.modal_open
      this.lastSearch = true;      
    } else {
      if(this.lastSearch){
        this.searchStyle = styles.modal_close
      } else {
        this.searchStyle = styles.modal
      }
      this.lastSearch = false;      
    }
    //if the user isn't logged in yet display Login page
    if(!this.props.logged_in){
      return (<Redirect push to="/"/>)
    }
    return (
      <div className="one_nav">
        <div style={this.searchStyle}>
          <Search
            hideSearchModal={() => this.props.hideSearchModal()}
          />
        </div>
        <div style={nav_bar_style}>
          <div style={link_style}>
            Dashboard
          </div>
          <div style={{"float": "left", "width": "90%", "height": "35px", "marginTop": "6px", "paddingRight": "5%"}}>
            <input onClick={() => this.props.showSearchModal()} className="dashboard_nav_button_logout" type="button" value="+ Add Comic"/>
          </div>
        </div>
        <div style={{"animation":"moveInL 1s"}}>
          <input type="button" onClick={() => this.props.logout()}/>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Dashboard
