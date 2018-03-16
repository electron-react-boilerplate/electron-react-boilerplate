// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.css';

type Props = {};

const REACT_VERSION = React.version

export default class Home extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h3>Добро пожаловать, здесь мы будем разрабатывать какое то приложение</h3>
          <p>Ниже, можно изучить малую презентацию того,</p>
          <p> как будет работать React внутри Electron</p>
          <p>В коробке мы имеем уже React {`${REACT_VERSION}`}</p>
          <p>Redux, Electron, TypeScript, eslintr и еще кучу другого (хлама?)</p>
          <Link to="/counter">to Counter</Link>
        </div>
      </div>
    );
  }
}
