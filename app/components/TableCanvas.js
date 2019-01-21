import React, { Component } from 'react';

import { Container, Button, Table, Label, Form } from 'semantic-ui-react';
import ColumnOptionsModal from './ColumnOptionsModal';

const colDataTypes = [
  { key: 'string', text: 'String', value: 'Sequelize.STRING' },
  { key: 'text', text: 'Text', value: 'Sequelize.TEXT' },
  { key: 'integer', text: 'Integer', value: 'Sequelize.INTEGER' },
  { key: 'float', text: 'Float', value: 'Sequelize.FLOAT' },
  { key: 'boolean', text: 'Boolean', value: 'Sequelize.BOOLEAN' }
];

class TableCanvas extends Component {
  state = { tables: [] };

  componentDidUpdate = () => {
    // console.log('New state');
    // console.log(this.state);
  };

  addColumn = (event, tableIndex) => {
    event.preventDefault();
    // console.log('ALFA');
    // console.log(alfa);
    // console.log('Bravo');
    // console.log(bravo);
    // console.log('Charles');
    // console.log(charlee);
    // console.log(tableIndex);
    this.setState(prevState => {
      const newTables = prevState.tables.slice();
      // console.log(newTables);
      // console.log(newTables[tableIndex]);
      newTables[tableIndex].columns = [
        ...newTables[tableIndex].columns,
        { name: 'new col', type: 'Sequelize.STRING', options: '' }
      ];
      return { tables: newTables };
    });
  };

  setDataType = event => {
    console.log(event);
    console.log(event.target);
  };

  addTable = () => {
    this.setState(prevState => ({
      tables: prevState.tables.concat([
        {
          columns: [
            {
              name: 'id',
              type: 'primary key',
              options: ''
            }
          ]
        }
      ])
    }));
  };

  render() {
    const { tables } = this.state;
    return (
      <Container>
        <Container>
          <Button
            content="Add Table"
            icon="add square"
            labelPosition="left"
            onClick={this.addTable}
          />
        </Container>
        <Container>
          {tables.map((table, i) => (
            <Table celled>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <div contentEditable suppressContentEditableWarning>
                      Enter table name
                    </div>
                  </Table.HeaderCell>
                </Table.Row>
                <Table.Row>
                  <Table.HeaderCell>Column Name</Table.HeaderCell>
                  <Table.HeaderCell>Column Type</Table.HeaderCell>
                  <Table.HeaderCell>Column Option</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {/* <Table.Row>
                  <Table.Cell>
                    <Label ribbon>id</Label>
                  </Table.Cell>
                  <Table.Cell>int (primaryKey)</Table.Cell>
                  <Table.Cell>options</Table.Cell>
                </Table.Row>
                <Table.Row>
                  <Table.Cell>Column Name</Table.Cell>
                  <Table.Cell>Column Type</Table.Cell>
                  <Table.Cell>Column Options</Table.Cell>
                </Table.Row> */}
                {table.columns.map((cols, j) =>
                  j === 0 ? (
                    <Table.Row>
                      <Table.Cell>
                        <Label ribbon>{cols.name}</Label>
                      </Table.Cell>
                      <Table.Cell>{cols.type}</Table.Cell>
                      <Table.Cell>{cols.options}</Table.Cell>
                    </Table.Row>
                  ) : (
                    <Table.Row>
                      <Table.Cell>
                        <div contentEditable suppressContentEditableWarning />
                      </Table.Cell>
                      <Table.Cell>
                        <Form>
                          <Form.Select
                            fluid
                            name="datatype"
                            // label="Dialect: "
                            options={colDataTypes}
                            placeholder="Select data type"
                            onChange={this.setDataType}
                          />
                        </Form>
                      </Table.Cell>
                      <Table.Cell>
                        <ColumnOptionsModal />
                      </Table.Cell>
                    </Table.Row>
                  )
                )}
              </Table.Body>
              <Table.Footer>
                <Table.Row>
                  <Table.HeaderCell colSpan="3">
                    <Form onSubmit={event => this.addColumn(event, i)}>
                      <Form.Button
                        floated="right"
                        content="Add Column"
                        icon="add square"
                        labelPosition="left"
                        type="submit"
                        // onClick={this.addColumn}
                      />
                    </Form>
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Footer>
            </Table>
          ))}
        </Container>
      </Container>
    );
  }
}

export default TableCanvas;
