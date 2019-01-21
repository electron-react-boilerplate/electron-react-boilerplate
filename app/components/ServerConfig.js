// @flow
import React, { Component } from 'react';
// import {connect } from 'react-redux';
import { NavLink, Link } from 'react-router-dom';
import { Form, Container } from 'semantic-ui-react';
import routes from '../constants/routes';
import { default as CreateButton } from './CreateButton';

type Props = {
  dialect: string,
  hostname: string,
  port: number,
  database: string
};

const dialects = [
  { key: 'ms', text: 'MS SQL', value: 'mssql' },
  { key: 'my', text: 'MySQL', value: 'mysql' },
  { key: 'pg', text: 'PostgreSQL', value: 'postgres' },
  { key: 'sl', text: 'SQLite', value: 'sqlite' }
];

class ServerConfig extends Component<Props> {
  props: Props;

  state = {
    connectionURI: '',
    readOnly: false
  };

  handleChange = (e, { name, value }) => {
    this.props.server[name] = value;
    this.setState({ [name]: value });
    // console.log(this.props);
  };

  handleSubmit = event => {
    event.preventDefault();
    const connectionURI = `${this.props.server.dialect}://${
      this.props.server.hostname
    }:${this.props.server.port}/${this.props.server.database}`;
    console.log('Connection String');
    console.log(connectionURI);
    this.setState({ readOnly: true, connectionURI, ...this.props.server });
    this.props.createDatabase(this.props.server);
    console.log('Props.server:');
    console.log(this.props.server);
    console.log('State');
    console.log(this.state);
    this.props.history.push('/tables');
  };

  render() {
    // console.log(this.props);
    // console.log(this.state);
    // const { value } = this.state;
    const { dialect, hostname, port, database } = this.props.server;
    console.log(dialect, hostname, port, database);
    return (
      <Container>
        <Container>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group widths="equal">
              <Form.Select
                fluid
                name="dialect"
                label="Dialect: "
                options={dialects}
                placeholder="Server Type"
                onChange={this.handleChange}
                disabled={this.state.readOnly}
                // width={2}
              />
              <Form.Input
                fluid
                name="hostname"
                label="Hostname: "
                placeholder="Hostname"
                type="text"
                onChange={this.handleChange}
                disabled={this.state.readOnly}
                // width={2}
              />
              <Form.Input
                fluid
                name="port"
                label="Port: "
                placeholder="Port#"
                type="number"
                onChange={this.handleChange}
                disabled={this.state.readOnly}
                // width={1}
              />
              <Form.Input
                fluid
                name="database"
                label="Database: "
                placeholder="Database Name"
                type="text"
                onChange={this.handleChange}
                disabled={this.state.readOnly}
                // width={2}
              />
              <Container style={{ padding: '2em' }}>
                <Form.Button>Create</Form.Button>
              </Container>
            </Form.Group>
          </Form>
        </Container>
      </Container>
    );
    // return (
    //   <div data-tid="container">
    //     <h2>Home</h2>
    //     {/* <Link to={routes.COUNTER}>to Counter</Link>
    //         <Link to={routes.TABLES}> to Tables</Link> */}
    //   </div>
    // );
  }
}

export default ServerConfig;
