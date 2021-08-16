import axios from 'axios';
// import { getBookmark } from "../actions/getBookmark.js";
// Todo : merge 후 주석풀고 getBookmark 정상작동하는지 test필요 (siyoon)

export const addVisitCount = (id) => (dispatch) => {
  axios.patch(`/bookmarks/${id}`, {});
  // .then(() => {
  //   dispatch(getBookmark());
  // });
};
