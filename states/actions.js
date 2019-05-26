import {
  SET_SOCKET,
  SET_LOGIN,
  SET_USERNAME,
  SET_ALARM_DETAIL,
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

export const setAlarmDetail = alarmDetail => ({
  type: SET_ALARM_DETAIL,
  payload: { alarmDetail },
});
