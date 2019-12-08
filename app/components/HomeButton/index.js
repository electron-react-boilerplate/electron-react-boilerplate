import React from 'react';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes';
import styles from './index.css';

export default () => (
  <div>
    <Link to={routes.HOME} className={styles.home}>
      <i className="fa fa-home fa-3x" />
    </Link>
  </div>
);
