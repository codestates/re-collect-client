import { combineReducers } from 'redux';
import { bookmarkReducer } from './bookmark';
import { categoryReducer } from './category';
import { signReducer } from './sign';
import { notificationReducer } from './notification';


const rootReducer = combineReducers({
  bookmarkReducer,
  categoryReducer,
  signReducer,
  notificationReducer,
});

export default rootReducer;
