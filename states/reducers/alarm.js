import { SET_ALARM_DETAIL } from '../actionTypes';

const initialState = {
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
    default:
      return state;
  }
};

export default alarm;
