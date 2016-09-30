import React from 'react';
import { Link } from 'react-router';
import styles from './Home.css';


const Home = () => (
  <div>
    <div className={styles.container}>
      <h2>Home</h2>
      <Link to="/counter">to Counter</Link>
    </div>
  </div>
);


export default Home;
