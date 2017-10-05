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
      return (
        <div style={styles.overall}>
            <div style={styles.nav_bar}>
                <div style={{"width": "70%", "height": "50px","float": "left", "marginTop": "7.5px"}}>
                    <input placeholder="Search for comic..." style={{"textAlign": "center", "height": "35px", "float": "right", "width": "60%", "borderRadius": "8px", "border": "none"}} />
                </div>
                <div style={{"width": "30%", "height": "50px", "float": "left", "marginTop": "7.5px", "paddingRight": "7%"}}>
                    <input style={{ "height": "35px", "float": "right", "textAlign": "center", "background": "none", "border": "none"}} value="X" type="button" onClick={() => this.props.hideSearchModal()}/>
                </div>
            </div>
        </div>
      )
   }
}

Search.propTypes = {
}

export default Search
