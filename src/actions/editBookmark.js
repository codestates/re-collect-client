import axios from "axios";
import bookmarkConverter from "../lib/bookmarkConverter";
import reduceGuestBookmark from "../lib/reduceGuestBookmark";
import { getBookmark } from "./getBookmark";
import { notify } from "./notify";

export const EDIT_START = 'EDIT_START';
export const EDIT_END = 'EDIT_END';
export const EDIT_BOOKMARK_SUCCESS = 'EDIT_BOOKMARK_SUCCESS';
export const EDIT_BOOKMARK_FAIL = 'EDIT_BOOKMARK_FAIL';
export const EDIT_GUEST_BOOKMARK = 'EDIT_GUEST_BOOKMARK';

export const editStart = (bookmark) => {
  const { item, category } = bookmark;
  const copiedBookmarks = {
    ...item,
    category,
  };

  return {
    type: EDIT_START,
    bookmark: copiedBookmarks,
  };
};

export const editEnd = () => ({ type: EDIT_END });

export const editGuestBookmark = (bookmark) => (dispatch, getState) => {
  const editingBookmark = bookmarkConverter(bookmark, true);

  const { bookmarks, category } = getState().bookmarkReducer.guestBookmarks;

  const currentCategory = { ...category };
  const currentBookmarks = bookmarks.map((el) => ({ ...el }));

  if (editingBookmark.category.__isNew__) {
    let newCategoryId = Math.max(...Object.keys(currentCategory)) + 1;
    currentCategory[newCategoryId] = editingBookmark.category.value;
    editingBookmark.categoryId = newCategoryId;
  }
  editingBookmark.category = editingBookmark.category.value;
  currentBookmarks.splice(editingBookmark.id, 1, editingBookmark);

  const reducedbookmarks = reduceGuestBookmark(
    currentBookmarks,
    currentCategory
  );

  dispatch({
    type: EDIT_GUEST_BOOKMARK,
    bookmarks: currentBookmarks,
    category: currentCategory,
    reducedbookmarks,
  });
  dispatch(notify('북마크를 수정했습니다'));
};

export const editBookmark = (bookmark) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  const convertedBookmark = bookmarkConverter(bookmark, true);
  const id = convertedBookmark.id;

  delete convertedBookmark.categoryId;
  convertedBookmark.category = convertedBookmark.category.value;

  if (accessToken) {
    axios
      .put(
        `https://api.recollect.today/bookmarks/${id}`,
        { ...convertedBookmark },
        {
          params: { id },
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch({ type: EDIT_BOOKMARK_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
        dispatch(notify('북마크를 수정했습니다'));
      })
      .catch((e) => {
        // if (e.response.status === 401) {
        //   dispatch(getAccessToken());
        //   return;
        // }

        if (e.response) {
          dispatch({
            type: EDIT_BOOKMARK_FAIL,
            error: e.response.data.message,
          });
          dispatch(notify('북마크 수정 실패했습니다'));
          return;
        }

        dispatch({ type: EDIT_BOOKMARK_FAIL, error: 'unknown error' });
        dispatch(notify('북마크 수정 실패했습니다'));
      });
  } else {
    dispatch({ type: EDIT_BOOKMARK_FAIL, error: 'accessToken Error' });
  }
};