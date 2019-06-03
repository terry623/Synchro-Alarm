import {
  SET_SOCKET,
  SET_LOGIN,
  SET_USERNAME,
  ADD_ALARM,
  OPEN_ALARM,
  SET_QUESTION,
} from './actionTypes';

export const setSocket = socket => ({
  type: SET_SOCKET,
  payload: { socket },
});

export const setUserName = userName => ({
  type: SET_USERNAME,
  payload: { userName },
});

export const setLogin = isLogin => ({
  type: SET_LOGIN,
  payload: { isLogin },
});

export const addAlarm = newAlarm => ({
  type: ADD_ALARM,
  payload: { newAlarm },
});

export const openAlarm = isAlarmVisible => ({
  type: OPEN_ALARM,
  payload: { isAlarmVisible },
});

export const setQuestion = ({ alarmId, questionPart }) => ({
  type: SET_QUESTION,
  payload: { alarmId, questionPart },
});
