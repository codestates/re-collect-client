import { initialState } from './initialState';
import { reducebookmark } from '../lib/reducebookmark';
import axios from 'axios';

const GET_BOOKMARK = 'GET_BOOKMARK';
const GET_BOOKMARK_SUCCESS = 'GET_BOOKMARK_SUCCESS';
const GET_BOOKMARK_FAIL = 'GET_BOOKMARK_FAIL';

export const getBookmark = () => async (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  await axios.get(
      'https://api.recollect.today/collect',
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({ 
        type: GET_BOOKMARK_SUCCESS,
        category: res.category,
        bookmarks: res.bookmark,
      });      
    })
    .catch((err) => {
      dispatch({ type: GET_BOOKMARK_FAIL, bookmarkloaderror: err.message });
    })

};


export const getBookmarkReducer = (state = initialState, action) => {
  switch(action.type) {
    case GET_BOOKMARK:
      return reducebookmark(state, action)
    case GET_BOOKMARK_SUCCESS:
      return reducebookmark(state, action)
    case GET_BOOKMARK_FAIL:
      return {
        ...state,
        bookmarkloaderror: action.bookmarkloaderror,
      }
    default:
      return state;
  }
}