import initialState from "./initialState";

const RECOLLECT = "RECOLLECT";

// actions
export const recollect = (bookmarks) => async () => {
  const unreadBookmarks = bookmarks.filter((bookmark) => {
    return bookmark.visitCounts === 0;
  });

  return {
    type: RECOLLECT,
    unreadBookmarks,
  };
};

// reducers
export const recollectReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECOLLECT:
      return {
        ...state,
        unreadBookmarks: action.unreadBookmarks,
      };
  }
};
