import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getBookmark } from './getBookmark';
import handleError from '../lib/errorHandling';

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
			dispatch({ type: CATEGORY_DELETE_FAIL });
			dispatch(notify(handleError('카테고리 삭제', e.response.status)));
		});
};
