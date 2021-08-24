import _axios from '../lib/axiosConfig';
import bookmarkConverter from '../lib/bookmarkConverter';
import reduceGuestBookmark from '../lib/reduceGuestBookmark';
import { notify } from './notify';
import { getBookmark } from './getBookmark';
import handleError from '../lib/errorHandling';

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

  let { bookmarks, category, categoryId } =
    getState().bookmarkReducer.guestBookmarks;
  const currentCategory = { ...category };
  const currentBookmarks = bookmarks.map((el) => ({ ...el }));

  if (editingBookmark.category.__isNew__) {
    let newCategoryId = categoryId;
    currentCategory[newCategoryId] = editingBookmark.category.value;
    editingBookmark.categoryId = newCategoryId;
    categoryId += 1;
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
  const convertedBookmark = bookmarkConverter(bookmark, true);
  const id = convertedBookmark.id;

  delete convertedBookmark.categoryId;
  convertedBookmark.category = convertedBookmark.category.value;
  _axios
    .put(
      `/bookmarks/${id}`,
      { ...convertedBookmark },
      {
        params: { id },
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
      const errorMessage = handleError('북마크 수정', e.response.status);
      dispatch({ type: EDIT_BOOKMARK_FAIL, error: errorMessage });
      dispatch(notify(errorMessage));
    });
};
