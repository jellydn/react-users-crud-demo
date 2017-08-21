import React, { Component } from 'react';
import { Flex, Box, Button } from 'rebass';
import UserList from '../../components/UserList';
import UserForm from '../../components/UserForm';
import { getUsers, addUser, updateUser, removeUser } from '../../store/user';
import logger from '../../utils/logger';

class Users extends Component {
  state = {
    users: [],
    isAdding: false,
    newUser: {
      name: '',
      age: 0,
      nickname: ''
    },
    editIds: []
  };

  onShowNewUserForm = () => {
    this.setState(prevState => ({ isAdding: true }));
  };

  onCloseNewUserForm = () => {
    this.setState(prevState => ({ isAdding: false }));
  };

  onInlineEdit = (id, isEdit = true) => {
    if (isEdit) {
      this.setState(prevState => ({
        editIds: [].concat(prevState.editIds, id)
      }));
    } else {
      this.setState(prevState => ({
        editIds: prevState.editIds.filter(item => item !== id)
      }));
    }
  };

  onAddUser = () => {
    const { newUser } = this.state;
    logger.warn('onAddUser', newUser);
    addUser(newUser, () => {
      this.setState({
        users: getUsers(),
        newUser: {
          name: '',
          age: 0,
          nickname: ''
        }
      });
    });
  };

  onUpdateUser = (id, user) => {
    logger.warn('onRemoveUser', id);
    updateUser(id, user, () => {
      this.setState({
        users: getUsers()
      });
    });
  };

  onRemoveUser = id => {
    logger.warn('onRemoveUser', id);
    removeUser(id, () => {
      this.setState({
        users: getUsers()
      });
    });
  };

  onChangeInput = (field, value) => {
    const { newUser } = this.state;
    let updateData = {};
    let hasChange = false;
    switch (field) {
      case 'name':
        updateData = Object.assign({}, newUser, { name: value });
        hasChange = true;
        break;
      case 'age':
        updateData = Object.assign({}, newUser, { age: Number(value) });
        hasChange = true;
        break;
      case 'nickname':
        updateData = Object.assign({}, newUser, { nickname: value });
        hasChange = true;
        break;
      default:
        logger.warn('unsupport field', field);
    }
    logger.warn('onChangeInput newUser', field, value, updateData);

    if (hasChange) {
      this.setState(prevState => ({
        newUser: updateData
      }));
    }
  };

  componentWillMount() {
    logger.warn('componentWillMount');
    this.setState({
      users: getUsers()
    });
  }

  render() {
    const { users, editIds, isAdding, newUser } = this.state;
    logger.warn('Users render', users, isAdding, newUser);
    return (
      <Flex column align="center">
        <Box m="auto">
          <UserList
            users={users}
            editIds={editIds}
            onEdit={this.onUpdateUser}
            onInlineEdit={this.onInlineEdit}
            onRemove={this.onRemoveUser}
          />
        </Box>
        {isAdding &&
          <Box m="auto">
            <UserForm
              {...newUser}
              onSave={this.onAddUser}
              onCancel={this.onCloseNewUserForm}
              onChange={this.onChangeInput}
            />
          </Box>}
        {!isAdding &&
          <Box m="auto">
            <Button onClick={this.onShowNewUserForm} children="Add" />
          </Box>}
      </Flex>
    );
  }
}

export default Users;
