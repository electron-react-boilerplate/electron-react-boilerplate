import React from 'react';
import { Link } from 'react-router';


export default class AboutPageContainer extends React.Component {

  static defaultProps = {

  }

  render() {
    return (
      <div>
        <h2>About Page</h2>
        <p>About us.</p>
        <Link to="home">back Home</Link>
      </div>
    );
  }

}
