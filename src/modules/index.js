import { combineReducers } from "redux";
import { bookmarkReducerX } from "./addBookmark";
import { getExploreReducer } from "./getExplore";

const rootReducer = combineReducers({ bookmarkReducerX, getExploreReducer });

export default rootReducer;
