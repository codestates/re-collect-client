import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getProfile } from './getProfile';

export const EDIT_PWD_INITIALIZE = 'EDIT_PWD_INITIALIZE';
export const EDIT_PWD_SUCCESS = 'EDIT_PWD_SUCCESS';
export const EDIT_PWD_FAIL = 'EDIT_PWD_FAIL';

export const editPwdInitialize = () => ({
	type: EDIT_PWD_INITIALIZE,
});

export const editPwd = (pwdInfo) => (dispatch) => {
	_axios
		.patch('/profile/pwd', {
			pwd: pwdInfo.password,
			newPwd: pwdInfo.newpassword,
		})
	// eslint-disable-next-line no-unused-vars
		.then((res) => {
			dispatch({
				type: EDIT_PWD_SUCCESS,
			});
		})
		.then(() => {
			dispatch(getProfile());
			dispatch(notify('비밀번호를 변경했습니다.'));
		})
		.catch((e) => {
			let error;
			switch (e.response.status) {
			case 501:
			case 500:
				error = '서버 오류';
				break;
			case 401:
				error =
            '장시간 사용하지 않아 로그아웃되었습니다. 다시 로그인해주세요.';
				break;
			case 422:
				error = '현재 비밀번호가 올바르지 않습니다.';
				break;
			default:
				error = 'Unknown Error';
			}
			dispatch({
				type: EDIT_PWD_FAIL,
				error,
			});
		});
};
