import { initialState } from './initialState';
import axios from 'axios';

const POST_BOOKMARK = 'POST_BOOKMARK';
const POST_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS';
const POST_BOOKMARK_FAIL = 'POST_BOOKMARK_FAIL';
const EDIT_BOOKMARK = 'EDIT_BOOKMARK';
const DELETE_BOOKMARK = 'DELETE_BOOKMARK';

const GET_BOOKMARK = 'GET_BOOKMARK';
const REDUCE_BOOKMARK = 'REDUCE_BOOKMARK';

export const addBookmark = (bookmark) => async (dispatch, getState) => {
  const username = getState().user;
  const accessToken = localStorage.getItem('Token');

  dispatch({
    type: POST_BOOKMARK,
    bookmark,
  });
  try {
    const postbookmark = await axios.post(
      'https://api.recollect.today/collect',
      {
        bookmark,
        username: username,
      },
      {
        headers: { authorization: accessToken },
        withCredentials: true,
      }
    );

    dispatch({ type: POST_BOOKMARK_SUCCESS });
  } catch (e) {
    dispatch({ type: POST_BOOKMARK_FAIL, bookmark, error: e });
  }
};

export const bookmarkReducerX = (state = initialState, action) => {
  switch (action.type) {
    case POST_BOOKMARK:
      return {
        ...state,
        tempBookmark: {
          loading: true,
          data: action.bookmark,
          error: null,
        },
      };
    case POST_BOOKMARK_SUCCESS:
      return {
        ...state,
        tempBookmark: {
          loading: false,
          data: null,
          error: null,
        },
      };

    case POST_BOOKMARK_FAIL:
      return {
        ...state,
        tempBookmark: {
          loading: false,
          data: action.bookmark,
          error: action.error,
        },
      };
    default:
      return state;
  }
};
