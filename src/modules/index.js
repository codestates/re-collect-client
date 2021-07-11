import { combineReducers } from 'redux';
import { profileReducer } from './editProfile';
import { loginReducer } from './login';
import { signupReducer } from './signup';
import { getExploreReducer } from './getExplore';
import { bookmarkReducer } from './bookmark';
import { notificationReducer } from './notification';
import { recollectReducer } from './getRecollect';

const rootReducer = combineReducers({
  notificationReducer,
  bookmarkReducer,
  getExploreReducer,
  profileReducer,
  loginReducer,
  signupReducer,
  recollectReducer,
});

export default rootReducer;
