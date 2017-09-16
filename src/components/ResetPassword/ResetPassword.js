import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles'

class ResetPassword extends Component {
    alertStyle = "";
    resetButtonStyle = "";
    
    componentWillMount(){
        this.state = {buttonHover: false}
        console.log("ResetPassword Component");        
    }

    render() {
        if(this.props.status !== ""){
         this.alertStyle = styles.alert_display
        } else {
         this.alertStyle = styles.alert_hide
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
                <h4>Reset Password</h4>
                <input value={this.props.username} onChange={(event) => this.props.onChangeUsername(event)} style={styles.text_input_style} placeholder="Username"/>
                <br/>
                <Button onClick={() => this.props.onResetPassword(this.props.username)} onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.resetButtonStyle}  bsSize="large" block>Submit</Button>
                <div style={styles.alert_div}>
                    <Alert bsStyle={"danger"} style={this.alertStyle}>
                        <strong>{this.props.status}</strong>
                    </Alert>
                </div>
            </form>
        </div>
        )
    }
}

ResetPassword.propTypes = {
}

export default ResetPassword
