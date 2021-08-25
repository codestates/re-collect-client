import _axios from '../lib/axiosConfig';
// import handleError from '../lib/errorHandling';
import { notify } from './notify';

export const DEL_ACCOUNT = 'DEL_ACCOUNT';
export const DEL_ACCOUNT_SUCCESS = 'DEL_ACCOUNT_SUCCESS';
export const DEL_ACCOUNT_FAIL = 'DEL_ACCOUNT_FAIL';

export const delAccount = () => (dispatch) => {
	_axios
		.delete('/profile')
		// eslint-disable-next-line no-unused-vars
		.then((res) => {
			dispatch({
				type: DEL_ACCOUNT_SUCCESS,
			});
			dispatch(notify('계정을 삭제했습니다.'));
			localStorage.removeItem('accessToken');
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
				default:
					error = 'Unknown Error';
			}
			dispatch({ type: DEL_ACCOUNT_FAIL, error });
		});
};
