export const DELETE_BOOKMARK_SUCCESS = 'DELETE_BOOKMARK_SUCCESS';
export const DELETE_BOOKMARK_FAIL = 'DELETE_BOOKMARK_FAIL';
export const DELETE_GUEST_BOOKMARK = 'DELETE_GUEST_BOOKMARK';

export const deleteGuestBookmark = (bookmark) => (dispatch, getState) => {
  const { category, bookmarks } = getState().bookmarkReducer.guestBookmarks;

  const currentBookmarks = bookmarks.map((el) => ({ ...el }));
  const currentCategory = { ...category };
  let findIdx;
  currentBookmarks.filter((el, idx) => {
    if (el.id === bookmark.id) {
      findIdx = idx;
    }
  });
  currentBookmarks.splice(findIdx, 1);
  const newReducedbookmarks = reduceGuestBookmark(
    currentBookmarks,
    currentCategory
  );

  newReducedbookmarks.filter((el, idx) => {
    if (el.bookmarks.length === 1) {
      delete currentCategory[Number(el.id)];
      return false;
    }
  });

  dispatch({
    type: DELETE_GUEST_BOOKMARK,
    category: currentCategory,
    bookmarks: currentBookmarks,
    reducedbookmarks: newReducedbookmarks,
  });

  dispatch(notify('북마크를 삭제했습니다'));
};

export const deleteBookmark = (bookmark) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  const id = bookmark.id;
  if (accessToken) {
    axios
      .delete(`https://api.recollect.today/bookmarks/${id}`, {
        params: { id },
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then(() => {
        dispatch({ type: DELETE_BOOKMARK_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
        dispatch(notify('북마크를 삭제했습니다'));
      })
      .catch((e) => {
        dispatch(notify('북마크 삭제 실패했습니다'));
        // if (err.response.status === 401) {
        //   dispatch(getAccessToken());
        //   return;
        // }
        if (e.response) {
          dispatch({
            type: DELETE_BOOKMARK_FAIL,
            error: e.response.data.message,
          });
        } else {
          dispatch({
            type: DELETE_BOOKMARK_FAIL,
            error: 'Unknown Error',
          });
        }
      });
  }
};