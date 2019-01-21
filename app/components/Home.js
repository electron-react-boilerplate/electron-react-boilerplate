// @flow
import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import routes from '../constants/routes';
// import styles from './Home.css';
import ServerConfig from './ServerConfig';
import TableCanvas from './TableCanvas';
import Footer from './Footer';

type Props = {};

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div data-tid="container">
        {/* <h2>Home</h2>
        <Link to={routes.COUNTER}>to Counter</Link> */}
        <ServerConfig />
        <TableCanvas />
        <Footer />
      </div>
    );
  }
}
