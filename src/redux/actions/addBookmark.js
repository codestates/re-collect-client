import _axios from '../lib/axiosConfig';
import bookmarkConverter from '../lib/bookmarkConverter';
import reduceGuestBookmark from '../lib/reduceGuestBookmark';
import { notify } from './notify';
import { getBookmark } from './getBookmark';
import handleError from '../lib/errorHandling';

export const POST_BOOKMARK = 'POST_BOOKMARK';
export const POST_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS';
export const POST_BOOKMARK_FAIL = 'POST_BOOKMARK_FAIL';
export const POST_GUEST_BOOKMARK = 'POST_GUEST_BOOKMARK';

export const addGuestBookmark = (bookmark) => (dispatch, getState) => {
	const addingBookmark = bookmarkConverter(bookmark, false);

	//현재 등록되어 있는 북마크 아이디, 북마크배열, 카테고리 오브젝트 파악

	let { bookmarks, category, bookmarkId, categoryId } =
    getState().bookmarkReducer.guestBookmarks;

	const currentBookmarkId = bookmarkId;
	const currentCategory = { ...category };
	const currentBookmarks = bookmarks.map((el) => ({ ...el }));

	// 게스트가 3번 이하로 추가할 때 알림
	if (currentBookmarkId <= 5) {
		dispatch(notify('로그인을 하지 않으면 북마크가 저장되지 않습니다', 10000));
		//로그인 유도 팝업 띄우기
	}

	//추가하는 북마크의 북마크아이디 등록
	addingBookmark.id = currentBookmarkId;

	//추가하는 북마크의 카테고리 아이디 등록
	if (addingBookmark.category.__isNew__) {
		currentCategory[categoryId] = addingBookmark.category.value;
		addingBookmark.categoryId = categoryId;
		categoryId += 1;
	} else {
		let findingCategoryId = Object.entries(currentCategory).filter(
			(el) => el[1] === addingBookmark.category.value
		)[0][0];
		addingBookmark.categoryId = Number(findingCategoryId);
	}

	addingBookmark.category = addingBookmark.category.value;

	currentBookmarks.push(addingBookmark);

	const newReducedBookmarks = reduceGuestBookmark(
		currentBookmarks,
		currentCategory
	);

	dispatch({
		type: POST_GUEST_BOOKMARK,
		category: currentCategory,
		bookmarks: currentBookmarks,
		reducedbookmarks: newReducedBookmarks,
	});
};

export const addBookmark = (bookmark) => (dispatch) => {
	const convertedBookmark = bookmarkConverter(bookmark, false);
	convertedBookmark.category = convertedBookmark.category.value;

	dispatch({ type: POST_BOOKMARK });

	_axios
		.post('/bookmark', { ...convertedBookmark })
		.then(() => {
			dispatch({ type: POST_BOOKMARK_SUCCESS });
		})
		.then(() => {
			dispatch(getBookmark());
			dispatch(notify('북마크를 추가했습니다'));
		})
		.catch((e) => {
			dispatch({
				type: POST_BOOKMARK_FAIL,
				bookmark: convertedBookmark,
				error: handleError('북마크 추가', e.response.status),
			});
		});
};
