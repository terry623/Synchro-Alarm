import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import UUID from 'uuid/v4';
import { connect } from 'react-redux';

class Chat extends Component {
  state = {
    messages: [],
  };

  onSend(messages = []) {
    const { userName, socket, currentAlarmId, friend } = this.props;

    const otherMessage = {
      _id: UUID(),
      text: '快起床',
      createdAt: new Date(),
      user: {
        _id: 2,
        name: friend,
        avatar: 'https://semantic-ui.com/images/avatar/large/elliot.jpg',
      },
    };

    messages.unshift(otherMessage);

    // FIXME: 現在第 0 個是其他人，之後會改掉 ( 目前為了測試 )
    socket.emit('answer', userName, currentAlarmId, messages[1].text);

    this.setState(previousState => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={messages => this.onSend(messages)}
        onLongPress={() => undefined}
        user={{
          _id: 1,
        }}
      />
    );
  }
}

export default connect(state => ({
  ...state.user,
  ...state.alarm,
}))(Chat);
