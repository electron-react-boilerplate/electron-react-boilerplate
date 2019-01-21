/* eslint-disable */
import React, { Component } from 'react';
import { Form } from 'semantic-ui-react';

const dialects = [
  { key: 'ms', text: 'MS SQL', value: 'mssql' },
  { key: 'my', text: 'MySQL', value: 'mysql' },
  { key: 'pg', text: 'PostgreSQL', value: 'postgres' },
  { key: 'sl', text: 'SQLite', value: 'sqlite' }
];

class ServerConfig extends Component {
  state = {
    dialect: '',
    hostname: '',
    port: -1,
    database: '',
    connectionURI: '',
    readOnly: false
  };

  handleChange = (e, { name, value }) => this.setState({ [name]: value });
  // {
  // this.setState({ [name]: value });
  //   this.setState(prevState => {
  //     const connectionURI = `${prevState.dialect}://${prevState.hostname}:${
  //       prevState.port
  //     }/${prevState.database}`;

  //     return { [name]: value, connectionURI };
  //   });
  // };

  handleSubmit = event => {
    event.preventDefault();
    this.setState({ readOnly: true });
    console.log(this.state);
  };

  render() {
    const { value } = this.state;
    return (
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
          <Form.Button>Create</Form.Button>
        </Form.Group>
      </Form>
    );
  }
}

export default ServerConfig;
