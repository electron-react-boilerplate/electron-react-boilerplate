// @flow
import React, { Component } from 'react';
{{#if styled}}
import styles from './{{ properCase name }}.css';
{{/if}}

class {{ properCase name }} extends Component {
  props: {
    value: number
  };

  render() {
    const { increment, decrement, value } = this.props;
    return (
      <div>
        <h4>A stateful component with a single value <p{{#if styled}} className={styles.value}{{/if}}>{value}</p></h4>

        <button className={styles.btn} onClick={increment} data-tclass="btn">
          <i className="fa fa-plus" />
        </button>

        <button className={styles.btn} onClick={decrement} data-tclass="btn">
          <i className="fa fa-minus" />
        </button>

      </div>
    );
  }
}

export default {{ properCase name }};
