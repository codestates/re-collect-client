import { combineReducers } from 'redux';
import { bookmarkReducer } from './bookmark';


const rootReducer = combineReducers({
  bookmarkReducer,
});

export default rootReducer;
