import React, { Component } from 'react'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles'

class ChangePassword extends Component {
    alertStyle = "";
    resetButtonStyle = "";
    
    constructor(props){
        super(props);
        this.state = {buttonHover: false}
        this.props.resetMessage();
        console.log("ChangePassword Components")
    }

    render() {
        if(this.props.status !== ""){
            if(this.props.status === "Password changed!"){
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
            <form style={styles.formStyle}>
                <h4>Change Password</h4>
                <input value={this.props.oldPassword} onChange={(event) => this.props.onChangeOldPassword(event)} style={styles.text_input_style} placeholder="Old Password"/>
                <br/>
                <input value={this.props.newPassword} onChange={(event) => this.props.onChangeNewPassword(event)} style={styles.text_input_style} placeholder="New Password"/>
                <br/>
                <input value={this.props.newConfirmPassword} onChange={(event) => this.props.onChangeNewConfirmPassword(event)} style={styles.text_input_style} placeholder="Confirm New Password"/>
                <br/>
                <Button onClick={() => this.props.onResetPassword(this.props.username, this.props.oldPassword, this.props.newPassword, this.props.newConfirmPassword)} onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.resetButtonStyle}  bsSize="large" block>Submit</Button>
                <div style={styles.alert_div}>
                    <Alert bsStyle={this.alertStyle["style-type"]} style={this.alertStyle.style}>
                        <strong>{this.props.status}</strong>
                    </Alert>
                </div>
            </form>
        </div>
        )
    }
}

ChangePassword.propTypes = {
}

export default ChangePassword
