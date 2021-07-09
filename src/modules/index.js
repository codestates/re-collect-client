import { combineReducers } from "redux";
import { profileReducer } from './editProfile';
import { getBookmarkReducer } from "./getBookmark";
import { bookmarkReducerX } from "./addBookmark";
import { getExploreReducer } from "./getExplore";

const rootReducer = combineReducers({ 
  bookmarkReducerX,
  getBookmarkReducer,
  getExploreReducer, 
  profileReducer 
});

export default rootReducer;
