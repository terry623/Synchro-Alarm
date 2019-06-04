import React from 'react';
import { GiftedChat } from 'react-native-gifted-chat';
import { connect } from 'react-redux';

const Chat = ({
  userName,
  socket,
  currentAlarmId,
  currentFriend,
  currentMessages,
}) => (
  <GiftedChat
    messages={currentMessages}
    onSend={messages => {
      const userMessage = messages[0];
      socket.emit('chat', userName, currentFriend, userMessage);
      if (userMessage.text.startsWith('#')) {
        socket.emit(
          'answer',
          userName,
          currentAlarmId,
          userMessage.text.replace('#', '')
        );
      }
    }}
    onLongPress={() => undefined}
    renderAvatar={null}
    user={{
      _id: userName,
    }}
  />
);

export default connect(state => ({
  ...state.user,
  ...state.alarm,
}))(Chat);
