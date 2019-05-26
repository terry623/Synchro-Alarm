import {
  SET_ALARM_DETAIL,
  OPEN_ALARM,
  SET_TOPIC,
  SET_IS_ANSWER,
} from '../actionTypes';

const initialState = {
  isAlarmVisible: false,
  alarmDetail: {
    friend: '',
    questionType: '',
    alarmTime: '',
    matchingId: '',
    topic: '',
  },
};

const alarm = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALARM_DETAIL: {
      const { alarmDetail } = action.payload;
      return {
        ...state,
        alarmDetail,
      };
    }
    case OPEN_ALARM: {
      const { isAlarmVisible } = action.payload;
      return {
        ...state,
        isAlarmVisible,
      };
    }
    case SET_TOPIC: {
      const { topic } = action.payload;
      return {
        ...state,
        alarmDetail: {
          ...state.alarmDetail,
          topic,
        },
      };
    }
    default:
      return state;
  }
};

export default alarm;
