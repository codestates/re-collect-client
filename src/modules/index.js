import { combineReducers } from "redux";
import { profileReducer } from './editProfile';
import { bookmarkReducerX } from "./addBookmark";
import { getExploreReducer } from "./getExplore";

const rootReducer = combineReducers({ bookmarkReducerX, getExploreReducer, profileReducer });

export default rootReducer;
