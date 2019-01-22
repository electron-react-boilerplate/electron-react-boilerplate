import React, { Component } from 'react';
import {
  Button,
  Header,
  Icon,
  Input,
  Modal,
  Form,
  Checkbox,
  Segment,
  Label
} from 'semantic-ui-react';

export default class ColumnOptionsModal extends Component {
  state = {
    modalOpen: false,
    allowNull: true,
    unique: false,
    defaultValue: ''
  };

  handleOpen = () => this.setState({ modalOpen: true });

  handleClose = () => this.setState({ modalOpen: false });

  toggleAllowNull = () =>
    this.setState(prevState => ({ allowNull: !prevState.allowNull }));

  toggleAllowUnique = () =>
    this.setState(prevState => ({ unique: !prevState.unique }));

  setDefaultValue = event =>
    this.setState({ defaultValue: event.target.value });

  render() {
    return (
      <Modal
        trigger={<Button onClick={this.handleOpen}>Column Options</Button>}
        open={this.state.modalOpen}
        onClose={this.handleClose}
        // basic
        size="small"
      >
        <Header icon="browser" content="Column Options" />
        <Modal.Content>
          <Segment compact>
            <Label>Allow Null:&nbsp;</Label>
            <Checkbox
              toggle
              checked={this.state.allowNull}
              onChange={this.toggleAllowNull}
            />
          </Segment>
          <Segment compact>
            <Label>Unique:&nbsp;</Label>
            <Checkbox
              toggle
              checked={this.state.unique}
              onChange={this.toggleAllowUnique}
            />
          </Segment>
          <Segment compact>
            <Input
              label="Default Value"
              value={this.state.defaultValue}
              onChange={this.setDefaultValue}
            />
          </Segment>
        </Modal.Content>
        <Modal.Actions>
          <Button color="green" onClick={this.handleClose} inverted>
            <Icon name="checkmark" /> Ok
          </Button>
        </Modal.Actions>
      </Modal>
    );
  }
}
