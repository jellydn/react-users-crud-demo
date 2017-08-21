import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column, Button } from 'rebass';
import UserForm from '../UserForm';
import logger from '../../utils/logger';

class UserItem extends Component {
  state = {
    updateUser: {
      name: '',
      age: 0,
      nickname: '',
      id: ''
    }
  };

  static propTypes = {
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired,
    onEdit: PropTypes.func.isRequired,
    onInlineEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  static defaultProps = {
    id: '',
    name: '',
    age: 0,
    nickname: '',
    isEdit: false,
    onEdit: (userId, user) => {},
    onRemove: userId => {},
    onInlineEdit: (userId, isEdit) => {}
  };

  onChangeInput = (field, value) => {
    const { updateUser } = this.state;
    let updateData = {};
    let hasChange = false;
    switch (field) {
      case 'name':
        updateData = Object.assign({}, updateUser, { name: value });
        hasChange = true;
        break;
      case 'age':
        updateData = Object.assign({}, updateUser, { age: Number(value) });
        hasChange = true;
        break;
      case 'nickname':
        updateData = Object.assign({}, updateUser, { nickname: value });
        hasChange = true;
        break;
      default:
        logger.warn('unsupport field', field);
    }
    logger.warn('onChangeInput updateUser', field, value, updateData);
    if (hasChange) {
      this.setState(prevState => ({
        updateUser: updateData
      }));
    }
  };

  renderAction = ({ id }) => {
    return (
      <Column>
        <Button
          onClick={() => {
            this.props.onInlineEdit(id);
          }}
          children="Edit"
        />
        <Button
          onClick={() => {
            this.props.onRemove(id);
          }}
          children="Delete"
        />
      </Column>
    );
  };

  onCancelInlineEdit = () => {
    const { id } = this.props;
    const { name, age, nickname } = this.props;
    this.setState(prevState => ({
      updateUser: { id, name, age, nickname }
    }));
    this.props.onInlineEdit(id, false);
  };

  saveChange = () => {
    const { id } = this.props;
    const { updateUser } = this.state;
    this.props.onEdit(id, updateUser);
    this.props.onInlineEdit(id, false);
  };

  componentDidMount() {
    const { id, name, age, nickname } = this.props;
    this.setState(prevState => ({
      updateUser: { id, name, age, nickname }
    }));
  }

  render() {
    const { id, isEdit } = this.props;
    const { updateUser: { name, age, nickname } } = this.state;
    return isEdit
      ? <UserForm
          name={name}
          age={age}
          nickname={nickname}
          isAdd={false}
          onSave={this.saveChange}
          onCancel={this.onCancelInlineEdit}
          onChange={this.onChangeInput}
        />
      : <Row key={`${id}-${nickname}-${name}`}>
          <Column>
            {name}
          </Column>
          <Column>
            {age}
          </Column>
          <Column>
            {nickname}
          </Column>
          {this.renderAction(this.props)}
        </Row>;
  }
}

export default UserItem;
