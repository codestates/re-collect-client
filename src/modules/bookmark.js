import initialState from './initialState';
import axios from 'axios';
import bookmarkConverter from '../lib/bookmarkConverter';
import reduceGuestBookmark from '../lib/reduceGuestBookmark';
import reducebookmark from '../lib/reducebookmark';
import { notify } from './notification';

const GET_BOOKMARK = 'GET_BOOKMARK';
const GET_BOOKMARK_SUCCESS = 'GET_BOOKMARK_SUCCESS';
const GET_BOOKMARK_FAIL = 'GET_BOOKMARK_FAIL';
const GET_GUEST_BOOKMARK = 'GET_GUEST_BOOKMARK';

const POST_BOOKMARK = 'POST_BOOKMARK';
const POST_BOOKMARK_SUCCESS = 'POST_BOOKMARK_SUCCESS';
const POST_BOOKMARK_FAIL = 'POST_BOOKMARK_FAIL';
const POST_GUEST_BOOKMARK = 'POST_GUEST_BOOKMARK';

const EDIT_START = 'EDIT_START';
const EDIT_END = 'EDIT_END';
const EDIT_BOOKMARK_SUCCESS = 'EDIT_BOOKMARK_SUCCESS';
const EDIT_BOOKMARK_FAIL = 'EDIT_BOOKMARK_FAIL';
const EDIT_GUEST_BOOKMARK = 'EDIT_GUEST_BOOKMARK';

const DELETE_BOOKMARK_SUCCESS = 'DELETE_BOOKMARK_SUCCESS';
const DELETE_BOOKMARK_FAIL = 'DELETE_BOOKMARK_FAIL';

export const getGuestBookmark = () => ({ type: GET_GUEST_BOOKMARK });

export const getBookmark = () => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');

  dispatch({ type: GET_BOOKMARK });

  axios
    .get('https://api.recollect.today/collect', {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: GET_BOOKMARK_SUCCESS,
        category: res.data.category,
        bookmarks: res.data.bookmark,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_BOOKMARK_FAIL, error: err.message });
    });
};

export const addGuestBookmark = (bookmark) => (dispatch, getState) => {
  const convertedBookmark = bookmarkConverter(bookmark, true, false);

  console.group('컨버티드 북마크 확인');
  console.log(convertedBookmark);
  console.groupEnd();

  // convertedBookmark.bookmarkId =
  //   getState().bookmarkReducer.guestBookmarks.bookmarkId;
  // if (convertedBookmark.bookmarkId === 3) {
  //   dispatch(notify('로그인을 하지 않으면 북마크가 저장되지 않습니다', 10000));
  // }

  // const { bookmarks, category } = getState().bookmarkReducer.guestBookmarks;

  // const copiedCategory = category.slice(0);
  // const copiedBookmarks = bookmarks.map((el) => ({ ...el }));

  // if (copiedCategory.indexOf(convertedBookmark.categoryTitle) === -1) {
  //   copiedCategory.push(convertedBookmark.categoryTitle);
  // }

  // copiedBookmarks.push(convertedBookmark);

  // const newReducedBookmarks = reduceGuestBookmark(
  //   copiedBookmarks,
  //   copiedCategory
  // );

  // dispatch({
  //   type: POST_GUEST_BOOKMARK,
  //   category: copiedCategory,
  //   bookmarks: copiedBookmarks,
  //   reducedbookmarks: newReducedBookmarks,
  // });
};

export const addBookmark = (bookmark) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  const convertedBookmark = bookmarkConverter(bookmark, false, false);

  dispatch({ type: POST_BOOKMARK });

  axios
    .post(
      'https://api.recollect.today/bookmark',
      {},
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then(() => {
      dispatch({ type: POST_BOOKMARK_SUCCESS });
    })
    .then(() => {
      dispatch(getBookmark());
      dispatch(notify('북마크를 추가했습니다'));
    })
    .catch((e) => {
      if (e.response) {
        dispatch({
          type: POST_BOOKMARK_FAIL,
          bookmark: convertedBookmark,
          error: e.response.data.message,
        });
        return;
      }
      dispatch({
        type: POST_BOOKMARK_FAIL,
        bookmark: convertedBookmark,
        error: 'unknown error',
      });
    });
};

export const editStart = (bookmark) => {
  const copiedBookmarks = {
    ...bookmark.item,
    category: bookmark.category,
  };

  return {
    type: EDIT_START,
    bookmark: copiedBookmarks,
  };
};

export const editEnd = () => ({ type: EDIT_END });

export const editGuestBookmark = (editingBookmark) => (dispatch, getState) => {
  console.group('에디팅 북마크 확인');
  console.log(editingBookmark);
  console.groupEnd();

  const convertedBookmark = bookmarkConverter(editingBookmark, true, true);

  console.group('컨버티드 북마크 확인');
  console.log(convertedBookmark);
  console.groupEnd();

  // const { bookmarks, category } = getState().bookmarkReducer.guestBookmarks;

  // const copiedBookmarks = bookmarks.slice(0);
  // const copiedCategory = category.slice(0);

  // copiedBookmarks.splice(convertedBookmark.id, 1, convertedBookmark);

  // if (copiedCategory.indexOf(convertedBookmark.category) === -1) {
  //   copiedCategory.push(editingBookmark.category);
  // }

  // const reducedbookmarks = reduceGuestBookmark(copiedBookmarks, copiedCategory);

  // dispatch({
  //   type: EDIT_GUEST_BOOKMARK,
  //   bookmarks: copiedBookmarks,
  //   category: copiedCategory,
  //   reducedbookmarks,
  // });
  // dispatch(notify('북마크를 수정했습니다'));
};

export const editBookmark = (bookmark) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  const convertedBookmark = bookmarkConverter(bookmark, false, true);

  convertedBookmark.bookmarkId = convertedBookmark.id;
  delete convertedBookmark.id;

  if (accessToken) {
    axios
      .put(
        'https://api.recollect.today/collect',
        { ...convertedBookmark },
        {
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch({ type: EDIT_BOOKMARK_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
        dispatch(notify('북마크를 수정했습니다'));
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response) {
          dispatch({
            type: EDIT_BOOKMARK_FAIL,
            error: e.response.data.message,
          });
          dispatch(notify('북마크 수정 실패했습니다'));
          return;
        }

        dispatch({ type: EDIT_BOOKMARK_FAIL, error: 'unknown error' });
        dispatch(notify('북마크 수정 실패했습니다'));
      });
  } else {
    dispatch({ type: EDIT_BOOKMARK_FAIL, error: 'accessToken Error' });
  }
};

export const deleteGuestBookmark = (bookmark) => (dispatch, getState) => {
  const copiedBookmarks =
    getState.bookmarkReducer.guestBookmarks.bookmarks.slice(0);
  copiedBookmarks.splice(bookmark.id, 1);
};

export const deleteBookmark = (bookmark) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    axios
      .delete('https://api.recollect.today/bookmarks', {
        params: { id: bookmark.id },
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then(() => {
        dispatch({ type: DELETE_BOOKMARK_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
        dispatch(notify('북마크를 삭제했습니다'));
      })
      .catch((e) => {
        dispatch(notify('북마크 삭제 실패했습니다'));
        dispatch({
          type: DELETE_BOOKMARK_FAIL,
          error: e.response.data.message,
        });
      });
  }
};

export const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_BOOKMARK:
      return {
        ...state,
        userBookmarks: { ...state.userBookmarks, isLoading: true },
      };
    case GET_BOOKMARK_SUCCESS:
      return reducebookmark(state, action);
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
          id: (state.guestBookmarks.id += 1),
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
