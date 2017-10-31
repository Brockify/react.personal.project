import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ChangePassword from '../ChangePassword/ChangePassword'
import { Redirect } from 'react-router';
import ResetUsername from '../ResetUsername/ResetUsername'
import ResetPassword from '../ResetPassword/ResetPassword'
import Search from '../Search/Search'
import styles from './styles';
import {Button} from 'react-bootstrap'
import $ from 'jquery'
class Dashboard extends Component {
  searchStyle = styles.modal;
  lastSearch = false
  unread_style = "";
  read_style = ""  
  modal = null;
  modal_style = "";
  comic_image_div = "";
  comic_image_src_global = "";
  modal_comic = "";
  constructor(props){
    super(props)
    this.state = {"modal_button_function": "", "comic_read_src": "", "modal_button_text": "", "last_comic_type": "", "last_comic_id": 0, "comic_middle_style": styles.comic_middle, "comic_middle_hover": false, "read_hover": false,"unread_hover": false, "library_hover": false,"comicButtonStyleID": 0, "comicButtonStyle": false, "modal_open": false, "unread_nav": false,"read_nav": false,  "read_more": false, "read_more_message": "Show More", "unread_more": false, "unread_more_message": "Show More",  modal_state: "", modal_comic: {thumbnail: ""}}
    var cachedUser = JSON.parse(localStorage.getItem("user"));
    if(cachedUser != null){
      this.props.setDashboard({"unread": cachedUser.unread, "read": cachedUser.read});
    }
  }

