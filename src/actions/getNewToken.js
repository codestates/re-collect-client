import { logoutThunk } from '../modules/sign';
import axios from 'axios';

export const GET_NEW_TOKEN = 'GET_NEW_TOKEN';

export const getNewToken = () => (dispatch) => {
  axios
    .get(`/auth/token`)
    .then((res) => {
      dispatch({ type: GET_NEW_TOKEN, payload: res.data.accessToken });
    })
    .catch(() => {
      dispatch(logoutThunk());
    });
};
