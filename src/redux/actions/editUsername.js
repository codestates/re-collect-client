import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getProfile } from './getProfile';
import handleError from '../lib/errorHandling';

export const EDIT_USERNAME = 'EDIT_USERNAME';
export const EDIT_USERNAME_SUCCESS = 'EDIT_USERNAME_SUCCESS';
export const EDIT_USERNAME_FAIL = 'EDIT_USERNAME_FAIL';

export const editUsername = (username) => (dispatch) => {
	dispatch({ type: EDIT_USERNAME });
	_axios
		.patch('/profile/username', {
			username: username,
		})
	// eslint-disable-next-line no-unused-vars
		.then((res) => {
			dispatch({
				type: EDIT_USERNAME_SUCCESS,
			});
		})
		.then(() => {
			dispatch(getProfile());
			dispatch(notify('유저네임을 변경했습니다.'));
		})
		.catch((e) => {
			const errorMessage = handleError('유저네임 변경', e.response.status);
			dispatch({ type: EDIT_USERNAME_FAIL, error: errorMessage });
			dispatch(notify(errorMessage));
		});
};
