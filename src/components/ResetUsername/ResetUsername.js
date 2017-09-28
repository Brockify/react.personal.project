import React, { Component } from 'react'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles'

class ResetUsername extends Component {
    alertStyle = "";
    resetButtonStyle = "";
    
    componentWillMount(){
        this.state = {buttonHover: false}
        console.log("ResetUsername Component");        
        this.props.resetMessage();        
    }

    render() {
        if(this.props.status !== ""){
            if(this.props.status === "Username sent to your email."){
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
                <h4>Forgot Username?</h4>
                <input value={this.props.email} onChange={(event) => this.props.onChangeEmail(event)} style={styles.text_input_style} placeholder="Email"/>
                <br/>
                <Button onClick={() => this.props.onResetUsername(this.props.email)} onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.resetButtonStyle}  bsSize="large" block>Submit</Button>
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

ResetUsername.propTypes = {
}

export default ResetUsername
