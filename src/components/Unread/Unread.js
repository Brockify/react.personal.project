import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Alert, Button} from 'react-bootstrap'
import { Redirect } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group'
import styles from './styles'
class Unread extends Component {
  constructor(props) {
    super(props);
    this.state = {comicButtonStyleID: 0, comicButtonStyle: false, unread_hover: false, last_comic_id: 0, last_comic_type: ""}
    
  }
  render() {
      var unreadListItems;    
      var unread_message = ""    
      if(this.props.unread != null && this.props.unread.length == 0){
        unread_message = "inline-block"     
      } else {
        unread_message = "none"  
        unreadListItems = this.props.unread.map((item) => {
          var comicMiddleStyle = styles.comic_middle 
          var comicButtonStyleLoc = styles.comic_buttons
          if(this.state.comicButtonStyleID == item.id && this.state.comicButtonStyle && this.state.unread_hover){
            comicMiddleStyle = styles.comic_middle_hover
            comicButtonStyleLoc = styles.comic_buttons_hover
          } else if((this.state.last_comic_id == item.id) && (this.state.last_comic_type === "unread")){
          comicMiddleStyle = styles.comic_middle_hover_out
          comicButtonStyleLoc = styles.comic_buttons_hover_out
          }
          return (
            <div onMouseLeave={() => {this.setState({"last_comic_type": "unread", "comicButtonStyle": false,"unread_hover": false})}} onMouseEnter={() => {this.setState({"comicButtonStyle": true, "comicButtonStyleID": item.id, "unread_hover": true})}}  className="comic_container" key={item.id} style={{"backgroundColor": "white", "marginTop": "10px","verticalAlign": "baseline", "float": "left", "width": "18%","height": "300px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
              <h4 style={{"fontSize": "14px", "margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "20px", "marginTop": "5px"}}>{item.title}</h4>
              <img src={item.thumbnail.path + '/portrait_incredible.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 265px", "verticalAlign": "baseline", "marginTop": "5px"}}/>
              <div onClick={() => {this.props.setMainState({"modal_state": "block", "modal_comic": item, "modal_open": true, last_comic_type: "unread"})}} style={comicMiddleStyle}>
              </div>
            </div>)    
        })     
      }
      return (
      <div>
        <div style={styles.unread_div}>
        <img style={{"marginTop": "120px", "width":"90%", display: unread_message}}src={require("../../img/empty_unread.png")}/>
        {unreadListItems}
        </div>
      </div>
      )
    }
  }

export default Unread
