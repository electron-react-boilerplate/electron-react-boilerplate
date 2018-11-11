import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import routes from '../constants/routes';

const BackButton = styled.div`
  position: absolute;
`;

const Wrapper = styled.div`
.counter {
  position: absolute;
  top: 30%;
  left: 45%;
  font-size: 10rem;
  font-weight: bold;
  letter-spacing: -0.025em;
  `;

const BtnGroup = styled.div`
  position: relative;
  top: 500px;
  width: 480px;
  margin: 0 auto;
`;

const Button = styled.button`
  font-size: 1.6rem;
  font-weight: bold;
  background-color: #fff;
  border-radius: 50%;
  margin: 10px;
  width: 100px;
  height: 100px;
  opacity: 0.7;
  cursor: pointer;
  font-family: Arial, Helvetica, Helvetica Neue, sans-serif;

  &:hover {
    color: white;
    background-color: rgba(0, 0, 0, 0.5);
  }
`;

export default class Counter extends Component {
  render() {
    const {
      increment,
      incrementIfOdd,
      incrementAsync,
      decrement,
      counter
    } = this.props;
    return (
      <div>
        <BackButton data-tid="backButton">
          <Link to={routes.HOME}>
            <ArrowBackIcon />
          </Link>
        </BackButton>
        <Wrapper data-tid="counter">{counter}</Wrapper>
        <BtnGroup>
          <Button onClick={increment} data-tclass="btn" type="button">
            <AddIcon />
          </Button>
          <Button onClick={decrement} data-tclass="btn" type="button">
            <RemoveIcon />
          </Button>
          <Button onClick={incrementIfOdd} data-tclass="btn" type="button">
            odd
          </Button>
          <Button
            onClick={() => incrementAsync()}
            data-tclass="btn"
            type="button"
          >
            async
          </Button>
        </BtnGroup>
      </div>
    );
  }
}

Counter.propTypes = {
  increment: PropTypes.func.isRequired,
  incrementIfOdd: PropTypes.func.isRequired,
  incrementAsync: PropTypes.func.isRequired,
  decrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired
};
