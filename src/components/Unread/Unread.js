import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Alert, Button} from 'react-bootstrap'
import { Redirect } from 'react-router';
import styles from './styles'
class Unread extends Component {
  constructor(props) {
    super(props);
    window.scrollTo(0, 0)    
  }
  render() {
      var comics = []
      if(this.props.unread != null && this.props.unread.length > 0){
        comics = this.props.unread.map((item) =>
            <div key={item.id} style={{"verticalAlign": "baseline", "float": "left", "width": "18%","height": "350px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "backgroundColor": "white", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)"}}> 
            <h4 style={{"fontSize": "14px", "margin": "0 auto", "width": "90%", "textOverflow": "ellipsis", "whiteSpace": "nowrap", "overflow": "hidden", "padding": "0px","height": "20px", "marginTop": "5px"}}>{item.title}</h4>
            <img src={item.thumbnail.path + '/portrait_xlarge.' + item.thumbnail.extension} style={{"objectFit": "fill", "width": "90%", "align": "top", "height":" 275px", "verticalAlign": "baseline", "marginTop": "5px"}}/>
            <div style={{"width": "90%", "margin": "0 auto"}}>
                <input type="button" value="Read" style={{"float": "left", "backgroundColor": "green", "color": "white", "width": "50%"}}/>
                <input type="button" onClick={() => {this.props.deleteComic(this.props.username, item)}} value="Delete"  style={{"float": "left", "backgroundColor": "red", "color": "white", "width": "50%"}}/>
            </div>
            </div>
        )     
      } else {
          return (<Redirect push to="/dashboard"/>);
      }
      return (
        <div style={styles.overall}>
            <div style={styles.nav_bar}>
                <h1 style={{"margin": "0px", "padding": "0px", "textAlign": "center", "color": "white", "lineHeight": "50px"}}>Unread</h1>
            </div>
            <div style={{"width": "90%", "margin": "0 auto"}}>
                {comics}
            </div>
        </div>
      )
   }
}

Unread.propTypes = {
}

export default Unread
