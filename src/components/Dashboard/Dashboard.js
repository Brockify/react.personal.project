import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ChangePassword from '../ChangePassword/ChangePassword'
import { Redirect } from 'react-router';
import ResetUsername from '../ResetUsername/ResetUsername'
import ResetPassword from '../ResetPassword/ResetPassword'
import Search from '../Search/Search'
import styles from './styles';
import $ from 'jquery'
class Dashboard extends Component {
  searchStyle = styles.modal;
  lastSearch = false
  unread_style = "";
  modal = null;
  constructor(props){
    super(props)
    this.state = {"unread_nav": false, "unread_more": false, "unread_more_message": "Show more",  modal_state: "none", modal_comic: {thumbnail: ""}}
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
        this.state.unread_more_message = "Show more";
      } else {
        //if the window was never opened by the user, show it defaulted
        this.unread_style = styles.unread_div              
      }
    }
    if(this.props.unread != null && this.props.unread.length == 0){
      unread_message = "No comic books added to library yet or there are no unread comics."      
    } else {
      unread_message = ""  
      listItems = this.props.unread.map((item) =>
        <div key={item.id} style={{"verticalAlign": "baseline", "float": "left", "width": "18%","height": "300px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "backgroundColor": "white", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
          <h4 style={{"fontSize": "14px", "margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "20px", "marginTop": "5px"}}>{item.title}</h4>
          <img onClick={() => {this.setState({"modal_state": "block", "modal_comic": item})}} src={item.thumbnail.path + '/portrait_incredible.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 225px", "verticalAlign": "baseline", "marginTop": "5px"}}/>
          <div style={{"width": "90%", "margin": "0 auto"}}>
            <input onClick={() => {this.props.switchToRead(this.props.username, item.id)}} type="button" value="Read" style={{"float": "left", "backgroundColor": "green", "color": "white", "width": "50%"}}/>
            <input type="button" onClick={() => {this.props.deleteComic(this.props.username, item)}} value="Delete"  style={{"float": "left", "backgroundColor": "red", "color": "white", "width": "50%"}}/>
          </div>
        </div>
      )     
    }

    if(this.props.read != null && this.props.read.length == 0){
      read_message = "No comic books added to library yet or there are no unread comics."      
    } else {
      console.log('got hur')
      read_message = ""  
      readListItems = this.props.read.map((item) =>
        <div key={item.id} style={{"verticalAlign": "baseline", "float": "left", "width": "18%","height": "300px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "backgroundColor": "white", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
          <h4 style={{"fontSize": "14px", "margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "20px", "marginTop": "5px"}}>{item.title}</h4>
          <img onClick={() => {this.setState({"modal_state": "block", "modal_comic": item})}} src={item.thumbnail.path + '/portrait_incredible.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 225px", "verticalAlign": "baseline", "marginTop": "5px"}}/>
          <div style={{"width": "90%", "margin": "0 auto"}}>
            <input onClick={() => {this.props.switchToUnread(this.props.username, item.id)}} type="button" value="Unread" style={{"float": "left", "backgroundColor": "green", "color": "white", "width": "50%"}}/>
            <input type="button" onClick={() => {this.props.deleteComic(this.props.username, item)}} value="Delete"  style={{"float": "left", "backgroundColor": "red", "color": "white", "width": "50%"}}/>
          </div>
        </div>
      )     
    }
    //**********************************************
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

    if(this.state.unread_nav){
      console.log("unread")
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
            My Library
          </div>
          <div style={{"height": "150px", "backgroundColor": "white"}}>
          </div>
          <div style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            More
          </div>
          <div style={{"color": "white", "width": "100%", "height": "50px", "lineHeight": "50px", "textAlign": "center", "backgroundColor": "#00B8E6"}}>
            Unread
          </div>
          <div style={this.unread_style}>
            {unread_message}
            {listItems}
          </div>
          <div onClick={() => {if(this.state.unread_more_message === "Show less"){this.setState({"unread_more": false})}else if(this.state.unread_more_message === "Show all"){this.setState({"unread_nav": true})}else{this.setState({"unread_more": true, "unread_more_message": "Show all"})}}} style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            {this.state.unread_more_message}
          </div>
          <div style={{"color": "white", "width": "100%", "height": "50px", "lineHeight": "50px", "textAlign": "center", "backgroundColor": "#00B8E6"}}>
            Read
          </div>
          <div style={styles.read_div}>
            {read_message}
            {readListItems}
          </div>
          <div style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            More
          </div>
        </div>
        <div onClick={() => this.setState({"modal_state": "none"})} className="modal" style={{"display": this.state.modal_state, "overflow": "auto", "backgroundColor": "rgba(169,169,169,.6)", "animation": "fadeInModal 1s"}} id="comicModal" tabindex="-1" role="dialog" aria-hidden="true">
          <div className="modal-dialog" role="document" style={{"opacity": "1"}}>  
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" style={{"margin": "0 auto"}} id="exampleModalLabel">{this.state.modal_comic.title}</h5>
                <button type="button" className="close" onClick={() => this.setState({"modal_state": "none"})} aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body" style={{"textAlign": "center"}}>
                <img src={this.state.modal_comic.thumbnail.path + '/portrait_uncanny.' + this.state.modal_comic.thumbnail.extension} style={{"objectFit": "fill", "verticalAlign": "baseline", "marginTop": "5px"}}/>
                <h4 style={{"marginTop": "5px"}}>Description</h4>
                <p>
                  {this.state.modal_comic.description}
                </p>
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
