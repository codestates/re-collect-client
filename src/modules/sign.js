import axios from 'axios';

const SIGNUP_INITIALIZE = 'SIGNUP_INITIALIZE';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'SIGNUP_FAIL';

const LOGIN_INITIALIZE = 'LOGIN_INITIALIZE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

const LOGOUT_SUCCESS = '';
const LOGOUT_FAIL = '';

export const signupInitialize = () => ({
  type: SIGNUP_INITIALIZE,
});

export const signupThunk = (signUpInfo) => async (dispatch) => {
  try {
    const result = await axios.post(
      'https://api.recollect.today/signup',
      {
        username: signUpInfo.username,
        pwd: signUpInfo.pwd,
        email: signUpInfo.email,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: SIGNUP_SUCCESS });
  } catch (e) {
    dispatch({
      type: SIGNUP_FAIL,
      email: signUpInfo.email,
      username: signUpInfo.username,
      error: e.response.data.message,
    });
  }
};

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

export const logoutThunk = () => () => {
  const accessToken = localStorage.getItem('accessToken');

  axios
    .get('https://api.recollect.today/logout', {
      headers: {
        authorization: `Bearer ${accessToken}`,
        withCredentials: true,
      },
    })
    .then(() => {
      localStorage.removeItem('accessToken');
    })
    .catch(() => {
      localStorage.removeItem('accessToken');
    });
};

const initialState = {
  user: {
    isLogin: false,
    error: null,
  },

  isSuccess: false,
  tempData: {
    email: '',
    username: '',
  },
  error: null,
};

export const signReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_INITIALIZE:
      return {
        ...state,
        isSuccess: false,
        tempData: {
          ...state.tempData,
          email: '',
          username: '',
        },
        error: null,
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSuccess: true,
        tempData: {
          ...state.tempData,
          email: '',
          username: '',
        },
        error: null,
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        isSuccess: false,
        tempData: {
          ...state.tempData,
          email: action.email,
          username: action.username,
        },
        error: action.error,
      };

    case LOGIN_INITIALIZE:
      return {
        ...state,
        user: {
          ...state.user,
          error: null,
        },
      };

    case LOGIN_SUCCESS:
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
