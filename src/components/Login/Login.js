import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles'
import { CSSTransitionGroup } from 'react-transition-group'

class Login extends Component {

  loginButtonStyle = "";
  alertDivStyle = styles.alert_div
  componentWillMount(){
    this.state = {buttonHover: false, alertStyle: "", forgotpass: false};    
    console.log("Login Component");
  }

  componentDidMount(){

  }

  render() {
    if(this.props.status !== "" && this.props.alertStyle.display !== "block"){

      //get the window height and change the layout based on it
      var height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      if(height <= 400){
        this.props.showAlert(styles.alert_style_small)    
        this.alertDivStyle = styles.alert_div_small    
      } else {
        this.props.showAlert(styles.alert_style)  
        this.alertDivStyle = styles.alert_div;            
      }
      setTimeout(() => {
        this.props.hideAlert(styles.alert_hide);
      }, 2900)
    }

    if(this.state.buttonHover){
      this.loginButtonStyle = styles.login_button_style_hover      
    } else {
      this.loginButtonStyle = styles.login_button_style
    }

    if(this.props.logged_in){
      //If the user is already logged in or logs in, switch to the dashboard
      this.props.hideAlert(styles.alert_hide);      
      return (<Redirect push to="/dashboard" />)     
    } else if(this.state.forgotpass){
      //if the user clicked "Forgot password?"
      return (<Redirect push to="forgot_pass" />)
    } else {
      return (
        <div>
          <ul style={styles.nav_bar_style}>
            <li style={styles.nav_item_style}><Link style={styles.link_style} to="/">Login</Link></li>
            <li style={styles.nav_item_style}>
              <Link style={styles.link_style} to="/register">Register</Link>
              </li>
          </ul>
          <div style={{"animation": "1s moveInL"}}>
            <form style={styles.formStyle}>
              <h1 style={styles.header}>Login</h1>
              <input type="text" value={this.props.username} onChange={this.props.onChangeUsername.bind(this)} placeholder="Username" style={styles.text_input_style}/>
              <br/>
              <input type="text" value={this.props.password} placeholder="Password" onChange={this.props.onChangePassword.bind(this)} style={styles.text_input_style}/>
              <br/>
              <Button onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.loginButtonStyle} onClick={() => {this.props.onLogin(this.props.username, this.props.password)}} bsSize="large" block>Login</Button>
              <Button style={{height: "14%", "margin-top": "10px"}} onClick={() => this.setState({forgotpass: true})}>Forgot password?</Button>
            </form>
          </div>
          <div style={this.alertDivStyle}>
            <Alert ref="alert" bsStyle={"danger"} style={this.props.alertStyle}>
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
