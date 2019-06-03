import { ADD_ALARM, OPEN_ALARM, SET_QUESTION } from '../actionTypes';

const initialState = {
  alarms: [
    // { user1, user2, questionType, alarmTime, alarmId }
  ],
  isAlarmVisible: false,
  currentAlarmId: '',
  currentQuestion: '',
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
    case SET_QUESTION: {
      const { alarmId, questionPart } = action.payload;
      return {
        ...state,
        currentAlarmId: alarmId,
        currentQuestion: questionPart,
      };
    }
    default:
      return state;
  }
};

export default alarm;
