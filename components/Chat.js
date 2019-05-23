import React, { Component } from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import UUID from 'uuid/v4';

export default class Chat extends Component {
  state = {
    messages: [],
    answer: '',
  };

  onSend(messages = []) {
    const { closeAlarm, friend, topic } = this.props;

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

    const answer = topic.join('');
    // FIXME: 現在第 0 個是其他人，之後會改掉 ( 目前為了測試 )
    if (messages[1].text === answer) {
      const systemMessage = {
        _id: UUID(),
        text: `正確 ! 答案是「${answer}」`,
        createdAt: new Date(),
        system: true,
      };
      messages.unshift(systemMessage);
      // closeAlarm();
    }

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
