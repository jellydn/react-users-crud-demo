import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Row, Input, Button } from 'rebass';
import logger from '../../utils/logger';

class UserForm extends PureComponent {
  static propTypes = {
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onCancel: PropTypes.func.isRequired,
    isAdd: PropTypes.bool
  };

  static defaultProps = {
    name: '',
    age: 0,
    nickname: '',
    onChange: (field, value) => {},
    onSave: user => {},
    onCancel: () => {},
    isAdd: true
  };

  onSubmit = evt => {
    evt.preventDefault();
    logger.warn('onSubmit');
  };

  render() {
    const { age, name, nickname, isAdd } = this.props;
    return (
      <Row>
        <Input
          required
          placeholder="Name"
          name="name"
          value={name}
          onChange={evt => this.props.onChange('name', evt.target.value)}
        />
        <Input
          required
          type="number"
          placeholder="0"
          name="age"
          value={age}
          onChange={evt => this.props.onChange('age', evt.target.value)}
        />
        <Input
          required
          placeholder="Nickname"
          name="nickname"
          value={nickname}
          onChange={evt => this.props.onChange('nickname', evt.target.value)}
        />
        <Button
          onClick={this.props.onSave}
          children={isAdd ? 'Save' : 'Update'}
        />
        <Button onClick={this.props.onCancel} children="Cancel" />
      </Row>
    );
  }
}

export default UserForm;
