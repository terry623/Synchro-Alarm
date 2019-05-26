import { SET_ALARM_DETAIL, OPEN_ALARM, SET_TOPICS } from '../actionTypes';

const initialState = {
  isAlarmVisible: false,
  alarmDetail: {
    friend: '',
    questionType: '',
    alarmTime: '',
    matchingId: '',
    topics: [],
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
    case SET_TOPICS: {
      const { topic } = action.payload;
      return {
        ...state,
        topics: state.alarmDetail.topics.push(topic),
      };
    }
    default:
      return state;
  }
};

export default alarm;
