import initialState from './initialState';

import {
	GET_BOOKMARK,
	GET_BOOKMARK_SUCCESS,
	GET_BOOKMARK_FAIL,
	GET_GUEST_BOOKMARK,
} from '../actions/getBookmark';
import {
	POST_BOOKMARK,
	POST_BOOKMARK_SUCCESS,
	POST_BOOKMARK_FAIL,
	POST_GUEST_BOOKMARK,
} from '../actions/addBookmark';
import {
	EDIT_START,
	EDIT_END,
	EDIT_BOOKMARK_SUCCESS,
	EDIT_BOOKMARK_FAIL,
	EDIT_GUEST_BOOKMARK,
} from '../actions/editBookmark';
import {
	DELETE_BOOKMARK_SUCCESS,
	DELETE_BOOKMARK_FAIL,
	DELETE_GUEST_BOOKMARK,
} from '../actions/deleteBookmark';

export const bookmarkReducer = (state = initialState, action) => {
	switch (action.type) {
	case GET_BOOKMARK:
		return {
			...state,
			userBookmarks: { ...state.userBookmarks, isLoading: true },
		};
	case GET_BOOKMARK_SUCCESS:
		return {
			...state,
			userBookmarks: {
				...state.userBookmarks,
				...action.userBookmarks,
				isLoading: false,
			},
		};
	case GET_BOOKMARK_FAIL:
		return {
			...state,
			userBookmarks: {
				...state.userBookmarks,
				isLoading: false,
				error: action.error,
			},
		};

	case GET_GUEST_BOOKMARK:
		return { ...state };

	case POST_BOOKMARK:
		return {
			...state,
			tempBookmark: {
				isLoading: true,
				data: null,
				error: null,
			},
		};
	case POST_BOOKMARK_SUCCESS:
		return {
			...state,
			tempBookmark: {
				isLoading: false,
				data: null,
				error: null,
			},
		};

	case POST_BOOKMARK_FAIL:
		return {
			...state,
			tempBookmark: {
				isLoading: false,
				data: action.bookmark,
				error: action.error,
			},
		};

	case POST_GUEST_BOOKMARK:
		return {
			...state,
			guestBookmarks: {
				...state.guestBookmarks,
				bookmarkId: (state.guestBookmarks.bookmarkId += 1),
				category: action.category,
				bookmarks: action.bookmarks,
				reducedbookmarks: action.reducedbookmarks,
			},
		};

	case EDIT_START:
		return {
			...state,
			tempBookmark: {
				...state.tempBookmark,
				isEdit: true,
				data: action.bookmark,
			},
		};

	case EDIT_END:
	case EDIT_BOOKMARK_SUCCESS:
		return {
			...state,
			tempBookmark: {
				...state.tempBookmark,
				isEdit: false,
				data: null,
			},
		};

	case EDIT_BOOKMARK_FAIL:
		return {
			...state,
			tempBookmark: {
				...state.tempBookmark,
				isEdit: true,
				error: action.error,
			},
		};

	case EDIT_GUEST_BOOKMARK:
	case DELETE_GUEST_BOOKMARK:
		return {
			...state,
			tempBookmark: {
				...state.tempBookmark,
				isEdit: false,
				data: null,
			},
			guestBookmarks: {
				...state.guestBookmarks,
				bookmarks: action.bookmarks,
				category: action.category,
				reducedbookmarks: action.reducedbookmarks,
			},
		};

	case DELETE_BOOKMARK_SUCCESS:
		return {
			...state,
			tempBookmark: {
				...state.tempBookmark,
				isEdit: false,
				data: null,
			},
		};

	case DELETE_BOOKMARK_FAIL:
		return {
			...state,
			tempBookmark: {
				...state.tempBookmark,
				error: action.error,
			},
		};

	default:
		return state;
	}
};
