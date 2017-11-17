// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Social extends Component {
  render() {
    return (
        <div  data-tid="container">
          <div>
              <Link to="/">
              <br/>
                <i className="material-icons md-16">&#xE314;</i> Back
              </Link>
          </div>

          <h2>Social Page</h2>

        </div>
    );
  }
}
