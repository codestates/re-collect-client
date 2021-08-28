/* eslint-disable indent */
import _axios from '../lib/axiosConfig';
import { notify } from './notify';
import { getProfile } from './getProfile';
import handleError from '../lib/errorHandling';

export const EDIT_PWD_INITIALIZE = 'EDIT_PWD_INITIALIZE';
export const EDIT_PWD_SUCCESS = 'EDIT_PWD_SUCCESS';
export const EDIT_PWD_FAIL = 'EDIT_PWD_FAIL';

export const editPwdInitialize = () => ({
	type: EDIT_PWD_INITIALIZE,
});

export const editPwd = (pwdInfo) => (dispatch) => {
  _axios
    .patch('/profile/pwd', {
      pwd: pwdInfo.password,
      newPwd: pwdInfo.newpassword,
    })
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      dispatch({
        type: EDIT_PWD_SUCCESS,
      });
    })
    .then(() => {
      dispatch(getProfile());
      dispatch(notify('비밀번호를 변경했습니다.'));
    })
    .catch((e) => {
      dispatch({
        type: EDIT_PWD_FAIL,
        error: handleError('비밀번호 변경', e.response.status),
      });
    });
};
