import { SET_SOCKET, SET_LOGIN, SET_USERNAME } from '../actionTypes';

const initialState = {
  socket: null,
  userName: '',
  isLogin: false,
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case SET_SOCKET: {
      const { socket } = action.payload;
      return {
        ...state,
        socket,
      };
    }
    case SET_LOGIN: {
      const { isLogin } = action.payload;
      return {
        ...state,
        isLogin,
      };
    }
    case SET_USERNAME: {
      const { userName } = action.payload;
      return {
        ...state,
        userName,
      };
    }
    default:
      return state;
  }
};

export default user;
