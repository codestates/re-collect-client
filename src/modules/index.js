import { combineReducers } from 'redux';
import { profileReducer } from './editProfile';
import { loginReducer } from './login';
import { signupReducer } from './signup';
import { getExploreReducer } from './getExplore';
import { bookmarkReducer } from './bookmark';
import { notificationReducer } from './notification';

const rootReducer = combineReducers({
  notificationReducer,
  bookmarkReducer,
  getExploreReducer,
  profileReducer,
  loginReducer,
  signupReducer,
});

export default rootReducer;
