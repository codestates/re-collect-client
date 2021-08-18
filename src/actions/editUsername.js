import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getProfile } from './getProfile';
//import { getAccessToken } from "../modules/getAccessToken";

//const EDIT_USERNAME = 'EDIT_USERNAME';
export const EDIT_USERNAME_SUCCESS = 'EDIT_USERNAME_SUCCESS';
export const EDIT_USERNAME_FAIL = 'EDIT_USERNAME_FAIL';

export const editUsername = (username) => (dispatch) => {
  _axios
    .patch('/profile/username', {
      username: username, //input.value
    })
    .then((res) => {
      dispatch({
        type: EDIT_USERNAME_SUCCESS,
      });
    })
    .then(() => {
      dispatch(getProfile());
      dispatch(notify('유저네임을 변경했습니다.'));
    })
    .catch((err) => {
      // console.log(err.message);
      // console.log(err, 'err');
      // console.log(err.response, 'err.response');
      if (err.response.message === 'already exist') {
        dispatch(notify('이미 사용중인 유저네임입니다.'));
        return;
      }
      dispatch({ type: EDIT_USERNAME_FAIL, error: err.message });
      dispatch(notify('유저네임 변경 실패'));
    });
};
