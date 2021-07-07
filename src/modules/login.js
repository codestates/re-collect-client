import { initialState } from './initialState';
import axios from 'axios';

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN';
const LOGIN_FAIL = 'LOGIN';

export const login = (userinfo) => (dispatch) => {
  axios
    .post(
      'https://api.recollect.today/login',
      {
        pwd: userinfo.password,
        email: userinfo.email,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    )
    .then((res) => {
      const accessToken = res.headers.authorization;
      localStorage.setItem('Token', accessToken);
      dispatch({ type: LOGIN_SUCCESS });
    })
    .catch((err) => {
      dispatch({ type: LOGIN_FAIL, error: err.message });
    });
};
