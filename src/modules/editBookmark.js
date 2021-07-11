import initialState from './initialState';
import axios from 'axios';
import bookmarkConverter from '../lib/bookmarkConverter';
import { getBookmark } from './getBookmark';

const EDIT_START = 'EDIT_START';
const EDIT_END = 'EDIT_END';

const EDIT_BOOKMARK_SUCCESS = 'EDIT_BOOKMARK_SUCCESS';
const EDIT_BOOKMARK_FAIL = 'EDIT_BOOKMARK_FAIL';

const DELETE_BOOKMARK_SUCCESS = 'DELETE_BOOKMARK_SUCCESS';
const DELETE_BOOKMARK_FAIL = 'DELETE_BOOKMARK_FAIL';

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
  console.log('확인해보자꾸나', bookmark);

  convertedBookmark.bookmarkId = convertedBookmark.id;
  delete convertedBookmark.id;

  if (accessToken) {
    axios
      .put(
        'https://api.recollect.today/collect',
        { ...convertedBookmark },
        {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch({ type: EDIT_BOOKMARK_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response) {
          dispatch({
            type: EDIT_BOOKMARK_FAIL,
            error: e.response.data.message,
          });
          return;
        }

        dispatch({ type: EDIT_BOOKMARK_FAIL, error: 'unknown error' });
      });
  } else {
    dispatch({ type: EDIT_BOOKMARK_FAIL, error: 'accessToken Error' });
  }
};

export const deleteBookmark = (bookmark) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  
 if (accessToken) {
    console.log(accessToken, '엑세스 토큰 없니?');
   axios
      .delete(
        'https://api.recollect.today/collect',
        {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        },
        { bookmarkId: bookmark.id }
      )
      .then(() => {
        dispatch({ type: DELETE_BOOKMARK_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
      })
      .catch((e) => {
        console.log(accessToken, '왜 사라지니?')
        dispatch({
          type: DELETE_BOOKMARK_FAIL,
          error: e.response.data.message,
        });
        console.log(accessToken, '여기서 사라지니?')
      });
  }
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

    case DELETE_BOOKMARK_SUCCESS:
      return {
        ...state,
        tempBookmark: {
          ...state.tempBookmark,
          isEdit: false,
          data: null,
        },
      };

    case DELETE_BOOKMARK_FAIL:
      return {
        ...state,
        tempBookmark: {
          ...state.tempBookmark,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
