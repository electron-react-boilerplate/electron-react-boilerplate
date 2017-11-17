// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
//import styles from './Home.css';

export default class NavBar extends Component {
  render() {
    return (
        <nav>
          <br/>
            <img src="img/path-logo.png"/>
          <br/><br/>
            <ul>
            <li><Link to="/">Home</Link></li>
              <li><Link to="/styleGuide">Style Guide</Link></li>
              <li><Link to="/apiExample">Api</Link></li>
            </ul>
            <div className="navUser">
                <img className="userIcon" src="img/userIcon.jpg" />
                <span className="navName">Nick Paschal</span>
            </div>
        </nav>
    );
  }
}
