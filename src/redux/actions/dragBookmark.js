/* eslint-disable no-mixed-spaces-and-tabs */
import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getBookmark } from './getBookmark';
import handleError from '../lib/errorHandling';

export const dragBookmark = ({
	dragId,
	dropId,
	categoryId,
	originalCategory,
	changingCategory,
}) => (dispatch) => {
	_axios
		.patch(
			`/bookmarks/${dragId}/${dropId}/position`,
			{ categoryId: categoryId },
			{
				params: {
					dragId: dragId,
					dropId: dropId,
				},
			}
		)
		.then(() => {
			dispatch(getBookmark());
		})
		.then(() => {
			if (originalCategory === changingCategory) {
				dispatch(notify('북마크가 이동되었습니다'));
			} else {
				dispatch(
					notify(
						`${originalCategory}에서 ${changingCategory}(으)로 북마크가 이동되었습니다`
					)
				);
			}
		})
		.catch((e) => {
			dispatch(notify(handleError('북마크 이동', e.response.status)));
		});
};

export const dragBookmarkToLast = ({
	dragId,
	categoryId,
	originalCategory,
	changingCategory,
}) => (dispatch) => {
	_axios
		.patch(
			`/bookmarks/${dragId}/position`,
			{ categoryId: categoryId },
			{
				params: { id: dragId },
			}
		)
		.then(() => {
			dispatch(getBookmark());
		})
		.then(() => {
			if (originalCategory === changingCategory) {
				dispatch(notify('북마크가 이동되었습니다'));
			} else {
				dispatch(
					notify(
						`${originalCategory}에서 ${changingCategory}(으)로 북마크가 이동되었습니다`
					)
				);
			}
		})
		.catch((e) => {
			dispatch(notify(handleError('북마크 이동', e.response.status)));
		});
};
