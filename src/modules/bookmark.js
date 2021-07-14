import initialState from "./initialState";
import axios from "axios";
import bookmarkConverter from "../lib/bookmarkConverter";
import reduceGuestBookmark from "../lib/reduceGuestBookmark";
import reducebookmark from "../lib/reducebookmark";
import { notificationReducer, notify } from "./notification";
import { getAccessToken } from "../modules/getAccessToken";
import Api from "../lib/customAPI";

const GET_BOOKMARK = "GET_BOOKMARK";
const GET_BOOKMARK_SUCCESS = "GET_BOOKMARK_SUCCESS";
const GET_BOOKMARK_FAIL = "GET_BOOKMARK_FAIL";
const GET_GUEST_BOOKMARK = "GET_GUEST_BOOKMARK";

const POST_BOOKMARK = "POST_BOOKMARK";
const POST_BOOKMARK_SUCCESS = "POST_BOOKMARK_SUCCESS";
const POST_BOOKMARK_FAIL = "POST_BOOKMARK_FAIL";
const POST_GUEST_BOOKMARK = "POST_GUEST_BOOKMARK";

const EDIT_START = "EDIT_START";
const EDIT_END = "EDIT_END";
const EDIT_BOOKMARK_SUCCESS = "EDIT_BOOKMARK_SUCCESS";
const EDIT_BOOKMARK_FAIL = "EDIT_BOOKMARK_FAIL";
const EDIT_GUEST_BOOKMARK = "EDIT_GUEST_BOOKMARK";

const DELETE_BOOKMARK_SUCCESS = "DELETE_BOOKMARK_SUCCESS";
const DELETE_BOOKMARK_FAIL = "DELETE_BOOKMARK_FAIL";
const DELETE_GUEST_BOOKMARK = "DELETE_GUEST_BOOKMARK";

export const getGuestBookmark = () => ({ type: GET_GUEST_BOOKMARK });

export const getBookmark = () => (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");

  dispatch({ type: GET_BOOKMARK });

  axios
    .get("https://api.recollect.today/collect", {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      dispatch({
        type: GET_BOOKMARK_SUCCESS,
        // category: res.data.category,
        // bookmarks: res.data.bookmark,
        userBookmarks: res.data,
      });
    })
    .catch((err) => {
      //// accessToken요청 확인필요 ////
      if (err.status == 401) {
        dispatch(getAccessToken());
      } else {
        dispatch({ type: GET_BOOKMARK_FAIL, error: err.message });
      }
    });
};

export const addGuestBookmark = (bookmark) => (dispatch, getState) => {
  const addingBookmark = bookmarkConverter(bookmark, false);

  //현재 등록되어 있는 북마크 아이디, 북마크배열, 카테고리 오브젝트 파악
  const currentBookmarkId = getState().bookmarkReducer.guestBookmarks
    .bookmarkId;
  const { bookmarks, category } = getState().bookmarkReducer.guestBookmarks;
  const currentCategory = { ...category };
  const currentBookmarks = bookmarks.map((el) => ({ ...el }));

  // 게스트가 3번 이하로 추가할 때 알림
  if (currentBookmarkId <= 5) {
    dispatch(notify("로그인을 하지 않으면 북마크가 저장되지 않습니다", 10000));
    //로그인 유도 팝업 띄우기
  }

  //추가하는 북마크의 북마크아이디 등록
  addingBookmark.bookmarkId = currentBookmarkId;

  //추가하는 북마크의 카테고리 아이디 등록
  if (addingBookmark.category.__isNew__) {
    let newCategoryId;
    if (Object.keys(currentBookmarks).length === 0) {
      newCategoryId = 0;
    } else {
      newCategoryId = Math.max(...Object.keys(currentCategory)) + 1;
    }
    currentCategory[newCategoryId] = addingBookmark.category.value;
    addingBookmark.categoryId = newCategoryId;
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
  const accessToken = localStorage.getItem("accessToken");
  const convertedBookmark = bookmarkConverter(bookmark, false);
  convertedBookmark.category = convertedBookmark.category.value;

  dispatch({ type: POST_BOOKMARK });

  axios
    .post(
      "https://api.recollect.today/bookmark",
      { ...convertedBookmark },
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
      dispatch(notify("북마크를 추가했습니다"));
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
        error: "unknown error",
      });
    });
};