  render() {
    //styles for navbar
    const link_style = {"paddingLeft": "10%", "width": "10%", "float": "left", "color": "#fff", "textDecoration": "none", "height": "50px", "lineHeight": "50px", "fontSize": "18pt"}
    const nav_item_style = {height: "50px", display: "inline", "marginLeft": "5%", "lineHeight": "50px"}
    const nav_bar_style = {"backgroundColor":"#ff6666", height: "50px"}
    var unread_message = ""
    var read_message = ""
    var library_message = ""
    var libraryListItems;
    var listItems;
    var readListItems;

    //Add items to list and create listview for unread
    //if the user clicked 'show more'
    if(this.state.unread_more){
      //show 'Show less' if the comics are 10 or less in the unread
      if(this.props.unread.length < 11){
        this.state.unread_more_message = "Show less"
      } else {
        this.state.unread_more_message = "Show all"
      }
      //show animation and show 2 rows
      this.unread_style = styles.unread_div_more      
    } else {
      //if the show more button is not clicked
      //but if the message showed 'show less' (the window was opened by user)
      if(this.state.unread_more_message === "Show less"){
        //close it with animation and show 'Show more'
        this.unread_style = styles.unread_div_less
        this.state.unread_more_message = "Show More";
      } else {
        //if the window was never opened by the user, show it defaulted
        this.unread_style = styles.unread_div              
      }
    }
    this.comic_image_src_global = this.state.comic_read_src; 
    this.modal_comic = this.state.modal_comic
    if(this.state.comic_read_src === ""){
      this.comic_image_div = (props) => {
        return (
            <img src={this.state.modal_comic.thumbnail.path + '/portrait_uncanny.' + this.state.modal_comic.thumbnail.extension} style={{"objectFit": "fill", "verticalAlign": "baseline", "marginTop": "5px"}}/>
        )};
    } else { 
          
      this.comic_image_div = (props) => {
        var url = "";
        for(var j = 0; j < this.comic_image_src_global.length; j++){
          console.log(this.comic_image_src_global[j]);
          if(this.comic_image_src_global[j].type == "reader"){
            url = 'https://read.marvel.com/#/book/' + this.modal_comic.digitalId
          }
        }        
        return (
            <iframe src={url} style={{"border" :"none", "width": "100%", "height": "500px"}}></iframe>
        )};
    }

    //modal for when an item is clicked checks
    if(this.state.modal_open){
      this.modal_style = styles.comic_modal_open
    } else {
      if(this.state.modal_state == "none"){
         this.modal_style = styles.comic_modal_close
      } else {
        this.modal_style = styles.comic_modal        
      }
    }

    if(this.state.last_comic_type == "unread"){
      this.state.modal_button_text = "Read"
      this.state.modal_button_function = function(props, username, id){props.switchToRead(username, id)}
    } else if(this.state.last_comic_type == "read") {
      this.state.modal_button_function = function(props, username, id){props.switchToUnread(username, id)}      
      this.state.modal_button_text = "Unread"
    } else {
      this.state.modal_button_function = function(username, id){};
    }
    //***********************************

    if(this.state.read_more){
      //show 'Show less' if the comics are 10 or less in the unread
      if(this.props.read.length < 11){
        this.state.read_more_message = "Show less"
      } else {
        this.state.read_more_message = "Show all"
      }
      //show animation and show 2 rows
      this.read_style = styles.read_div_more      
    } else {
      //if the show more button is not clicked
      //but if the message showed 'show less' (the window was opened by user)
      if(this.state.read_more_message === "Show less"){
        //close it with animation and show 'Show more'
        this.read_style = styles.read_div_less
        this.state.read_more_message = "Show More";
      } else {
        //if the window was never opened by the user, show it defaulted
        this.read_style = styles.read_div              
      }
    }
    //**********************************************

    //search modal checks
    if(this.props.search){
      this.searchStyle = styles.modal_open
      this.lastSearch = true;      
    } else {
      if(this.lastSearch){
        this.searchStyle = styles.modal_close
      } else {
        this.searchStyle = styles.modal
      }
      this.lastSearch = false;      
    }
        
    //**********************************************
    if(this.props.unread != null && this.props.unread.length == 0){
      unread_message = "No comic books added to library yet or there are no unread comics."      
    } else {
      unread_message = ""  
      listItems = this.props.unread.map((item) => { 
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
            <div onMouseLeave={() => {this.setState({"last_comic_type": "unread", "comicButtonStyle": false,"unread_hover": false})}} onMouseEnter={() => {this.setState({"comicButtonStyle": true, "comicButtonStyleID": item.id, "unread_hover": true})}}  className="comic_container" key={item.id} style={{"verticalAlign": "baseline", "float": "left", "width": "18%","height": "300px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
              <h4 style={{"fontSize": "14px", "margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "20px", "marginTop": "5px"}}>{item.title}</h4>
              <img src={item.thumbnail.path + '/portrait_incredible.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 265px", "verticalAlign": "baseline", "marginTop": "5px"}}/>
              <div onClick={() => {this.setState({"modal_state": "block", "modal_comic": item, "modal_open": true})}} style={comicMiddleStyle}>
              </div>
              <div style={comicButtonStyleLoc}>
                <input onClick={() => {
                  this.state.last_comic_type = "read"
                  this.props.switchToRead(this.props.username, item.id)}} type="button" value="Read" style={{"float": "left","height": "40px", "color": "white", "width": "50%", "backgroundColor": "#7CB27C"}}/>
                <input type="button" onClick={() => {this.props.deleteComic(this.props.username, item, "Unread")}} value="Delete"  style={{"float": "left","height": "40px", "backgroundColor": "#ff6666", "color": "white", "width": "50%"}}/>
              </div>
            </div>)    
      })     
    }

    if(this.props.library != null && this.props.library.length == 0){
      library_message = "No comic books added to library yet."      
    } else {
      library_message = ""  
      libraryListItems = this.props.library.map((item) => {
        var comicMiddleStyle = styles.comic_middle 
        var comicButtonStyleLoc = styles.comic_buttons
        if(this.state.comicButtonStyleID == item.id && this.state.comicButtonStyle && this.state.library_hover){
          comicMiddleStyle = styles.comic_middle_hover
          comicButtonStyleLoc = styles.comic_buttons_hover
        } else if((this.state.last_comic_id == item.id) && (this.state.last_comic_type === "library")){
         comicMiddleStyle = styles.comic_middle_hover_out
         comicButtonStyleLoc = styles.comic_buttons_hover_out
        }
         return (
           <div onMouseLeave={() => {this.setState({"last_comic_type": "library", "comicButtonStyle": false,"library_hover": false})}} onMouseEnter={() => {this.setState({"comicButtonStyle": true, "comicButtonStyleID": item.id, "library_hover": true})}}  className="comic_container" key={item.id} style={{"verticalAlign": "baseline", "float": "left", "width": "18%","height": "300px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
             <h4 style={{"fontSize": "14px", "margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "20px", "marginTop": "5px"}}>{item.title}</h4>
             <img src={item.thumbnail.path + '/portrait_incredible.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 265px", "verticalAlign": "baseline", "marginTop": "5px"}}/>
             <div onClick={() => {this.setState({"modal_state": "block", "modal_comic": item, "modal_open": true})}} style={comicMiddleStyle}>
             </div>
           </div>)    
      })     
    }

    if(this.props.read != null && this.props.read.length == 0){
      read_message = "No comic books added to library yet or there are no unread comics."      
    } else {
      read_message = ""  
      readListItems = this.props.read.map((item) =>{
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
           <div onMouseLeave={() => {this.setState({"last_comic_type": "read", "comicButtonStyle": false,"read_hover": false})}} onMouseEnter={() => {this.setState({"comicButtonStyle": true, "comicButtonStyleID": item.id, "read_hover": true})}}  className="comic_container" key={item.id} style={{"verticalAlign": "baseline", "float": "left", "width": "18%","height": "300px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
             <h4 style={{"fontSize": "14px", "margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "20px", "marginTop": "5px"}}>{item.title}</h4>
             <img src={item.thumbnail.path + '/portrait_incredible.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 265px", "verticalAlign": "baseline", "marginTop": "5px"}}/>
             <div onClick={() => {
               this.state.last_comic_type = "unread"                                 
               this.setState({"modal_state": "block", "modal_comic": item, "modal_open": true})}} style={comicMiddleStyle}>
             </div>
             <div style={comicButtonStyleLoc}>
                <input onClick={() => {this.props.switchToUnread(this.props.username, item.id)}} type="button" value="Unread" style={{"float": "left","height": "40px", "color": "white", "width": "50%", "backgroundColor": "#7CB27C"}}/>
                <input type="button" onClick={() => {this.props.deleteComic(this.props.username, item, "Read")}} value="Delete"  style={{"float": "left","height": "40px", "backgroundColor": "#ff6666", "color": "white", "width": "50%"}}/>
              </div>
           </div>)  
      })     
    }

    //if the user isn't logged in yet display Login page
    if(!this.props.logged_in){
      return (<Redirect push to="/"/>)
    }

    if(this.state.unread_nav){
      return (<Redirect push to="/unread"/>)
    }

    return (
      <div className="one_nav">
        <div style={this.searchStyle}>
          <Search
            hideSearchModal={() => this.props.hideSearchModal()}
            searchComic={(event) => this.props.store.dispatch({"type": "SEARCH", data: {"searchString": event.target.value}})}
            comicData={this.props.store.getState().search.comicData}
            addComic={(username, comic) => this.props.addComic(username, comic)}
            username={this.props.username}
            showComic={(item) => this.setState({"modal_state": "block", "modal_comic": item})}
          />
        </div>
        <div style={nav_bar_style}>
          <div style={link_style}>
            Dashboard
          </div>
          <div style={{"float": "left", "width": "90%", "height": "35px", "marginTop": "8px", "paddingRight": "5%"}}>
            <input onClick={() => this.props.logout()} className="dashboard_nav_button_logout" type="button" value="Logout"/>
            <input onClick={() => this.props.showSearchModal()} className="dashboard_nav_button_logout" type="button" value="+ Add Comic"/>
          </div>
        </div>
        <div>
          <div style={{"color": "white", "width": "100%", "height": "50px", "lineHeight": "50px", "textAlign": "center", "backgroundColor": "#00B8E6"}}>
            My Library {this.props.library.length}
          </div>
          <div style={styles.library_div}>
          {library_message}
          {libraryListItems}
          </div>
          <div style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            More
          </div>
          <div style={{"color": "white", "width": "100%", "height": "50px", "lineHeight": "50px", "textAlign": "center", "backgroundColor": "#00B8E6"}}>
            Unread {this.props.unread.length}
          </div>
          <div style={this.unread_style}>
            {unread_message}
            {listItems}
          </div>
          <div onClick={() => {if(this.state.unread_more_message === "Show less"){this.setState({"unread_more": false})}else if(this.state.unread_more_message === "Show all"){this.setState({"unread_nav": true})}else{if(this.props.unread.length > 5){this.setState({"unread_more": true, "unread_more_message": "Show all"})}}}} style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            {this.state.unread_more_message}
          </div>
          <div style={{"color": "white", "width": "100%", "height": "50px", "lineHeight": "50px", "textAlign": "center", "backgroundColor": "#00B8E6"}}>
            Read {this.props.read.length}
          </div>
          <div style={this.read_style}>
            {read_message}
            {readListItems}
          </div>
          <div onClick={() => {if(this.state.read_more_message === "Show less"){this.setState({"read_more": false})}else if(this.state.read_more_message === "Show all"){this.setState({"read_nav": true})}else{if(this.props.read.length > 5){this.setState({"read_more": true, "read_more_message": "Show all"})}}}} style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            {this.state.read_more_message}
          </div>
        </div>
        <div style={this.modal_style} id="comicModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document" style={{"opacity": "1"}}>  
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{"margin": "0 auto"}} id="exampleModalLabel">{this.state.modal_comic.title}</h5>
                <button type="button" className="close" onClick={() => this.setState({"comic_read_src": "", "modal_state": "none", "modal_open": false})} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{"textAlign": "center", "zIndex": "999"}}>
                <this.comic_image_div/>              
                <div style={{"border": "1px solid black", "marginTop": "5px"}}>
                <h4 style={{"height": "30px", "lineHeight": "40px"}}>Description</h4>
                <div style={{"borderTop": "1px solid black"}}>
                  <p style={{"marginLeft": "5px", "padding": "0px", "textAlign": "left"}}>
                    {this.state.modal_comic.description}
                  </p>
                </div>
                </div>
                <div style={{"border": "1px solid black", "marginBottom": "10px", "marginTop": "10px"}}>
                <h4 style={{"height": "30px", "lineHeight": "40px"}}>Actions</h4>
                <div style={{"padding": "5px"}}>
                  <Button onClick={() => {
                    this.setState({"modal_state": "none", "modal_open": false})
                    this.state.modal_button_function(this.props, this.props.username, this.state.modal_comic.id)}} style={{"backgroundColor": "#7CB27C", "color": "white"}}>{this.state.modal_button_text}</Button>
                  <Button onClick={() => {this.setState({"modal_state": "none", "modal_open": false})>
                    this.props.deleteComic(this.props.username, this.state.modal_comic, this.state.last_comic_type[0].toUpperCase() + this.state.last_comic_type.slice(1))}} style={{"marginLeft": "5px", "backgroundColor": "#ff6666", "color": "white"}}>Delete</Button>
                  <Button onClick={() => this.setState({"comic_read_src": this.state.modal_comic.urls})} style={{"marginLeft": "5px", "backgroundColor": "#00b8e6", "color": "white"}}>View on Marvel</Button>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Dashboard
