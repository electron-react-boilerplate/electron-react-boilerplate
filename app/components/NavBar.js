// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import styles from './Home.css';

export default class NavBar extends Component {
  render() {
    return (
        <nav>
          <br/>
            <img src="img/sway-logo.png" />
          <br/><br/>
            <ul>
              <li><Link to="/counter">Counter</Link></li>
              <li><Link to="/social">Social</Link></li>
              <li><a href="#home">Home</a></li>
              <li><a href="#news">Contacts</a></li>
              <li><a href="#contact">Conversations</a></li>
              <li><a href="#about">Audience Automation</a></li>
            </ul>
            <div className="navUser">
                <img className="userIcon" src="img/userIcon.jpg" />
                <span className="navName">Nick Paschal</span>
            </div>
        </nav>
    );
  }
}
