import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

import routes from '../constants/routes';
import messages from '../messages/Home';

const Container = styled.div`
  position: absolute;
  top: 30%;
  left: 10px;
  text-align: center;
`;

const H2 = styled.h2`
  font-size: 5rem;
`;

const LinkWrapper = styled.span`
  font-size: 1.4rem;
`;

export default class Home extends Component {
  render() {
    return (
      <Container data-tid="container">
        <H2>
          {' '}
          <FormattedMessage {...messages.header} />
        </H2>
        <LinkWrapper>
          <Link to={routes.COUNTER}>
            <FormattedMessage {...messages.link} />
          </Link>
        </LinkWrapper>
      </Container>
    );
  }
}
