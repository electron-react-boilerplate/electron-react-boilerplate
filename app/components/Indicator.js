import React, { Component } from 'react';

class Indicator extends Component {
  constructor(props) {
    const initialState = {
      unlitColor: '#000',
      litColor: '#FEFDFE',
      isBlinking: false,
      blinkingInterval: null,
      isLit: false
    };
    super(props);
    this.state = Object.assign({}, initialState, props);
  }


  componentDidMount() {
    if (this.state.isBlinking) {
      this.timerID = setInterval(
        () => this.toggle(),
        200
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ ...nextProps },
      () => {
        if (this.state.isBlinking && !this.state.blinkingInterval) {
          let blinkingInterval = setInterval(
            () => this.toggle(),
            200
          );
          this.setState({ blinkingInterval: blinkingInterval });
        } else if (!this.state.isBlinking && this.state.blinkingInterval) {
          clearInterval(this.state.blinkingInterval);
          this.setState({ blinkingInterval: null });
        }
      }
    );
  }

  toggle() {
    this.setState({ isLit: !this.state.isLit });
  }

  render() {
    return (
      <svg viewBox="0 0 200 200" width="15px" height="15px">
        <circle cx="100" cy="100" r="100" fill={this.state.isLit ? this.state.litColor : this.state.unlitColor} stroke='#000' />
      </svg>
    );
  }
}

export default Indicator;