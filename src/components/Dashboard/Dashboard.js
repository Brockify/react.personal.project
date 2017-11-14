import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ChangePassword from '../ChangePassword/ChangePassword'
import { Redirect } from 'react-router';
import ResetUsername from '../ResetUsername/ResetUsername'
import ResetPassword from '../ResetPassword/ResetPassword'
import Search from '../Search/Search'
import Library from '../Library/Library'
import Unread from '../Unread/Unread'
import Read from '../Read/Read'
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
  navController = "";  
  comic_image_src_global = "";
  modal_comic = "";
  state_global = ""
  unread_nav_class = "unread_nav_unclicked"
  read_nav_class = "read_nav_unclicked"
  library_nav_class = "library_nav_clicked"  
  nav_background_color = "#3882b7"
  nav_animation = "none"
  constructor(props){
    super(props)
    this.state = {"nav_last_clicked": "", "nav_controller": "library", "comic_modal_read_url": "", "comic_modal_read_button_display": {display: "none", width: "33%.3", read_width: "0%"}, "modal_button_function": "", "comic_read_src": "", "modal_button_text": "", "last_comic_type": "", "last_comic_id": 0, "comic_middle_style": styles.comic_middle, "comic_middle_hover": false, "read_hover": false,"unread_hover": false, "library_hover": false, "modal_open": false, "unread_nav": false,"read_nav": false,  "read_more": false, "read_more_message": "Show More", "unread_more": false, "unread_more_message": "Show More",  modal_state: "", modal_comic: {thumbnail: ""}}
    var cachedUser = JSON.parse(localStorage.getItem("user"));
    if(cachedUser != null){
      this.props.setDashboard({"unread": cachedUser.unread, "read": cachedUser.read});
    }
  }

  checkReadNow(){
    var found = false;            
    var url = "";
    if(this.state.modal_comic != null && this.state.modal_comic.urls != null && this.state.modal_comic.urls.length > 0){
      for(var j = 0; j < this.state.modal_comic.urls.length; j++){
        if(this.state.modal_comic.urls[j].type == "reader"){
          found = true;
          this.state.comic_modal_read_url = 'https://read.marvel.com/#/book/' + this.state.modal_comic.digitalId
        }
      }
      if(found){
        this.state.comic_modal_read_button_display = {"display": "inline-block", "width": "25%", "read_width": "25%"};                  
      } else {
        this.state.comic_modal_read_button_display = {"display": "none", "width": "33.3%", "read_width": "0%"};          
      }      
    } 
  }

  render() {
    //styles for navbar
    const link_style = {"paddingLeft": "10%", "width": "10%", "float": "left", "color": "#fff", "textDecoration": "none", "height": "50px", "lineHeight": "50px", "fontSize": "18pt"}
    const nav_item_style = {height: "50px", display: "inline", "marginLeft": "5%", "lineHeight": "50px"}

    //just to check wheter the reader should be active or not
    if(this.state.comic_read_src === ""){
      this.comic_image_div = (props) => {
        return (
            <img src={this.state.modal_comic.thumbnail.path + '/portrait_uncanny.' + this.state.modal_comic.thumbnail.extension} style={{"objectFit": "fill", "verticalAlign": "baseline", "marginTop": "5px"}}/>
        )};
    } else { 
      this.comic_image_src_global = this.state.comic_read_src; 
      this.modal_comic = this.state.modal_comic
      this.comic_image_div = (props) => {
        return (
            <iframe src={this.state.comic_modal_read_url} style={{"border" :"none", "width": "100%", "height": "500px"}}></iframe>
        )};
    }
    if(document.getElementById("search") != null){
      this.searchChanged(document.getElementById("search").value);
    }

    //modal for when an item is clicked checks
    if(this.state.modal_open){
      this.checkReadNow();
      this.modal_style = styles.comic_modal_open
    } else {
      this.checkReadNow();      
      if(this.state.modal_state == "none"){
         this.modal_style = styles.comic_modal_close
      } else {
        this.modal_style = styles.comic_modal        
      }
    }

    if(this.state.last_comic_type == "unread"){
      this.state.modal_button_text = "Switch"
      this.state.modal_button_function = function(props, username, id){props.switchToRead(username, id)}
    } else if(this.state.last_comic_type == "read") {
      this.state.modal_button_function = function(props, username, id){props.switchToUnread(username, id)}      
      this.state.modal_button_text = "Switch"
    } else {
      this.state.modal_button_function = function(username, id){};
    }
    //***********************************
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

    //if the user isn't logged in yet display Login page
    if(!this.props.logged_in){
      return (<Redirect push to="/"/>)
    }

    if(this.state.nav_controller == "library"){
      this.unread_nav_class = "unread_nav_unclicked"
      this.read_nav_class = "read_nav_unclicked"
      this.library_nav_class = "library_nav_clicked"  
      this.nav_background_color = "#3882b7"
      this.page_background_color = "rgba(56, 130, 183, .2)"
      if(this.state.nav_last_clicked == ""){
        this.nav_animation = "none"
      } else if(this.state.nav_last_clicked == "unread"){
        this.nav_animation = "navToLibraryFromUnread"
      } else if(this.state.nav_last_clicked == "read"){
        this.nav_animation = "navToLibraryFromRead"          
      }
      this.state.nav_last_clicked = "library"
      this.navController = (props) => {        
        return (
          <Library
            library={this.props.library}
            setMainState={(state) => this.setState(state)}
            />
        );
      }
    } else if(this.state.nav_controller == "unread"){
      this.nav_background_color = "#a33934"  
      this.page_background_color = "rgba(163, 57, 52, .2)"        
      this.unread_nav_class = "unread_nav_clicked" 
      this.read_nav_class = "read_nav_unclicked"
      this.library_nav_class = "library_nav_unclicked"
      if(this.state.nav_last_clicked == ""){
        this.nav_animation = "none"
      } else if(this.state.nav_last_clicked == "read"){
        this.nav_animation = "navToUnreadFromRead"
      } else if(this.state.nav_last_clicked == "library"){
        this.nav_animation = "navToUnreadFromLibrary"          
      }
      this.state.nav_last_clicked = "unread"        
      this.navController = (props) => {
        return (
          <Unread
            unread={this.props.unread}
            setMainState={(state) => this.setState(state)}
            />
        );
      }
    } else if(this.state.nav_controller == "search"){
      this.navController = (props) => {
        return (
          <Search
            hideSearchModal={() => this.props.hideSearchModal()}
            searchComic={(searchString, digitalOnly) => this.props.store.dispatch({"type": "SEARCH", data: {"searchString": searchString, "digitalOnly": digitalOnly}})}
            comicData={this.props.store.getState().search.comicData}
            addComic={(username, comic) => this.props.addComic(username, comic)}
            username={this.props.username}
            showComic={(item) => this.setState({"modal_state": "block", "modal_comic": item})}
            setMainState={(state) => this.setState(state)}
          />
        );
      }
    } else {
      this.nav_background_color = "#929547"        
      this.unread_nav_class = "unread_nav_unclicked"     
      this.read_nav_class = "read_nav_clicked"
      this.library_nav_class = "library_nav_unclicked" 
      this.page_background_color = "rgba(146, 149, 71, .2)"                
      if(this.state.nav_last_clicked == ""){
        this.nav_animation = "none"
      } else if(this.state.nav_last_clicked == "library"){
        this.nav_animation = "navToReadFromLibrary"
      } else if(this.state.nav_last_clicked == "unread"){
        this.nav_animation = "navToReadFromUnread"          
      }
      this.state.nav_last_clicked = "read"        
      this.navController = (props) => {
        return (
          <Read
            read={this.props.read}
            setMainState={(state) => this.setState(state)}
            />
        );
      }
    }

    const nav_bar_style = {"animation": this.nav_animation + " 1s", "backgroundColor":this.nav_background_color, height: "70px", lineHeight: "70px"}      

    return (
      <div style={{backgroundColor: this.page_background_color, minHeight: "92vh", animation: this.nav_animation + "Body 1s"}}>
        <div style={nav_bar_style}>
          <div style={link_style}>
          <h4 style={{"height": "70px", "lineHeight":"70px", "width": "300px"}}>
            My Comic Collection
          </h4>
          </div>
          <div style={{"float": "left", "width": "90%", "marginTop": "8px", "paddingRight": "5%", "marginTop": "20px"}}>
            <input onClick={() => this.props.logout()} style={styles.nav_buttons} type="button" value="Logout"/>
            <input value="Search" type="button" style={styles.nav_button_search_button} onClick={() => {
                    var searchString = document.getElementById("search").value                                          
                    this.props.searchComic(searchString, false)}}/>
            <input onChange={() => {
              var searchString = document.getElementById("search").value
              if(searchString.length == 0){
                this.setState({"nav_controller": this.state.nav_last_clicked})
              }
            }} style={styles.nav_button_search} id="search" type="input" placeholder="Search..."/>
          </div>
        </div>
        <div>
          <div style={{"width": "100%", "height": "50px", "lineHeight": "50px", "textAlign": "center", "backgroundColor": "rgb(0, 184, 230)"}}>
            <div onClick={() => this.setState({nav_controller: "library"})} className={this.library_nav_class}>
            My Library ({this.props.library.length})
            </div>
            <div onClick={() => this.setState({nav_controller: "unread"})} className={this.unread_nav_class}>
            Unread ({this.props.unread.length})
            </div>
            <div onClick={() => this.setState({nav_controller: "read"})} className={this.read_nav_class}>
            Read ({this.props.read.length})
            </div>
          </div>
          <this.navController/>
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
                <div style={{"border": "1px solid black", "marginBottom": "10px", "marginTop": "10px", "height": "100px"}}>
                <h4 style={{"height": "30px", "lineHeight": "30px"}}>Actions</h4>
                  <div style={{"width": "100%", "margin": "0 auto"}}>
                    <div style={{"width":"100%", "margin": "0 auto"}}>
                      <div style={{"float": "left", "width": this.state.comic_modal_read_button_display.width}}>
                        <Button onClick={() => {
                        this.setState({"modal_state": "none", "modal_open": false})
                        this.state.modal_button_function(this.props, this.props.username, this.state.modal_comic.id)}} style={{"width": "80px", "backgroundColor": "#7CB27C", "color": "white", "margin": "0 auto"}}>{this.state.modal_button_text}</Button>
                      </div>
                      <div style={{"float": "left", "width": this.state.comic_modal_read_button_display.width}}>
                        <Button onClick={() => {this.setState({"modal_state": "none", "modal_open": false})>
                        this.props.deleteComic(this.props.username, this.state.modal_comic, this.state.last_comic_type[0].toUpperCase() + this.state.last_comic_type.slice(1))}} style={{"width": "80px", "margin": "0 auto", "backgroundColor": "#ff6666", "color": "white"}}>Delete</Button>
                      </div>
                      <div style={{"float": "left", "width": this.state.comic_modal_read_button_display.width}}>
                      <Button onClick={() => {
                        var win = window.open(this.state.modal_comic.urls[0].url, '_blank');   
                        win.focus();                 
                        }} style={{"width": "80px", "margin": "0 auto", "backgroundColor": "#00b8e6", "color": "white"}}>Details</Button>
                      </div>
                      <div style={{"float": "left", "width": this.state.comic_modal_read_button_display.read_width}}>
                        <Button onClick={() => this.setState({"comic_read_src": this.state.modal_comic.urls})} style={{"width": "80px", "margin": "0 auto", "backgroundColor": "#00b8e6", "color": "white", "display": this.state.comic_modal_read_button_display.display}}>Read</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  searchChanged(text){
    if(text.length > 1 && this.props.comicData != null && this.props.comicData.count > 0){
      this.state.nav_controller = "search"
    } else {
      if(this.state.nav_last_clicked != "" && text.length > 0){
        this.state.nav_controller = this.state.nav_last_clicked            
      }
    }
  }
}

Dashboard.propTypes = {
  value: PropTypes.string.isRequired,
}

export default Dashboard
