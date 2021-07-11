import { combineReducers } from "redux";
import { profileReducer } from "./editProfile";
import { addBookmarkReducer } from "./addBookmark";
import { getBookmarkReducer } from "./getBookmark";
import { loginReducer } from "./login";
import { signupReducer } from "./signup";
import { getExploreReducer } from "./getExplore";
import { editBookmarkReducer } from "./editBookmark";
import { recollectReducer } from "./getRecollect";

const rootReducer = combineReducers({
  addBookmarkReducer,
  getBookmarkReducer,
  getExploreReducer,
  profileReducer,
  loginReducer,
  signupReducer,
  editBookmarkReducer,
  recollectReducer,
});

export default rootReducer;
