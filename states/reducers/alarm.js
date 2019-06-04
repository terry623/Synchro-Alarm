import { GiftedChat } from 'react-native-gifted-chat';

import {
  ADD_ALARM,
  OPEN_ALARM,
  SET_CURRENT_ALARM,
  APPEND_MESSAGE,
  REMOVE_ALARM,
} from '../actionTypes';

const initialState = {
  alarms: [
    // { user1, user2, questionType, alarmTime, alarmId }
  ],
  isAlarmVisible: false,
  currentAlarmId: '',
  currentQuestion: { type: '', part: '' },
  currentFriend: '',
  currentMessages: [],
};

const alarm = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ALARM: {
      const { newAlarm } = action.payload;
      return {
        ...state,
        alarms: [...state.alarms, newAlarm],
      };
    }
    case OPEN_ALARM: {
      const { isAlarmVisible } = action.payload;
      return {
        ...state,
        isAlarmVisible,
      };
    }
    case SET_CURRENT_ALARM: {
      const { alarmId, question, friend } = action.payload;
      return {
        ...state,
        currentAlarmId: alarmId,
        currentQuestion: question,
        currentFriend: friend,
        currentMessages: [],
      };
    }
    case APPEND_MESSAGE: {
      const { msg } = action.payload;
      return {
        ...state,
        currentMessages: GiftedChat.append(state.currentMessages, msg),
      };
    }
    case REMOVE_ALARM: {
      const { alarmId } = action.payload;
      return {
        ...state,
        alarms: state.alarms.filter(a => a.alarmId !== alarmId),
      };
    }
    default:
      return state;
  }
};

export default alarm;
