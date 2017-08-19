import React, { Component } from 'react';
import UserList from '../../components/UserList';
import UserCreation from '../../components/UserCreation';
import { Flex, Box, Button } from 'rebass';

class Users extends Component {
  state = {
    users: [],
    isAdding: false,
    newUser: {
      name: '',
      age: 10,
      nickname: ''
    }
  };

  showNewUserForm = () => {
    this.setState(prevState => ({ isAdding: true }));
  };

  closeNewUserForm = () => {
    this.setState(prevState => ({ isAdding: false }));
  };

  addUser = () => {
    console.warn('addUser');
    const { newUser } = this.state;
    this.setState(
      prevState => ({
        users: [].concat(prevState.users, { ...newUser, id: Date.now() })
      }),
      () => {
        this.setState({
          newUser: {
            name: '',
            age: 10,
            nickname: ''
          }
        });
      }
    );
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
        updateData = Object.assign({}, newUser, { age: value });
        hasChange = true;
        break;
      case 'nickname':
        updateData = Object.assign({}, newUser, { nickname: value });
        hasChange = true;
        break;
      default:
        console.warn('unsupport field', field);
    }
    if (hasChange) {
      this.setState(prevState => ({
        newUser: updateData
      }));
    }
  };

  render() {
    const { users, isAdding, newUser } = this.state;
    return (
      <Flex column align="center">
        <Box m="auto">
          <UserList users={users} />
        </Box>
        {isAdding &&
          <Box m="auto">
            <UserCreation
              {...newUser}
              onSave={this.addUser}
              onCancel={this.closeNewUserForm}
              onChange={this.onChangeInput}
            />
          </Box>}
        {!isAdding &&
          <Box m="auto">
            <Button onClick={this.showNewUserForm} children="Add" />
          </Box>}
      </Flex>
    );
  }
}

export default Users;
