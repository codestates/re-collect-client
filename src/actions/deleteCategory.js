import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getBookmark } from './getBookmark';

export const CATEGORY_DELETE_SUCCESS = 'CATEGORY_DELETE_SUCCESS';
export const CATEGORY_DELETE_FAIL = 'CATEGORY_DELETE_FAIL';

export const deleteCategory = (id) => (dispatch) => {
	_axios
		.delete(`/category/${id}`, {
			params: { id },
		})
		.then(() => {
			dispatch({ type: CATEGORY_DELETE_SUCCESS });
		})
		.then(() => {
			dispatch(getBookmark());
		})
		.catch((e) => {
			let error;
			switch (e.response.status) {
			case 500:
				error = '서버오류';
				break;
			case 401:
				error = '인증되지 않은 사용자입니다.';
				break;
			default:
				error = '알 수 없는 오류';
			}
			dispatch({ type: CATEGORY_DELETE_FAIL });
			dispatch(notify(error));
		});
};
