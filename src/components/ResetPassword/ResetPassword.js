import React, { Component } from 'react'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles'
import {Link} from 'react-router-dom'

class ResetPassword extends Component {
    resetButtonStyle = "";
    alertDivStyle = styles.alert_hide
    
    componentWillMount(){
        this.state = {buttonHover: false}
        console.log("ResetPassword Component");        
        this.props.resetMessage();
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
            this.resetButtonStyle = styles.reset_button_style_hover      
        } else {
            this.resetButtonStyle = styles.reset_button_style
        }

        //styles for navbar
        return (
        <div className="one">
             <div style={{"borderRadius": "15px", "backgroundColor":"white", "width": "80%", "margin": "0 auto", "border": "1px solid black", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", "animation": "moveInR 1s", "overflow": "hidden","maxWidth": "700px"}}>
                <div style={{ "fontSize": "18pt", "color": "white", "height": "60px", "backgroundColor": "#ff6666", "textAlign": "center", "lineHeight": "60px"}}>
                Reset Password
                </div>
                <div style={{"backgroundColor": "white"}}>
                    <form style={styles.formStyle}>
                        <input value={this.props.username} onChange={(event) => this.props.onChangeUsername(event)} style={styles.text_input_style} placeholder="Username"/>
                        <br/>
                        <Button onClick={() => this.props.onResetPassword(this.props.username)} onMouseOut={() => this.setState({buttonHover: false})} onMouseEnter={() => this.setState({buttonHover: true})} style={this.resetButtonStyle}  bsSize="large" block>Submit</Button>
                    </form>
                </div>
            </div>
            <div style={this.alertDivStyle}>
                <Alert bsStyle={"danger"} style={this.props.alertStyle}>
                    <strong>{this.props.status}</strong>
                </Alert>
            </div>
        </div>
        )
    }
}

ResetPassword.propTypes = {
}

export default ResetPassword
