import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles'

class Login extends Component {

  alertStyle = "";
  loginButtonStyle = "";

  componentWillMount(){
    this.state = {buttonHover: false};    
  }

  render() {
    if(this.props.status !== ""){
      this.alertStyle = styles.alert_display
    } else {
      this.alertStyle = styles.alert_hide
    }

    if(this.state.buttonHover){
      this.loginButtonStyle = styles.login_button_style_hover      
    } else {
      this.loginButtonStyle = styles.login_button_style
    }

    if(this.props.logged_in === true){
      return (<Redirect push to="/dashboard" />)     
    } else {
      console.log("Here");
      return (
        <div>
          <ul style={styles.nav_bar_style}>
            <li style={styles.nav_item_style}><Link style={styles.link_style} to="/">Login</Link></li>
            <li style={styles.nav_item_style}><Link style={styles.link_style} to="/register">Register</Link></li>
          </ul>
          <form style={styles.formStyle}>
            <h1 style={styles.header}>Login</h1>
            <input type="text" value={this.props.username} onChange={this.props.onChangeUsername.bind(this)} placeholder="Username" style={styles.text_input_style}/>
            <br/>
            <input type="text" value={this.props.password} placeholder="Password" onChange={this.props.onChangePassword.bind(this)} style={styles.text_input_style}/>
            <br/>
            <Button onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.loginButtonStyle} onClick={() => {this.props.onLogin(this.props.username, this.props.password)}} bsSize="large" block>Login</Button>
          </form>
          <div style={styles.alert_div}>
            <Alert bsStyle={"danger"} style={this.alertStyle}>
              <strong>{this.props.status}</strong>
            </Alert>
          </div>
        </div>
      )
    }
  }
}

Login.propTypes = {
  status: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,  
  logged_in: PropTypes.bool.isRequired,    
}

export default Login
