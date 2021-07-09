import initialState from './initialState';
import axios from 'axios';

const LOGIN = 'LOGIN';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';
const LOGIN_INITIALIZE = 'LOGIN_INITIALIZE';

export const loginInitialize = () => ({ type: LOGIN_INITIALIZE });

export const loginThunk = (userinfo) => async (dispatch) => {
  try {
    const result = await axios.post(
      'https://api.recollect.today/login',
      {
        pwd: userinfo.password,
        email: userinfo.email,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    const accessToken = result.data.accessToken;

    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
      dispatch({ type: LOGIN_SUCCESS });
    } else {
      dispatch({ type: LOGIN_FAIL, error: 'Login failed' });
    }
  } catch (e) {
    if (e.response) {
      dispatch({ type: LOGIN_FAIL, error: e.response.data.message });
      return;
    }
    dispatch({ type: LOGIN_FAIL, error: 'unknown error occured' });
  }
};

export const loginReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_INITIALIZE:
      return {
        ...state,
        user: {
          ...state.user,
          error: null,
        },
      };

    case LOGIN_SUCCESS:
      console.log('여기까지 오는거니?');
      return {
        ...state,
        user: {
          ...state.user,
          isLogin: true,
          error: null,
        },
      };

    case LOGIN_FAIL:
      return {
        ...state,
        user: {
          ...state.user,
          isLogin: false,
          error: action.error,
        },
      };

    default:
      return state;
  }
};
