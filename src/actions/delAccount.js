import _axios from '../lib/axiosConfig';
import { notify } from './notify';

export const DEL_ACCOUNT = 'DEL_ACCOUNT';
export const DEL_ACCOUNT_SUCCESS = 'DEL_ACCOUNT_SUCCESS';
export const DEL_ACCOUNT_FAIL = 'DEL_ACCOUNT_FAIL';

export const delAccount = () => (dispatch) => {
  _axios
    .delete('/profile')
    .then((res) => {
      dispatch({
        type: DEL_ACCOUNT_SUCCESS,
      });
      dispatch(notify('계정을 삭제했습니다.'));
      localStorage.removeItem('accessToken');
    })
    .catch((err) => {
      dispatch({ type: DEL_ACCOUNT_FAIL, error: err.message });
    });
};
