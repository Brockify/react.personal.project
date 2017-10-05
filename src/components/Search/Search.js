import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Alert, Button} from 'react-bootstrap'
import { Redirect } from 'react-router';
import styles from './styles'
class Search extends Component {
  constructor(props) {
    super(props);
  }
  render() {
      var comics = []
      if(this.props.comicData != null && this.props.comicData.results != null && this.props.comicData.results.length > 0){
        comics = this.props.comicData.results.map((comic) =>
            <div style={{"float": "left", "width": "31%", "height": "350px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "marginTop": "10px", "backgroundColor": "white", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", "maxWidth": "200px"}}>
                <h4 style={{"overflow": "hidden", "height": "20px"}}>{comic.title}</h4>
                <img src={comic.thumbnail.path + '/portrait_xlarge.' + comic.thumbnail.extension} style={{"width": "90%", "margin": "0 auto","padding": "0px", "height": "250px", "marginTop": "20px"}}/>
            </div>
      )     
      }
      return (
        <div style={styles.overall}>
            <div style={styles.nav_bar}>
                <div style={{"width": "70%", "height": "50px","float": "left", "marginTop": "7.5px"}}>
                    <input onChange={this.props.searchComic.bind(this)} placeholder="Search for comic..." style={{"textAlign": "center", "height": "35px", "float": "right", "width": "60%", "borderRadius": "8px", "border": "none"}} />
                </div>
                <div style={{"width": "30%", "height": "50px", "float": "left", "marginTop": "7.5px", "paddingRight": "7%"}}>
                    <input style={{ "height": "35px", "float": "right", "textAlign": "center", "background": "none", "border": "none"}} value="X" type="button" onClick={() => this.props.hideSearchModal()}/>
                </div>
            </div>
            <div style={{"width": "90%", "margin": "0 auto"}}>
                {comics}
            </div>
        </div>
      )
   }
}

Search.propTypes = {
}

export default Search
