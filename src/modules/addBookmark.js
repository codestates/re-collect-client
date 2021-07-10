import initialState from './initialState';
import axios from 'axios';
import bookmarkConverter from '../lib/bookmarkConverter';
import reduceBookmarkTest from '../lib/reduceBookmarkTest';
import { getBookmark } from './getBookmark';

const POST_BOOKMARK = 'POST_BOOKMARK';
const POST_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS';
const POST_BOOKMARK_FAIL = 'POST_BOOKMARK_FAIL';

const POST_GUEST_BOOKMARK = 'POST_GUEST_BOOKMARK';
// const REDUCE_GUEST_BOOKMARK = 'REDUCE_GUEST_BOOKMARK';

export const addGuestBookmark = (bookmark) => (dispatch, getState) => {
  const convertedBookmark = bookmarkConverter(bookmark, true, getState);

  dispatch({ type: POST_GUEST_BOOKMARK, bookmark: convertedBookmark });
};

export const addBookmark = (bookmark) => (dispatch, getState) => {
  const accessToken = localStorage.getItem('accessToken');
  const convertedBookmark = bookmarkConverter(bookmark, false, getState);

  dispatch({ type: POST_BOOKMARK });

  axios
    .post(
      'https://api.recollect.today/collect',
      {
        ...convertedBookmark,
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch({ type: POST_BOOKMARK_SUCCESS });
    })
    .then(() => {
      dispatch(getBookmark());
    })
    .catch((e) => {
      if (e.response) {
        dispatch({
          type: POST_BOOKMARK_FAIL,
          bookmark: convertedBookmark,
          error: e.response.data.message,
        });
        return;
      }
      dispatch({
        type: POST_BOOKMARK_FAIL,
        bookmark: convertedBookmark,
        error: 'unknown error',
      });
    });
};

export const addBookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_BOOKMARK:
      return {
        ...state,
        tempBookmark: {
          isLoading: true,
          data: null,
          error: null,
        },
      };
    case POST_BOOKMARK_SUCCESS:
      return {
        ...state,
        tempBookmark: {
          isLoading: false,
          data: null,
          error: null,
        },
      };

    case POST_BOOKMARK_FAIL:
      return {
        ...state,
        tempBookmark: {
          isLoading: false,
          data: action.bookmark,
          error: action.error,
        },
      };

    case POST_GUEST_BOOKMARK:
      const copiedCategory = [...state.guestBookmarks.category];
      const newBookmarks = [...state.guestBookmarks.bookmarks, action.bookmark];

      if (copiedCategory.includes(action.bookmark.category)) {
        return {
          ...state,
          guestBookmarks: {
            ...state.guestBookmarks,
            id: (state.guestBookmarks.id += 1),
            bookmarks: newBookmarks,
            reducedbookmarks: reduceBookmarkTest(newBookmarks, copiedCategory),
          },
        };
      }

      const newCategory = [...copiedCategory, action.bookmark.category];

      return {
        ...state,
        guestBookmarks: {
          ...state.guestBookmarks,
          id: (state.guestBookmarks.id += 1),
          category: newCategory,
          bookmarks: newBookmarks,
          reducedbookmarks: reduceBookmarkTest(newBookmarks, newCategory),
        },
      };

    default:
      return state;
  }
};
