import _axios from '../lib/axiosConfig';
//import handleError from '../lib/errorHandling';
import { notify } from './notify';

export const DEL_ACCOUNT = 'DEL_ACCOUNT';
export const DEL_ACCOUNT_SUCCESS = 'DEL_ACCOUNT_SUCCESS';
export const DEL_ACCOUNT_FAIL = 'DEL_ACCOUNT_FAIL';

export const delAccount = () => (dispatch) => {
  _axios
    .delete('/profile')
    // eslint-disable-next-line no-unused-vars
    .then((res) => {
      dispatch({
        type: DEL_ACCOUNT_SUCCESS,
      });
      dispatch(notify('계정을 삭제했습니다.'));
      localStorage.removeItem('accessToken');
    })
    .catch((e) => {
      dispatch({
        type: DEL_ACCOUNT_FAIL,
        error: handleError('계정 삭제', e.response.status),
      });
    });
};
