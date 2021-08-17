import initialState from "./initialState";
import { RECOLLECT } from "../actions/getRecollect";
import {
  GET_BOOKMARK,
  GET_BOOKMARK_SUCCESS,
  GET_BOOKMARK_FAIL,
  GET_GUEST_BOOKMARK,
} from "../actions/getBookmark";

export const recollectReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECOLLECT:
      return {
        ...state,
        unreadBookmarks: action.unreadBookmarks,
      };
    default:
      return state;
  }
};
