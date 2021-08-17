import axios from 'axios';
import { notify } from './notify';
//import { getAccessToken } from "../modules/getAccessToken";

//const GET_FAVORITE = 'GET_FAVORITE';

//const DEL_ACCOUNT = 'DEL_ACCOUNT';
const DEL_ACCOUNT_SUCCESS = 'DEL_ACCOUNT_SUCCESS';
const DEL_ACCOUNT_FAIL = 'DEL_ACCOUNT_FAIL';

export const delAccount = () => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  axios
    .delete('https://api.recollect.today/profile', {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
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

