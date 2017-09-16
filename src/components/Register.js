import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Alert, Button} from 'react-bootstrap'
import { Redirect } from 'react-router';

class Register extends Component {
  constructor(props) {
    super(props);
    this.props.resetMessage();
    this.state = {buttonHover: false}
  }
  render() {
    const { status, onRegister } = this.props

    const textInputStyle = {"borderRadius": "6px", "border": "1px solid grey", "width": "100%", "marginTop": "5px", "textAlign": "center", "height": "20%", "fontSize": "12pt"};
    const formStyle = {"textAlign": "center", "margin": "0 auto", "width": "70%", "height": "300px", "border": "2px solid grey", "paddingLeft": "50px", "paddingRight": "50px", "borderRadius": "6px"}
    //styles for navbar
    const link_style = {"color": "#fff", "textDecoration": "none"}
    const nav_item_style = {"height": "50px", "display": "inline", "marginLeft": "5%", "lineHeight": "50px"}
    const nav_bar_style = {"backgroundColor":"#00b0c7", "height": "50px"}
    const alert_display = {"display": "block"}
    const alert_hide = {"display": "none"}

    //style for button
    const register_button_style = {"marginTop": "5px", "height": "20%", "backgroundColor": "white", "color": "black"}
    const register_button_style_hover = {"marginTop": "5px", "height": "20%", "backgroundColor": "green", "color": "white"}
       //decide whether alert should be hidden or displayed
    if(status !== ""){
      this.alertStyle = alert_display
    } else {
      this.alertStyle = alert_hide
    }

    if(this.state.buttonHover){
      this.registerButtonStyle = register_button_style_hover      
    } else {
      this.registerButtonStyle = register_button_style
    }

    if(this.props.logged_in){
      return (<Redirect push to="/dashboard"/>)
    } else {
      return (
        <div>
          <ul style={nav_bar_style}>
            <li style={nav_item_style}><Link style={link_style} to="/">Login</Link></li>
            <li style={nav_item_style}><Link style={link_style} to="/register">Register</Link></li>
          </ul>
          <form style={formStyle}>
              <h1 style={{"height": "20%"}}>Register</h1>
              <input value={this.props.username} type="text" onChange={this.props.onChangeUsername.bind(this)} placeholder="Username" style={textInputStyle}/>
              <br/>
              <input value={this.props.password} type="text" placeholder="Password" onChange={this.props.onChangePassword.bind(this)} style={textInputStyle}/>
              <br/>
              <Button onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.registerButtonStyle} onClick={() => {onRegister(this.props.username, this.props.password)}} bsSize="large" block>Register</Button>
              <br/>
          </form>
          <div style={{"textAlign": "center", "height": "20%", "marginTop": "5%", "paddingBottom": "60px"}}>
            <Alert bsStyle={"danger"} style={this.alertStyle}>
              <strong>{status}</strong>
            </Alert>
          </div>
          <div style={{"width": "100%", "backgroundColor": "#00b0c7", "textAlign": "center", "height": "50px", "position": "fixed", "bottom": "0", "lineHeight": "50px", "color": "white"}}>
            <p>
              Hello
            </p>
          </div>
        </div>
      )
    }
  }
}

Register.propTypes = {
  status: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired, 
}

export default Register
