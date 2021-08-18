import _axios from '../lib/axiosConfig';
import { notify } from './notify';
//import { getAccessToken } from "../modules/getAccessToken";

export const GET_PROFILE = 'GET_PROFILE';
export const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
export const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';

export const getProfile = () => (dispatch) => {
  dispatch({ type: GET_PROFILE });
  _axios
    .get('/profile')
    .then((res) => {
      const favorite = res.data.bookmark.reduce((prev, curr) => {
        return prev.visitCounts > curr.visitCounts ? prev : curr;
      }, []);

      dispatch({
        type: GET_PROFILE_SUCCESS,
        profile: {
          username: res.data.user.username,
          email: res.data.user.email,
          company: res.data.user.company,
          gitrepo: res.data.user.gitRepo, //대문자여야함
          createdAt: res.data.user.createdAt,
          recollectcount: res.data.bookmark.length,
          favorite: favorite,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: GET_PROFILE_FAIL, error: err.message });

      // if (err.response.status === 401) {
      //   dispatch(getAccessToken());
      //   return;
      // } else {
      //   console.log('err');
      // }
      dispatch(notify('로드실패.'));
    });
};
