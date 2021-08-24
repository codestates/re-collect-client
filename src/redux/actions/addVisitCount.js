import _axios from '../lib/axiosConfig';
import { getBookmark } from '../actions/getBookmark.js';
import handleError from '../lib/errorHandling';
export const ADD_VISITCOUNT = 'ADD_VISITCOUNT';
export const ADD_VISITCOUNT_SUCCESS = 'ADD_VISITCOUNT_SUCCESS';
export const ADD_VISITCOUNT_FAIL = 'ADD_VISITCOUNT_FAIL';

export const addVisitCount = (id) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  if (accessToken) {
    dispatch({ type: ADD_VISITCOUNT });

    _axios
      .patch(`/bookmarks/${id}`, {})
      .then(() => {
        dispatch({ type: ADD_VISITCOUNT_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
      })
      // eslint-disable-next-line no-unused-vars
      .catch((e) => {
        dispatch({
          type: ADD_VISITCOUNT_FAIL,
          error: handleError('북마크 방문 횟수 카운트', e.response.status),
        });
      });
  }
};
