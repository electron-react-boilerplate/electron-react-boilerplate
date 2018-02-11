// @flow
import React, { Component } from 'react';
import styles from './TokenForm.css';


type Props = {
  updateToken: () => void,
  token: string
};

export default class TokenForm extends Component<Props> {
  props: Props;
  inputs: [];

  constructor(props) {
    super(props);
    this.tokenChanged = this.tokenChanged.bind(this);
    this.inputs = [];
  }

  componentDidMount() {
    this.inputs[0].focus();
  }

  currentValue(index: number) {
    if (this.props.token[index] === '_') return '';
    return this.props.token[index];
  }

  tokenChanged(event) {
    const numberVal = parseInt(event.target.value, 10);

    if (!Number.isNaN(numberVal) && numberVal < 10) {
      const next = parseInt(event.target.id, 10) + 1;
      if (next < this.inputs.length) {
        this.inputs[next].focus();
        this.inputs[next].select();
      }
      this.props.updateToken(event);
    } else if (event.target.value === '') {
      this.props.updateToken(event);
    }
  }

  render() {
    return (
      <div className={styles.tokenForm}>
        <input id="0" ref={(input) => { this.inputs[0] = input; }} onChange={this.tokenChanged} value={this.currentValue(0)} />
        <input id="1" ref={(input) => { this.inputs[1] = input; }} onChange={this.tokenChanged} value={this.currentValue(1)} />
        <input id="2" ref={(input) => { this.inputs[2] = input; }} onChange={this.tokenChanged} value={this.currentValue(2)} />
        <input id="3" ref={(input) => { this.inputs[3] = input; }} onChange={this.tokenChanged} value={this.currentValue(3)} />
        <input id="4" ref={(input) => { this.inputs[4] = input; }} onChange={this.tokenChanged} value={this.currentValue(4)} />
        <input id="5" ref={(input) => { this.inputs[5] = input; }} onChange={this.tokenChanged} value={this.currentValue(5)} />
      </div>
    );
  }
}
