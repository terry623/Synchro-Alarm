import { combineReducers } from 'redux';
import user from './user';
import alarm from './alarm';

export default combineReducers({
  user,
  alarm,
});
