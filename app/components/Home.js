// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Home extends Component {
  render() {
    return (
    <div  data-tid="container">
      <div>
          <Link to="/">
          <br/>
            <i className="material-icons md-16">&#xE314;</i> Back
          </Link>
      </div>

      <div>
        <h1>Social media brand reports:</h1>
        <p>Enter in the Instagram, Twitter, or Facebook page URL of a Brand you wish to gather data from.</p>
        <form>
          <input type="text" placeholder="Enter brand social URL" /> <button className="ice" type="submit">Get Report <i className="material-icons md-16">&#xE884;</i></button>
        </form>


        <h2 className="ice">What you get:</h2>
        <ul>
        <li>New leads! Our system will gather emails of this brands followers when available.</li>
        <li>Get over 30 insider metrics about the social account</li>
        <li>Find the top influencers already connected to the page.</li>
        <li>Discover disingenuous followers who use pod, bot, or purchased fanbases.</li>
        <li>Get this pages integrity score.</li>
        </ul>

        <br/>
        <h4>See sample reports:</h4>
        <div className="row">
          <div className="col-xs-3">
            <a href="#">
              <img className="userIcon" src="img/userIcon.jpg"/> RedBull
            </a>
          </div>
          <div className="col-xs-3">
            <a href="#">
              <img className="userIcon" src="img/userIcon.jpg"/> AirBnB
            </a>
          </div>
          <div className="col-xs-3">
            <a href="#">
              <img className="userIcon" src="img/userIcon.jpg"/> Holt Miami
            </a>
          </div>
          <div className="col-xs-3">
            <a href="#">
              <img className="userIcon" src="img/userIcon.jpg"/> Chipolte
            </a>
          </div>
        </div>
      </div>

    </div>
    );
  }
}
