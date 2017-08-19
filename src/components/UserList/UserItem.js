import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Column, Button } from 'rebass';

class UserItem extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    nickname: PropTypes.string.isRequired,
    isEdit: PropTypes.bool.isRequired
  };

  static defaultProps = {
    id: 0,
    name: '',
    age: 0,
    nickname: '',
    isEdit: false
  };

  renderAction = isEdit => {
    if (isEdit) {
      return (
        <Column>
          <Button children="Edit" />
          <Button children="Cancel" />
        </Column>
      );
    }
    return (
      <Column>
        <Button children="Edit" />
        <Button children="Delete" />
      </Column>
    );
  };

  render() {
    const { id, name, age, nickname, isEdit } = this.props;
    return (
      <Row key={`${id}-${nickname}`}>
        <Column>
          {name}
        </Column>
        <Column>
          {age}
        </Column>
        <Column>
          {nickname}
        </Column>
        {this.renderAction(isEdit)}
      </Row>
    );
  }
}

export default UserItem;
