import { combineReducers } from 'redux';
import { profileReducer } from './editProfile';
import { bookmarkReducerX } from './addBookmark';
import { loginReducer } from './login';
import { getExploreReducer } from './getExplore';

const rootReducer = combineReducers({
  bookmarkReducerX,
  getExploreReducer,
  profileReducer,
  loginReducer,
});

export default rootReducer;
