import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Alert, Button} from 'react-bootstrap'
import { Redirect } from 'react-router';
import { CSSTransitionGroup } from 'react-transition-group'
import styles from './styles'
class Read extends Component {
  constructor(props) {
    super(props);
    this.state = {comicButtonStyleID: 0, comicButtonStyle: false, read_hover: false, last_comic_id: 0, last_comic_type: ""}
    
  }
  render() {
      var readListItems;    
      var read_message = ""    
      if(this.props.read != null && this.props.read.length == 0){
        read_message = "inline-block"     
      } else {
        read_message = "none"  
        readListItems = this.props.read.map((item) => {
          var comicMiddleStyle = styles.comic_middle 
          var comicButtonStyleLoc = styles.comic_buttons
          if(this.state.comicButtonStyleID == item.id && this.state.comicButtonStyle && this.state.read_hover){
            comicMiddleStyle = styles.comic_middle_hover
            comicButtonStyleLoc = styles.comic_buttons_hover
          } else if((this.state.last_comic_id == item.id) && (this.state.last_comic_type === "read")){
          comicMiddleStyle = styles.comic_middle_hover_out
          comicButtonStyleLoc = styles.comic_buttons_hover_out
          }
          return (
            <div onMouseLeave={() => {this.setState({"last_comic_type": "read", "comicButtonStyle": false,"read_hover": false})}} onMouseEnter={() => {this.setState({"comicButtonStyle": true, "comicButtonStyleID": item.id, "read_hover": true})}}  className="comic_container" key={item.id} style={{"backgroundColor": "white", "marginTop": "10px", "verticalAlign": "baseline", "float": "left", "width": "18%","height": "300px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
              <h4 style={{"fontSize": "14px", "margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "20px", "marginTop": "5px"}}>{item.title}</h4>
              <img src={item.thumbnail.path + '/portrait_incredible.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 265px", "verticalAlign": "baseline", "marginTop": "5px"}}/>
              <div onClick={() => {this.props.setMainState({"modal_state": "block", "modal_comic": item, "modal_open": true, last_comic_type: "read"})}} style={comicMiddleStyle}>
              </div>
            </div>)    
        })     
      }
      return (
      <div>
        <div style={styles.read_div}>
        <img style={{"marginTop": "120px", "width":"90%", display: read_message}}src={require("../../img/empty_read.png")}/>
        {readListItems}
        </div>
      </div>
      )
    }
  }

export default Read
