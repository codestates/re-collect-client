/* eslint-disable no-mixed-spaces-and-tabs */
import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getBookmark } from './getBookmark';

export const dragBookmark =
  ({ dragId, dropId, categoryId, originalCategory, changingCategory }) =>
  	(dispatch) => {
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
  				let error;
  				switch (e.response.status) {
  				case 401:
  					error = '북마크 이동 실패 : 식별되지 않은 사용자';
  					break;
  				case 500:
  					error = '북마크 이동 실패 : 서버 오류';
  					break;
  				default:
  					error = '북마크 이동 실패 : 알 수 없는 오류발생';
  				}
  				dispatch(notify(error));
  			});
  	};

export const dragBookmarkToLast =
  ({ dragId, categoryId, originalCategory, changingCategory }) =>
  	(dispatch) => {
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
  				let error;
  				switch (e.response.status) {
  				case 401:
  					error = '북마크 이동 실패 : 식별되지 않은 사용자';
  					break;
  				case 500:
  					error = '북마크 이동 실패 : 서버 오류';
  					break;
  				default:
  					error = '북마크 이동 실패 : 알 수 없는 오류발생';
  				}
  				dispatch(notify(error));
  			});
  	};
