import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Column, Divider } from 'rebass';
import UserItem from './UserItem';
import logger from '../../utils/logger';

class UserList extends Component {
  static propTypes = {
    users: PropTypes.array.isRequired,
    editIds: PropTypes.array.isRequired,
    onEdit: PropTypes.func.isRequired,
    onInlineEdit: PropTypes.func.isRequired,
    onRemove: PropTypes.func.isRequired
  };

  static defaultProps = {
    users: [],
    editIds: [],
    onEdit: (userId, user) => {},
    onInlineEdit: (userId, isEdit) => {},
    onRemove: userId => {}
  };

  renderUserRow = users => {
    return (
      users &&
      users.length > 0 &&
      users.map(item =>
        <UserItem
          key={`${item.id}-${item.nickname}`}
          {...item}
          isEdit={this.props.editIds.indexOf(item.id) !== -1}
          onEdit={this.props.onEdit}
          onInlineEdit={this.props.onInlineEdit}
          onRemove={this.props.onRemove}
        />
      )
    );
  };

  render() {
    const { users } = this.props;
    logger.warn('User List', users);
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
