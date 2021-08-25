import _axios from '../lib/axiosConfig';
import handleError from '../lib/errorHandling';

export const GET_INFO = 'GET_INFO';
export const GET_INFO_SUCCESS = 'GET_INFO_SUCCESS';
export const GET_INFO_FAIL = 'GET_INFO_FAIL';

export const getExploreInfo = () => (dispatch) => {
	dispatch({ type: GET_INFO });

	_axios
		.get('/explore')
		.then((res) => {
			dispatch({
				type: GET_INFO_SUCCESS,
				payload: {
					users: res.data.users,
				},
			});
		})
		.catch((e) => {
			dispatch({
				type: GET_INFO_FAIL,
				error: handleError('익스플로어 정보 불러오기', e.response.status),
			});
		});
};
