import axios from "axios";

export const GET_BOOKMARK = 'GET_BOOKMARK';
export const GET_BOOKMARK_SUCCESS = 'GET_BOOKMARK_SUCCESS';
export const GET_BOOKMARK_FAIL = 'GET_BOOKMARK_FAIL';
export const GET_GUEST_BOOKMARK = 'GET_GUEST_BOOKMARK';

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
        userBookmarks: res.data,
      });
    })
    .catch((err) => {
      //// accessToken요청 확인필요 ////
      // if (err.response.status === 401) {
      //   dispatch(getAccessToken());
      //   return;
      // } else {
      dispatch({ type: GET_BOOKMARK_FAIL, error: err.message });
      // }
    });
};