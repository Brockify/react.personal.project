import React, { Component } from 'react'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles'
import {Link} from 'react-router-dom'

class ResetPassword extends Component {
    alertStyle = "";
    resetButtonStyle = "";
    
    componentWillMount(){
        this.state = {buttonHover: false}
        console.log("ResetPassword Component");        
        this.props.resetMessage();
    }

    render() {
        if(this.props.status !== ""){
            if(this.props.status === "Password reset! Check your email."){
                this.alertStyle = {'style': styles.alert_display, 'style-type': 'success'}
            } else {
                this.alertStyle = {'style': styles.alert_display, 'style-type': 'danger'}
            }
        } else {
            this.alertStyle = {'style': styles.alert_hide, 'style-type': 'danger'}
        }

        if(this.state.buttonHover){
            this.resetButtonStyle = styles.reset_button_style_hover      
        } else {
            this.resetButtonStyle = styles.reset_button_style
        }

        //styles for navbar
        return (
        <div>
            <ul style={styles.nav_bar_style}>
            <li style={styles.nav_item_style}><Link style={styles.link_style} to="/">Login</Link></li>
            <li style={styles.nav_item_style}>
              <Link style={styles.link_style} to="/register">Register</Link>
              </li>
          </ul>
            <div style={{"animation": "moveInR 1s"}}>
                <form style={styles.formStyle}>
                    <h4>Reset Password</h4>
                    <input value={this.props.username} onChange={(event) => this.props.onChangeUsername(event)} style={styles.text_input_style} placeholder="Username"/>
                    <br/>
                    <Button onClick={() => this.props.onResetPassword(this.props.username)} onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.resetButtonStyle}  bsSize="large" block>Submit</Button>
                    <div style={styles.alert_div}>
                        <Alert bsStyle={this.alertStyle["style-type"]} style={this.alertStyle.style}>
                            <strong>{this.props.status}</strong>
                        </Alert>
                    </div>
                </form>
            </div>
        </div>
        )
    }
}

ResetPassword.propTypes = {
}

export default ResetPassword
