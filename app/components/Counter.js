import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import styles from './Counter.css';


const Counter = ({
  increment,
  incrementIfOdd,
  incrementAsync,
  decrement,
  counter
}) => (
  <div>
    <div className={styles.backButton}>
      <Link to="/">
        <i className="fa fa-arrow-left fa-3x" />
      </Link>
    </div>
    <div className={`counter ${styles.counter}`}>
      {counter}
    </div>
    <div className={styles.btnGroup}>
      <button className={styles.btn} onClick={increment}>
        <i className="fa fa-plus" />
      </button>
      <button className={styles.btn} onClick={decrement}>
        <i className="fa fa-minus" />
      </button>
      <button className={styles.btn} onClick={incrementIfOdd}>odd</button>
      <button className={styles.btn} onClick={() => incrementAsync()}>async</button>
    </div>
  </div>
);


Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};


export default Counter;
