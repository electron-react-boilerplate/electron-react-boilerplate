import React, { Component } from 'react';
import {
  Segment,
  Container,
  Grid,
  Header,
  List,
  Button
} from 'semantic-ui-react';

export default class Footer extends Component {
  render() {
    return (
      <Segment vertical style={{ padding: '0em 0em' }}>
        <Container>
          <Grid inverted stackable>
            <Grid.Row>
              {/* <Grid.Column width={3}>
                <Header inverted as="h4" content="About" />
                <List link inverted>
                  <List.Item as="a">Sitemap</List.Item>
                  <List.Item as="a">Contact Us</List.Item>
                  <List.Item as="a">Religious Ceremonies</List.Item>
                  <List.Item as="a">Gazebo Plans</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={3}>
                <Header inverted as="h4" content="Services" />
                <List link inverted>
                  <List.Item as="a">Banana Pre-Order</List.Item>
                  <List.Item as="a">DNA FAQ</List.Item>
                  <List.Item as="a">How To Access</List.Item>
                  <List.Item as="a">Favorite X-Men</List.Item>
                </List>
              </Grid.Column>
              <Grid.Column width={7}>
                <Header as="h4" inverted>
                  Footer Header
                </Header>
                <p>
                  Extra space for a call to action inside the footer that could
                  help re-engage users.
                </p>
              </Grid.Column> */}
              <Grid.Column width={4} />
              <Grid.Column width={4} />
              <Grid.Column width={4} />
              <Grid.Column width={3}>
                <Button float="right" color="primary">
                  Create Models
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Container>
      </Segment>
    );
  }
}
