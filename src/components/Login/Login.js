import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles'

class Login extends Component {

  alertStyle = "";
  loginButtonStyle = "";
  constructor(props){
    super(props);
    this.props.resetLogin();
    this.state = {buttonHover: false};
  }

  render() {
    const { status, onLogin, logged_in } = this.props
    if(status !== ""){
      this.alertStyle = styles.alert_display
    } else {
      this.alertStyle = styles.alert_hide
    }

    if(this.state.buttonHover){
      this.loginButtonStyle = styles.login_button_style_hover      
    } else {
      this.loginButtonStyle = styles.login_button_style
    }

    if(logged_in){
      return <Redirect push to="/dashboard" />;      
    } else {
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
            <Button onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.loginButtonStyle} onClick={() => {onLogin(this.props.username, this.props.password)}} bsSize="large" block>Login</Button>
          </form>
          <div style={styles.alert_div}>
            <Alert bsStyle={"danger"} style={this.alertStyle}>
              <strong>{status}</strong>
            </Alert>
          </div>
          <div style={styles.footer}>
            <p>
              Login Footer
            </p>
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
