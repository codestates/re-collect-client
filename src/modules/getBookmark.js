import initialState from './initialState';
import { reducebookmark } from '../lib/reducebookmark';
import axios from 'axios';

const GET_BOOKMARK = 'GET_BOOKMARK';
const GET_BOOKMARK_SUCCESS = 'GET_BOOKMARK_SUCCESS';
const GET_BOOKMARK_FAIL = 'GET_BOOKMARK_FAIL';

export const getBookmark = () => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  dispatch({ type: GET_BOOKMARK });

  axios
    .get('https://api.recollect.today/collect', {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: GET_BOOKMARK_SUCCESS,
        category: res.data.category,
        bookmarks: res.data.bookmark,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_BOOKMARK_FAIL, error: err.message });
    });
};

export const getBookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKMARK:
      return {
        ...state,
        userBookmarks: { ...state.userBookmarks, isLoading: true },
      };
    case GET_BOOKMARK_SUCCESS:
      return reducebookmark(state, action);
    case GET_BOOKMARK_FAIL:
      return {
        ...state,
        userBookmarks: {
          ...state.userBookmarks,
          isLoading: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};
