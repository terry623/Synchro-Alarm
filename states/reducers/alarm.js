import { SET_ALARM_DETAIL, OPEN_ALARM } from '../actionTypes';

const initialState = {
  isAlarmVisible: false,
  alarmDetail: {
    friend: '',
    questionType: '',
    alarmTime: '',
    matchingId: '',
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
    default:
      return state;
  }
};

export default alarm;
