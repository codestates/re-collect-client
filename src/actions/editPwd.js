import axios from 'axios';
import { notify } from './notify';
import { getProfile } from './getProfile';
//import { getAccessToken } from "../modules/getAccessToken";



//const EDIT_PWD = 'EDIT_PWD';
const EDIT_PWD_SUCCESS = 'EDIT_PWD_SUCCESS';
const EDIT_PWD_FAIL = 'EDIT_PWD_FAIL';

export const editPwd = (pwdInfo) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  axios
    .patch(
      'https://api.recollect.today/profile/pwd',
      {
        pwd: pwdInfo.password,
        newPwd: pwdInfo.newpassword,
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      dispatch({
        type: EDIT_PWD_SUCCESS,
      });
    })
    .then(() => {
      dispatch(getProfile());
      dispatch(notify('비밀번호를 변경했습니다.'));
    })
    .catch((err) => {
      dispatch({ type: EDIT_PWD_FAIL, error: err.message });
    });
};