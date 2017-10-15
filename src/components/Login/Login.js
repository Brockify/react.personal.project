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
    this.state = {buttonHover: false, alertStyle: "", forgotpass: false, register: false};    
    console.log("Login Component");
  }

  componentWillUnmount(){
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
    } else if(this.state.register) {
      return (<Redirect push to="register" />)      
    } else {
      return (
        <div className="one">
          <div style={{"borderRadius": "15px", "backgroundColor":"white", "width": "80%", "margin": "0 auto", "border": "1px solid black", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", "animation": "moveInL 1s", "overflow": "hidden","maxWidth": "700px"}}>
            <div style={{ "fontSize": "18pt", "color": "white", "height": "60px", "backgroundColor": "#ff6666", "textAlign": "center", "lineHeight": "60px"}}>
              Login
            </div>
           <div style={{"backgroundColor":"white"}}>
                <form style={styles.formStyle}>
                <input type="text" value={this.props.username} onChange={this.props.onChangeUsername.bind(this)} placeholder="Username" style={styles.text_input_style}/>
                <br/>
                <input type="text" value={this.props.password} placeholder="Password" onChange={this.props.onChangePassword.bind(this)} style={styles.text_input_style}/>
                <br/>
                <Button onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.loginButtonStyle} onClick={() => {this.props.onLogin(this.props.username, this.props.password)}} bsSize="large" block>Login</Button>
                <br/>
                <input className="loginSubButtons" onChange={() => {}} value="Need an account?" type="button" onClick={() => this.setState({register: true})}/>
                <br/>
                <input className="loginSubButtons" onChange={() => {}} onClick={() => this.setState({forgotpass: true})} value="Forgot password?"/>
                </form>
            </div>
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
