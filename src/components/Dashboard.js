import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ChangePassword from './ChangePassword/ChangePassword'
import { Redirect } from 'react-router';
import ResetUsername from './ResetUsername/ResetUsername'
import ResetPassword from './ResetPassword/ResetPassword'

class Dashboard extends Component {

  render() {
    //styles for navbar
    const link_style = {"margin": "0px", "padding": "0px", "color": "#fff", "textDecoration": "none"}
    const nav_item_style = {height: "50px", display: "inline", "marginLeft": "5%", "lineHeight": "50px"}
    const nav_bar_style = {"backgroundColor":"#00b0c7", height: "50px"}

    //if the user isn't logged in yet display Login page
    if(!this.props.logged_in){
      return (<Redirect push to="/"/>)
    }
    return (
      <div>
        <ul style={nav_bar_style}>
          <li style={nav_item_style}><Link style={link_style} to="/dashboard">Dashboard</Link></li>
          <li style={nav_item_style} onClick={()=> this.props.logout()}><Link style={link_style} to="/">Logout</Link></li>
        </ul>
        <div style={{"animation":"moveInL 1s"}}>
          <div style={{"textAlign": "center"}}>
            <h1>{this.props.value}</h1>
          </div>
          <div style={{"marginTop": "10px"}}>
            <ChangePassword
              onResetPassword={(username, oldPassword, newPassword, newConfirmPassword) => this.props.store.dispatch({type: "CHANGE_PASSWORD", data: {"username": username, "oldPassword": oldPassword, "newPassword": newPassword, "newConfirmPassword": newConfirmPassword}})}
              onChangeOldPassword={(event) => this.props.store.dispatch({type: "CHANGE_OLD_CHANGE", data: {"oldPassword": event.target.value}})}
              resetMessage={(event) => this.props.store.dispatch({type: "RESET_MESSAGE_CHANGE"})}
              onChangeNewPassword={(event) => this.props.store.dispatch({type: "CHANGE_NEW_CHANGE", data: {"newPassword": event.target.value}})}
              onChangeNewConfirmPassword={(event) => this.props.store.dispatch({type: "CHANGE_NEW_CONFIRM_CHANGE", data: {"newConfirmPassword": event.target.value}})}
              oldPassword={this.props.store.getState().change_password.oldPassword}
              newPassword={this.props.store.getState().change_password.newPassword}
              newConfirmPassword={this.props.store.getState().change_password.newConfirmPassword}
              status={this.props.store.getState().change_password.message}
              username={this.props.store.getState().login.username}
            />
          </div>
          <div style={{"marginTop": "10px"}}>
            <ResetPassword
            status={this.props.store.getState().reset_password.message}
            username={this.props.store.getState().reset_password.username}
            onResetPassword={(username) => this.props.store.dispatch({type: "RESET_PASSWORD", data: {"username": username}})}
            onChangeUsername={(event) => this.props.store.dispatch({type: "CHANGE_USERNAME_RESET", data: {"username": event.target.value}})}
            resetMessage={() => this.props.store.dispatch({type: "RESET_PASSWORD_RESET"})}
            />
          </div>
          <div style={{"marginTop": "10px", "paddingBottom": "60px"}}>
            <ResetUsername
              status={this.props.store.getState().reset_username.message}
              email={this.props.store.getState().reset_username.email}
              onChangeEmail={(event) => this.props.store.dispatch({type: "CHANGE_EMAIL_RESET_USERNAME", data: {"email": event.target.value}})}
              onResetUsername={(email) => this.props.store.dispatch({type: "RESET_USERNAME", data: {"email": email}})}
              resetMessage={() => this.props.store.dispatch({type: "RESET_USERNAME_RESET_MESSAGE"})}
            />
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Dashboard
