import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Alert, Button} from 'react-bootstrap'
import { Redirect } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group'
import styles from './styles'
class Register extends Component {
  alertDivStyle = styles.alert_div       
  constructor(props) {
    super(props);
    this.props.resetMessage();
    this.state = {buttonHover: false}
  }
  render() {
    const { status, onRegister } = this.props

    const textInputStyle = {"borderRadius": "6px", "border": "1px solid grey", "width": "100%", "marginTop": "5px", "textAlign": "center", "height": "15%", "fontSize": "12pt"};
    const formStyle = {"textAlign": "center","margin": "0 auto","padding": "0px","height": "230px","paddingLeft": "6%","paddingRight": "6%","marginTop": "30px"
  }
    //styles for navbar
    const link_style = {"color": "#fff", "textDecoration": "none"}
    const nav_item_style = {"height": "50px", "display": "inline", "marginLeft": "5%", "lineHeight": "50px"}
    const nav_bar_style = {"backgroundColor":"#00b0c7", "height": "50px"}
    const alert_display = {"display": "block"}
    const alert_hide = {"display": "none"}

    //style for button
    const register_button_style = {"marginTop": "5px", "height": "40px","backgroundColor": "#00b8e6", "color": "#f2f2f2"}
    const register_button_style_hover = {"marginTop": "5px", "height": "40px","backgroundColor": "rgba(0, 184, 230, 0.8)", "color": "rgba(242, 242, 242, 0.93)"}
       //decide whether alert should be hidden or displayed

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
      this.registerButtonStyle = register_button_style_hover      
    } else {
      this.registerButtonStyle = register_button_style
    }

    if(this.props.logged_in){
      return (<Redirect push to="/dashboard"/>)
    } else if(this.props.register){
      return (<Redirect push to="/"/>);
    } else {
      return (
        <div className="one">
           <div style={{"borderRadius": "15px", "backgroundColor":"white", "width": "80%", "margin": "0 auto", "border": "1px solid black", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", "animation": "moveInR 1s", "overflow": "hidden","maxWidth": "700px"}}>
            <div style={{ "fontSize": "18pt", "color": "white", "height": "60px", "backgroundColor": "#ff6666", "textAlign": "center", "lineHeight": "60px"}}>
                Register
              </div>
              <form style={formStyle}>
                  <input value={this.props.username} type="text" onChange={this.props.onChangeUsername.bind(this)} placeholder="Username" style={textInputStyle}/>
                  <br/>
                  <input value={this.props.password} type="text" placeholder="Password" onChange={this.props.onChangePassword.bind(this)} style={textInputStyle}/>
                  <br/>
                  <input value={this.props.email} type="text" onChange={this.props.onChangeEmail.bind(this)} placeholder="Email" style={textInputStyle}/>
                  <br/>
                  <Button onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.registerButtonStyle} onClick={() => {onRegister(this.props.username, this.props.password, this.props.email)}} bsSize="large" block>Register</Button>
                  <br/>
              </form>
          </div>
          <div style={this.alertDivStyle}>
            <Alert bsStyle={"danger"} style={this.props.alertStyle}>
              <strong>{status}</strong>
            </Alert>
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
