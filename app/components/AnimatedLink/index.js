// @flow
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './index.css';

type Props = {
  to: string,
  children: string,
  onClick?: (SyntheticEvent<>) => void | null
};

export default function Home(props: Props) {
  const { to, children, onClick } = props;
  return (
    <Link to={to} className={styles.link} onClick={onClick}>
      {children}
    </Link>
  );
}

Home.defaultProps = {
  onClick: () => {}
};
