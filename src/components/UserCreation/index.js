import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Input, Button } from 'rebass';

class UserCreation extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired
  };

  static defaultProps = {
    name: '',
    age: 10,
    nickname: '',
    onChange: (field, value) => {},
    onSave: user => {},
    onCancel: () => {}
  };

  render() {
    const { age, name, nickname } = this.props;

    return (
      <Container>
        <Row>
          <Input
            placeholder="Name"
            name="name"
            value={name}
            onChange={evt => this.props.onChange('name', evt.target.value)}
          />
          <Input
            type="number"
            placeholder="0"
            name="age"
            value={age}
            onChange={evt => this.props.onChange('age', evt.target.value)}
          />
          <Input
            placeholder="Nickname"
            name="nickname"
            value={nickname}
            onChange={evt => this.props.onChange('nickname', evt.target.value)}
          />
          <Button onClick={this.props.onSave} children="Save" />
          <Button onClick={this.props.onCancel} children="Cancel" />
        </Row>
      </Container>
    );
  }
}

export default UserCreation;