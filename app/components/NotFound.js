/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';

import Container from './Container';
import messages from '../messages/NotFound';

const Content = styled.div`
  padding: 1rem;
`;

export default function NotFound() {
  return (
    <Container>
      <Helmet>
        <title>Not Found</title>
        <meta
          name="description"
          content="The requested page could not be found"
        />
      </Helmet>
      <Content>
        <Typography variant="h3">
          <ErrorIcon fontSize="large" />{' '}
          <FormattedMessage {...messages.header} />
        </Typography>

        <Typography color="error" variant="h6">
          <Link exact to="/">
            <FormattedMessage {...messages.return} />
          </Link>
        </Typography>
      </Content>
    </Container>
  );
}
