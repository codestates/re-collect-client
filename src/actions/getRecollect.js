export const RECOLLECT = 'RECOLLECT';

export const recollect = (bookmarks) => async (dispatch) => {
  const unreadBookmarks = bookmarks.filter((bookmark) => {
    return bookmark.visitCounts === 0;
  });
  dispatch({ type: RECOLLECT, unreadBookmarks });
};
