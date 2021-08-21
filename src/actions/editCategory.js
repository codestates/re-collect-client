import axios from 'axios';
import { notify } from './notify';
import { getBookmark } from './getBookmark';

export const CATEGORY_EDIT_START = 'CATEGORY_EDIT_START';
export const CATEGORY_EDIT_END = 'CATEGORY_EDIT_END';
export const CATEGORY_EDIT_SUCCESS = 'CATEGORY_EDIT_END';
export const CATEGORY_EDIT_FAIL = 'CATEGORY_EDIT_FAIL';

export const categoryEditStart = (id, title) => {
	return {
		type: CATEGORY_EDIT_START,
		id,
		title,
	};
};

export const categoryEditEnd = () => ({
	type: CATEGORY_EDIT_END,
});

export const editCategory = (category) => (dispatch) => {
	const { id, title } = category;
	const accessToken = localStorage.getItem('accessToken');

	axios
		.put(
			'https://api.recollect.today/category',
			{ id, title },
			{
				headers: { authorization: `Bearer ${accessToken}` },
				withCredentials: true,
			}
		)
		.then(() => {
			dispatch({ type: CATEGORY_EDIT_SUCCESS });
		})
		.then(() => {
			dispatch(getBookmark());
			dispatch(notify(`카테고리 이름을 ${title}(으)로 수정하였습니다`));
		})
		.catch((e) => {
			dispatch({ type: CATEGORY_EDIT_FAIL });
			switch (e.response.status) {
			case 500:
				dispatch(notify('서버오류'));
				break;
			case 422:
				dispatch(notify('같은 이름으로 바꿀 수 없습니다.'));
				break;
			case 401:
				dispatch(notify('인증되지 않은 사용자입니다.'));
				break;
			default:
				break;
			}
		});
}