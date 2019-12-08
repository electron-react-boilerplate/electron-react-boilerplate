// @flow
import React from 'react';
import routes from '../../constants/routes';
import Welcome from '../../assets/welcome.jpg';
import styles from './index.css';
import AnimatedLink from '../../components/AnimatedLink';

export default function HomePage() {
  return (
    <div className={styles.container}>
      <img src={Welcome} alt="welcome" />
      <AnimatedLink to={routes.INTRODUCTION}>点击此处来开始游戏</AnimatedLink>
    </div>
  );
}
