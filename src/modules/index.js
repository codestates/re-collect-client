import { combineReducers } from 'redux';
import { profileReducer } from './editProfile';
import { signReducer } from './sign';
import { getExploreReducer } from './getExplore';
import { bookmarkReducer } from './bookmark';
import { categoryReducer } from './category';
import { notificationReducer } from './notification';
import { recollectReducer } from './getRecollect';

const rootReducer = combineReducers({
  notificationReducer,
  bookmarkReducer,
  categoryReducer,
  getExploreReducer,
  profileReducer,
  signReducer,
  recollectReducer,
});

export default rootReducer;
