import _axios from '../lib/axiosConfig';
import handleError from '../lib/errorHandling';

export const GET_BOOKMARK = 'GET_BOOKMARK';
export const GET_BOOKMARK_SUCCESS = 'GET_BOOKMARK_SUCCESS';
export const GET_BOOKMARK_FAIL = 'GET_BOOKMARK_FAIL';
export const GET_GUEST_BOOKMARK = 'GET_GUEST_BOOKMARK';

export const getGuestBookmark = () => ({ type: GET_GUEST_BOOKMARK });

export const getBookmark = () => (dispatch) => {
	dispatch({ type: GET_BOOKMARK });

	_axios
		.get('/collect')
		.then((res) => {
			dispatch({
				type: GET_BOOKMARK_SUCCESS,
				userBookmarks: res.data,
			});
		})
		.catch((e) => {
			dispatch({
				type: GET_BOOKMARK_FAIL,
				error: handleError('북마크 불러오기', e.response.status),
			});
		});
};
