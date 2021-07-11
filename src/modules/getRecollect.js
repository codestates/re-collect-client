import initialState from "./initialState";

const RECOLLECT = "RECOLLECT";

// actions
export const recollect = (bookmarks) => async (dispatch) => {
  const unreadBookmarks = bookmarks.filter((bookmark) => {
    return bookmark.visitCounts === 0;
  });
  dispatch({ type: RECOLLECT, unreadBookmarks });
};

// Reducer
export const recollectReducer = (state = initialState, action) => {
  switch (action.type) {
    case "RECOLLECT":
      return {
        ...state,
        unreadBookmarks: action.unreadBookmarks,
      };
    default:
      return state;
  }
};
