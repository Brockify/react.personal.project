import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router';
import {Link} from 'react-router-dom'
import {Button, Alert} from 'react-bootstrap'
import styles from './styles';
var ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class SlotMachine extends Component {
  spinButton = "";
  autoSpinButton = "";
  indicatorStyle = "";
  topIndicatorStyle = "";
  middleIndicatorStyle = "";
  bottomIndicatorStyle = "";
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

      if(this.props.winners.top){
        this.topIndicatorStyle = styles.indicator
      } else {
        this.topIndicatorStyle = styles.indicator_hidden
      }

      if(this.props.winners.middle){
        this.middleIndicatorStyle = styles.indicator
      } else {
        this.middleIndicatorStyle = styles.indicator_hidden
      }

      if(this.props.winners.bottom){
        this.bottomIndicatorStyle = styles.indicator
      } else {
        this.bottomIndicatorStyle = styles.indicator_hidden
      }

      if(this.state.spinButtonHover){
        this.spinButton = styles.reset_button_style_hover      
      } else {
          this.spinButton = styles.reset_button_style
      }

      if(this.props.loading){
        this.topIndicatorStyle = styles.indicator_hidden
        this.bottomIndicatorStyle = styles.indicator_hidden
        this.middleIndicatorStyle = styles.indicator_hidden
        
      }

      if(this.state.autoSpinHover){
        this.autoSpinButton = styles.auto_button_style_hover      
      } else {
        this.autoSpinButton = styles.auto_button_style 
      }

      if(this.props.auto && !this.props.loading){
        setTimeout(() => {
          this.props.changeAutoRender()                    
        }, 1700)
      }

      //make sure slots aren't clicked twice
      if(!this.props.loading && this.state.loading){
        this.state.loading = false
      }

      return (
        <div>
          <form style={styles.formStyle}>
            <h1 style={{"textAlign": "center"}}>Slot Machine</h1>
            <div style={{"float": "left", "width": "80%"}}>
              <table style={{"margin": "0 auto"}}>
                <tr>
                  <td style={{width: "50px"}}>
                    <div style={this.topIndicatorStyle}>
                      @
                    </div>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                      <img src={require("../../img/" + a + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                    <img src={require("../../img/" + b + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                    <img src={require("../../img/" + c + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                </tr>
                <tr>
                  <td style={{width: "50px"}}>
                    <div style={this.middleIndicatorStyle}>
                      @
                    </div>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                    <img src={require("../../img/" + d + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                    <img src={require("../../img/" + e + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                    <img src={require("../../img/" + f + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                </tr>
                <tr>
                  <td style={{width: "50px"}}>
                    <div style={this.bottomIndicatorStyle}>
                      @
                    </div>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                    <img src={require("../../img/" + g + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                    <img src={require("../../img/" + h + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                  <td style={styles.slot_column}>
                    <ReactCSSTransitionGroup transitionName="anim" transitionEnter={true} transitionLeave={false}>
                    <img src={require("../../img/" + i + ".png")} style={{"height": "50px", "width": "50px"}} key={this.props.slotCounter}/>
                    </ReactCSSTransitionGroup>
                  </td>
                </tr>
              </table>
            <div style={{"textAlign": "center", "marginTop": "10px"}}>
              <Button onMouseEnter={() => this.setState({spinButtonHover: true})} onMouseOut={() => this.setState({spinButtonHover: false})} style={this.spinButton} onClick={() => {
                  if(!this.state.loading){
                    this.state.loading = true;
                    this.props.changeNumbers(this.props.auto)
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
                  <strong key={this.props.status}>{this.props.status}</strong>
              </Alert>
            </div>
            </div>
            <div style={{"float": "left", "width": "50%"}}>
              <table style={{"margin": "0 auto"}}>
                <tr>
                  <td>
                    <img src='../../img/1.png'/>
                  </td>
                  <td>
                    <img src='../../img/1.png'/>
                  </td>
                  <td>
                    <img src='../../img/1.png'/>
                  </td>
                </tr>
             </table>
            </div>
          </form>
        </div>)
  }
}

SlotMachine.propTypes = { 
}

export default SlotMachine
