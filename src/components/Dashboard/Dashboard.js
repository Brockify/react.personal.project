import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import ChangePassword from '../ChangePassword/ChangePassword'
import { Redirect } from 'react-router';
import ResetUsername from '../ResetUsername/ResetUsername'
import ResetPassword from '../ResetPassword/ResetPassword'
import Search from '../Search/Search'
import styles from './styles';
class Dashboard extends Component {
  searchStyle = styles.modal;
  lastSearch = false
  unread_style = "";
  constructor(props){
    super(props)
    this.state = {"unread_more": false, "unread_more_message": "Show more"}
    var cachedUser = JSON.parse(localStorage.getItem("user"));
    if(cachedUser != null){
      this.props.setDashboard({"unread": cachedUser.unread});
    }
  }
  render() {
    //styles for navbar
    const link_style = {"paddingLeft": "10%", "width": "10%", "float": "left", "color": "#fff", "textDecoration": "none", "height": "50px", "lineHeight": "50px", "fontSize": "18pt"}
    const nav_item_style = {height: "50px", display: "inline", "marginLeft": "5%", "lineHeight": "50px"}
    const nav_bar_style = {"backgroundColor":"#ff6666", height: "50px"}
    var unread_message = ""
    var listItems;

    if(this.state.unread_more){
      this.unread_style = styles.unread_div_more
    } else {
      this.unread_style = styles.unread_div      
    }

    //Add items to list and create listview for unread
    if(this.props.unread != null && this.props.unread.length == 0){
      unread_message = "No comic books added to library yet or there are no unread comics."      
    } else {
      unread_message = ""  
      listItems = this.props.unread.map((item) =>
        <div key={item.id} style={{"verticalAlign": "baseline", "float": "left", "width": "18%","height": "300px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "backgroundColor": "white", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
          <h4 style={{"margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "10%", "marginTop": "5px"}}>{item.title}</h4>
          <img src={item.thumbnail.path + '/portrait_xlarge.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 75%", "verticalAlign": "baseline", "marginTop": "5px"}}/>
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
    return (
      <div className="one_nav">
        <div style={this.searchStyle}>
          <Search
            hideSearchModal={() => this.props.hideSearchModal()}
            searchComic={(event) => this.props.store.dispatch({"type": "SEARCH", data: {"searchString": event.target.value}})}
            comicData={this.props.store.getState().search.comicData}
            addComic={(username, comic) => this.props.addComic(username, comic)}
            username={this.props.username}
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
          <div onClick={() => this.setState({"unread_more": true})} style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            More
          </div>
          <div style={{"color": "white", "width": "100%", "height": "50px", "lineHeight": "50px", "textAlign": "center", "backgroundColor": "#00B8E6"}}>
            Unread
          </div>
          <div style={this.unread_style}>
            {unread_message}
            {listItems}
          </div>
          <div onClick={() => this.setState({"unread_more": true, "unread_more_message": "Show all"})} style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            {this.state.unread_more_message}
          </div>
          <div style={{"color": "white", "width": "100%", "height": "50px", "lineHeight": "50px", "textAlign": "center", "backgroundColor": "#00B8E6"}}>
            Read
          </div>
          <div style={{"height": "150px", "backgroundColor": "white"}}>
          </div>
          <div style={{"color": "white", "height": "20px", "backgroundColor": "#00b8e6", "textAlign": "center", "lineHeight": "20px"}}>
            More
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
