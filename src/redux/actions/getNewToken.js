import _axios from '../lib/axiosConfig';
import { logoutThunk } from '../modules/sign';

export const GET_NEW_TOKEN = 'GET_NEW_TOKEN';

export const getNewToken = () => (dispatch) => {
	_axios
		.get('/auth/token')
		.then((res) => {
			dispatch({ type: GET_NEW_TOKEN, payload: res.data.accessToken });
		})
		.catch(() => {
			dispatch(logoutThunk());
		});
};
