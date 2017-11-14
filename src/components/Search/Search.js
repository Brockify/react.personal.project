import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import {Alert, Button} from 'react-bootstrap'
import { Redirect } from 'react-router';
import styles from './styles'
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {"option_display": {"opacity": "0", "animation": "none", "zIndex": "-1", "height": "0px"}, "load_more_visible": "none"}
  }
  render() {
      var comics = []
      if(this.props.comicData != null && this.props.comicData.results != null && this.props.comicData.results.length > 0){
        if(this.props.comicData.total > 20){
            this.state.load_more_visible = "inline"
        } else {
            this.state.load_more_visible = "none"
        }
        comics = this.props.comicData.results.map((comic) =>
                <div style={{"float": "left", "width": "33%", "height": "375px", "border": "1px solid black", "marginLeft": "1.7%", "textAlign": "center", "marginTop": "10px", "backgroundColor": "white", "boxShadow": "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)", "maxWidth": "200px"}}>
                    <h4 style={{"overflow": "hidden", "height": "20px"}}>{comic.title}</h4>
                    <img onClick={() => this.props.showComic(comic)} src={comic.thumbnail.path + '/portrait_xlarge.' + comic.thumbnail.extension} style={{"width": "90%", "margin": "0 auto","padding": "0px", "height": "250px", "marginTop": "20px"}}/>
                    <input type="button" value="Add" className="search_add_button" onClick={() => {
                        this.props.addComic(this.props.username, comic)}}/>
                </div>
        )     
      } else {
          this.state.load_more_visible = "none"
      }

      return (
        <div style={styles.overall}>
            <div style={{"width": "90%", "margin": "0 auto"}}>
                {comics}
                <div style={{"textAlign": "center"}}>
                    <input align="center" style={{"display": this.state.load_more_visible}} type="button" value={"Load More"}/>
                </div>
            </div>
        </div>
      )
   }
}

Search.propTypes = {
}

export default Search
