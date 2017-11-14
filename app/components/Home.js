// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
    <div  data-tid="container">
      <h2>Welcome to Sway Labs</h2>
      <Link to="/counter">Counter</Link><br />
      <Link to="/social">Social</Link>

      <div>
        <p>Enter in the Instagram, Twitter, or Facebook page URL of a Brand you wish to gather data from. Sway will return a full downloadable dataset containing a row seperated follower and following list.</p>
        <h3>Find out what influencers are already connected to the page.</h3>
        <h3>Protect yourself against fake influencers who use pod, bot, or purchased fanbases.</h3>
        <h3>Get new leads! Our system will automatically source emails of followers/ followings when available.</h3>
      </div>

    </div>
    );
  }
}
