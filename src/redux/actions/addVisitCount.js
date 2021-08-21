import _axios from '../lib/axiosConfig';
import { getBookmark } from '../actions/getBookmark.js';
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
			.catch((err) => {
				dispatch({ type: ADD_VISITCOUNT_FAIL, error: '에러가 발생했습니다.' });
			});
	}
};
