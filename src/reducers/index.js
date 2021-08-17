import { combineReducers } from 'redux';
import { bookmarkReducer } from './bookmark';
import { categoryReducer } from './category';
import { signReducer } from './sign';
import { notificationReducer } from './notification';
import { profileReducer } from './profile';

const rootReducer = combineReducers({
  bookmarkReducer,
  categoryReducer,
  signReducer,
  notificationReducer,
  profileReducer,
});

export default rootReducer;