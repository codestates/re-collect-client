import initialState from './initialState';
import axios from 'axios';
import bookmarkConverter from '../lib/bookmarkConverter';

const EDIT_START = 'EDIT_START';
const EDIT_END = 'EDIT_END';

const EDIT_BOOKMARK = 'EDIT_BOOKMARK';
const EDIT_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS';
const EDIT_BOOKMARK_FAIL = 'POST_BOOKMARK_FAIL';

const DELETE_BOOKMARK = 'DELETE_BOOKMARK';

export const editStart = (bookmark) => {
  const convertedCategory = {
    value: bookmark.category,
    label: bookmark.category,
  };
  return {
    type: EDIT_START,
    bookmark: { ...bookmark, category: convertedCategory },
  };
};
export const editEnd = () => ({ type: EDIT_END });

// export const editGuestBookmark = () => () => {};

export const editBookmark = (bookmark) => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const convertedBookmark = bookmarkConverter(bookmark, false, getState);

  convertedBookmark.bookmarkId = convertedBookmark.id;
  delete convertedBookmark.id;

  axios
    .put(
      'https://api.recollect.today/collect',
      { ...convertedBookmark },
      {
        headers: { authorization: accessToken },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch({ type: EDIT_BOOKMARK_SUCCESS });
    })
    .catch((e) => {
      dispatch({ type: EDIT_BOOKMARK_FAIL, error: e.response.data.message });
    });
};

export const editBookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case EDIT_START:
      return {
        ...state,
        tempBookmark: {
          ...state.tempBookmark,
          isEdit: true,
          data: action.bookmark,
        },
      };

    case EDIT_END:
    case EDIT_BOOKMARK_SUCCESS:
      return {
        ...state,
        tempBookmark: {
          ...state.tempBookmark,
          isEdit: false,
          data: null,
        },
      };

    case EDIT_BOOKMARK_FAIL:
      return {
        ...state,
        tempBookmark: {
          ...state.tempBookmark,
          isEdit: true,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
