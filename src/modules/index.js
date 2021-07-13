import { combineReducers } from 'redux';
import { profileReducer } from './editProfile';
import { signReducer } from './sign';
import { getExploreReducer } from './getExplore';
import { bookmarkReducer } from './bookmark';
import { notificationReducer } from './notification';
import { recollectReducer } from './getRecollect';

const rootReducer = combineReducers({
  notificationReducer,
  bookmarkReducer,
  getExploreReducer,
  profileReducer,
  signReducer,
  recollectReducer,
});

export default rootReducer;
