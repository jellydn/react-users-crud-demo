import React, { Component } from 'react';
import { Flex, Box, Button } from 'rebass';
import UserList from '../../components/UserList';
import UserCreation from '../../components/UserCreation';
import {
  getUsers,
  addUser,
  updateUser,
  removeUser,
  initFakeData
} from '../../store/user';
import logger from '../../utils/logger';

class Users extends Component {
  state = {
    users: [],
    isAdding: false,
    newUser: {
      name: '',
      age: 0,
      nickname: ''
    }
  };

  onShowNewUserForm = () => {
    this.setState(prevState => ({ isAdding: true }));
  };

  onCloseNewUserForm = () => {
    this.setState(prevState => ({ isAdding: false }));
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
    if (hasChange) {
      this.setState(prevState => ({
        newUser: updateData
      }));
    }
  };

  componentWillMount() {
    logger.warn('componentWillMount');
    initFakeData();
    this.setState({
      users: getUsers()
    });
  }

  render() {
    const { users, isAdding, newUser } = this.state;
    console.warn('Users render', users, isAdding, newUser);
    return (
      <Flex column align="center">
        <Box m="auto">
          <UserList
            users={users}
            onEdit={this.onUpdateUser}
            onRemove={this.onRemoveUser}
          />
        </Box>
        {isAdding &&
          <Box m="auto">
            <UserCreation
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
