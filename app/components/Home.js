/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';

import Container from './Container';
import ListItemLink from './ListItemLink';
import Header from './Header';
import { Module } from '../modules/types';
import messages from '../messages/Home';

const Content = styled.div`
  flex: 1 1 auto;
  padding: 1rem;
`;

// eslint-disable-next-line import/prefer-default-export
export default class HomePage extends Component {
  render() {
    const { modules } = this.props;

    return (
      <Container>
        <Helmet>
          <title>Home</title>
          <meta name="description" content="Choose a module form the list of configured modules." />
        </Helmet>
        <Header header={() => <FormattedMessage {...messages.header} />} />
        <Content>
          <Typography data-tid="header" variant="h3">
            <FormattedMessage {...messages.chooseModule} />
          </Typography>
          <br />
          <List component="nav">
            {Object.keys(modules).map((key, i) => (
              <ListItemLink key={key} to={`/gallery/${key}`} data-tid={`module-${i}`}>
                <ListItemText primary={modules[key].name} />
              </ListItemLink>
            ))}
          </List>
        </Content>
      </Container>
    );
  }
}

HomePage.propTypes = {
  modules: PropTypes.objectOf(
    PropTypes.shape({
      module: PropTypes.instanceOf(Module).isRequired,
      name: PropTypes.string.isRequired,
    }),
  ).isRequired,
};
