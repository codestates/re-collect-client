import axios from 'axios';
import { notify } from './notify';
import { getProfile } from './getProfile';
//import { getAccessToken } from "../modules/getAccessToken";

//const EDIT_USERNAME = 'EDIT_USERNAME';
export const EDIT_USERNAME_SUCCESS = 'EDIT_USERNAME_SUCCESS';
export const EDIT_USERNAME_FAIL = 'EDIT_USERNAME_FAIL';

export const editUsername = (username) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  axios
    .patch(
      'https://api.recollect.today/profile/username',
      {
        username: username, //input.value
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
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