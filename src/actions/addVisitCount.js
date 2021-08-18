import _axios from '../lib/axiosConfig';
// import { getBookmark } from "../actions/getBookmark.js";
// Todo : merge 후 주석풀고 getBookmark 정상작동하는지 test필요 (siyoon)

export const addVisitCount = (id) => (dispatch) => {
  _axios.patch(`/bookmarks/${id}`, {});
  // .then(() => {
  //   dispatch(getBookmark());
  // });
};
