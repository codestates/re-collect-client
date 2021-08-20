import { combineReducers } from 'redux';
import { bookmarkReducer } from './bookmark';
import { categoryReducer } from './category';
import { signReducer } from './sign';
import { notificationReducer } from './notification';
import { profileReducer } from './profile';
import { getExploreReducer } from "./getExplore";
import { recollectReducer } from "./getRecollect";


const rootReducer = combineReducers({
  bookmarkReducer,
  categoryReducer,
  signReducer,
  notificationReducer,
  profileReducer,
  getExploreReducer,
  recollectReducer,
});

export default rootReducer;
