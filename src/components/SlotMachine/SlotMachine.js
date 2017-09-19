import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles';
class SlotMachine extends Component {
  spinButton = "";
  autoSpinButton = "";
  componentWillMount(){
    this.state = {spinButtonHover: false, loading: false, autoSpinHover: false}; 
    console.log("SlotMachine Component");
  }

  render() {
      const {a, b, c, d, e, f, g, h, i} = this.props;
      if(this.props.status !== ""){
        if(this.props.status.includes("You won!")){
            this.alertStyle = {'style': styles.alert_display, 'style-type': 'success'}
        } else {
            this.alertStyle = {'style': styles.alert_display, 'style-type': 'danger'}
        }
      } else {
          this.alertStyle = {'style': styles.alert_hide, 'style-type': 'danger'}
      }

      if(this.state.spinButtonHover){
        this.spinButton = styles.reset_button_style_hover      
      } else {
          this.spinButton = styles.reset_button_style
      }

      console.log(this.state.autoSpinHover)      
      if(this.state.autoSpinHover){
        this.autoSpinButton = styles.auto_button_style_hover      
      } else {
        this.autoSpinButton = styles.auto_button_style 
      }

      if(this.props.auto && !this.props.loading){
        this.props.changeNumbersAuto()
      }

      //make sure slots aren't clicked twice
      if(!this.props.loading && this.state.loading){
        this.state.loading = false
      }

      return (
        <div>
          <form style={styles.formStyle}>
            <h1 style={{"textAlign": "center"}}>Slot Machine</h1>
            <table style={{"margin": "0 auto"}}>
              <tr>
                <td style={styles.slot_column}>
                  {a}
                </td>
                <td style={styles.slot_column}>
                  {b}
                </td>
                <td style={styles.slot_column}>
                  {c}
                </td>
              </tr>
              <tr>
                <td style={styles.slot_column}>
                  {d}
                </td>
                <td style={styles.slot_column}>
                  {e}
                </td>
                <td style={styles.slot_column}>
                  {f}
                </td>
              </tr>
              <tr>
                <td style={styles.slot_column}>
                  {g}
                </td>
                <td style={styles.slot_column}>
                  {h}
                </td>
                <td style={styles.slot_column}>
                  {i}
                </td>
              </tr>
            </table>
            <div style={{"textAlign": "center", "marginTop": "10px"}}>
              <Button onMouseEnter={() => this.setState({spinButtonHover: true})} onMouseOut={() => this.setState({spinButtonHover: false})} style={this.spinButton} onClick={() => {
                if(!this.state.loading){
                  this.state.loading = true;
                  this.props.changeNumbers()
                }}}>Spin</Button>
              <Button style={this.autoSpinButton} onClick={() => {
                if(!this.state.loading){
                  this.state.loading = true;
                  if(this.state.autoSpinHover){
                    this.setState({autoSpinHover: false})
                    this.props.cancelAuto();
                  } else {
                    this.setState({autoSpinHover: true})
                    this.props.changeNumbersAuto(this.props.auto)
                  }
                }
                }}>Auto Spin</Button>
            </div>
            <div style={{"margin": "0 auto", "marginTop": "10px", "textAlign": "center", "height": "50px", "lineHeight": "50px", "border": "1px solid grey"}}>{this.props.points} Credits</div>
            <div style={styles.alert_div}>
                <Alert bsStyle={this.alertStyle["style-type"]} style={this.alertStyle.style}>
                    <strong>{this.props.status}</strong>
                </Alert>
            </div>
          </form>
        </div>)
  }
}

SlotMachine.propTypes = { 
}

export default SlotMachine