export const editStart = (bookmark) => {
  const { item, category } = bookmark;
  const copiedBookmarks = {
    ...item,
    category,
  };

  return {
    type: EDIT_START,
    bookmark: copiedBookmarks,
  };
};

export const editEnd = () => ({ type: EDIT_END });

export const editGuestBookmark = (bookmark) => (dispatch, getState) => {
  const editingBookmark = bookmarkConverter(bookmark, true);

  const { bookmarks, category } = getState().bookmarkReducer.guestBookmarks;

  const currentCategory = { ...category };
  const currentBookmarks = bookmarks.map((el) => ({ ...el }));

  if (editingBookmark.category.__isNew__) {
    let newCategoryId = Math.max(...Object.keys(currentCategory)) + 1;
    currentCategory[newCategoryId] = editingBookmark.category.value;
    editingBookmark.categoryId = newCategoryId;
  }
  editingBookmark.category = editingBookmark.category.value;
  currentBookmarks.splice(editingBookmark.bookmarkId, 1, editingBookmark);

  const reducedbookmarks = reduceGuestBookmark(
    currentBookmarks,
    currentCategory
  );

  dispatch({
    type: EDIT_GUEST_BOOKMARK,
    bookmarks: currentBookmarks,
    category: currentCategory,
    reducedbookmarks,
  });
  dispatch(notify("북마크를 수정했습니다"));
};

export const editBookmark = (bookmark) => (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");
  const convertedBookmark = bookmarkConverter(bookmark, true);
  const id = convertedBookmark.bookmarkId;

  delete convertedBookmark.bookmarkId;

  if (convertedBookmark.category.__isNew__) {
    delete convertedBookmark.categoryId;
  }
  convertedBookmark.categoryTitle = convertedBookmark.category.value;
  delete convertedBookmark.category;

  if (accessToken) {
    axios
      .put(
        "https://api.recollect.today/bookmarks",
        { ...convertedBookmark },
        {
          params: { id },
          headers: { authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(() => {
        dispatch({ type: EDIT_BOOKMARK_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
        dispatch(notify("북마크를 수정했습니다"));
      })
      .catch((e) => {
        console.log(e.response);
        if (e.response) {
          dispatch({
            type: EDIT_BOOKMARK_FAIL,
            error: e.response.data.message,
          });
          dispatch(notify("북마크 수정 실패했습니다"));
          return;
        }

        dispatch({ type: EDIT_BOOKMARK_FAIL, error: "unknown error" });
        dispatch(notify("북마크 수정 실패했습니다"));
      });
  } else {
    dispatch({ type: EDIT_BOOKMARK_FAIL, error: "accessToken Error" });
  }
};

export const deleteGuestBookmark = (bookmark) => (dispatch, getState) => {
  const { category, bookmarks } = getState().bookmarkReducer.guestBookmarks;

  const currentBookmarks = bookmarks.map((el) => ({ ...el }));
  const currentCategory = { ...category };
  let findIdx;
  currentBookmarks.filter((el, idx) => {
    if (el.bookmarkId === bookmark.bookmarkId) {
      findIdx = idx;
    }
  });
  currentBookmarks.splice(findIdx, 1);
  const newReducedbookmarks = reduceGuestBookmark(
    currentBookmarks,
    currentCategory
  );

  newReducedbookmarks.filter((el, idx) => {
    if (el.bookmarks.length === 1) {
      delete currentCategory[Number(el.id)];
      return false;
    }
  });

  dispatch({
    type: DELETE_GUEST_BOOKMARK,
    category: currentCategory,
    bookmarks: currentBookmarks,
    reducedbookmarks: newReducedbookmarks,
  });

  dispatch(notify("북마크를 삭제했습니다"));
};

export const deleteBookmark = (bookmark) => (dispatch) => {
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    axios
      .delete("https://api.recollect.today/bookmarks", {
        params: { id: bookmark.id },
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      })
      .then(() => {
        dispatch({ type: DELETE_BOOKMARK_SUCCESS });
      })
      .then(() => {
        dispatch(getBookmark());
        dispatch(notify("북마크를 삭제했습니다"));
      })
      .catch((e) => {
        dispatch(notify("북마크 삭제 실패했습니다"));
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
      return {
        ...state,
        userBookmarks: { ...action.userBookmarks, isLoading: false },
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
