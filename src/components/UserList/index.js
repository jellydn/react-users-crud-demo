import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Column, Divider } from 'rebass';
import UserItem from './UserItem';

class UserList extends PureComponent {
  static propTypes = {
    users: PropTypes.array.isRequired
  };

  static defaultProps = {
    users: []
  };

  renderUserRow = users => {
    return users.map(item =>
      <UserItem key={`${item.id}-${item.nickname}`} {...item} />
    );
  };

  render() {
    const { users } = this.props;
    console.warn('User List', users);
    return (
      <Container>
        <Row>
          <Column>Name</Column>
          <Column>Age</Column>
          <Column>Nickname</Column>
          <Column>Action</Column>
        </Row>
        <Divider w={1} color="blue" />
        {this.renderUserRow(users)}
      </Container>
    );
  }
}

export default UserList;
