import axios from 'axios';

const SIGNUP_INITIALIZE = 'SIGNUP_INITIALIZE';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'SIGNUP_FAIL';

const SIGNUP_EMAIL_VALIDATION_SUCCESS = 'SIGNUP_EMAIL_VALIDATION_SUCCESS';
const SIGNUP_EMAIL_VALIDATION_FAIL = 'SIGNUP_EMAIL_VALIDATION_FAIL';
const SIGNUP_USERNAME_VALIDATION_SUCCESS = 'SIGNUP_USERNAME_VALIDATION_SUCCESS';
const SIGNUP_USERNAME_VALIDATION_FAIL = 'SIGNUP_USERNAME_VALIDATION_FAIL';

const EMAIL_VALIDATION_INITIALIZE = 'EMAIL_VALIDATION_INITIALIZE';
const USERNAME_VALIDATION_INITIALIZE = 'USERNAME_VALIDATION_INITIALIZE';

const LOGIN_INITIALIZE = 'LOGIN_INITIALIZE';
const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
const LOGIN_FAIL = 'LOGIN_FAIL';

export const signupInitialize = () => ({
  type: SIGNUP_INITIALIZE,
});

export const signupThunk = (signUpInfo) => async (dispatch) => {
  const { username, pwd } = signUpInfo;
  const email = signUpInfo.email + '@' + signUpInfo.emailService;
  try {
    const result = await axios.post(
      'https://api.recollect.today/signup',
      {
        username,
        pwd,
        email,
      },
      {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      }
    );

    dispatch({ type: SIGNUP_SUCCESS });
  } catch (e) {
    let error;
    switch (e.response.status) {
      case 501:
      case 500:
        error = '서버 오류';
        break;
      case 409:
        error = '사용중인 계정입니다.';
        break;
      case 422:
        error = '잘못된 정보입력';
        break;
      default:
        error = 'Unknown Error';
    }
    dispatch({
      type: SIGNUP_FAIL,
      error,
    });
  }
};

export const validationInitialize = (name) => (dispatch) => {
  switch (name) {
    case 'email':
      dispatch({ type: EMAIL_VALIDATION_INITIALIZE });
      break;
    case 'username':
      dispatch({ type: USERNAME_VALIDATION_INITIALIZE });
      break;
    default:
      return;
  }
};

export const emailValidation = (email) => (dispatch) => {
  axios
    .post(
      'https://api.recollect.today/auth/email',
      { email },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    )
    .then(() => {
      dispatch({ type: SIGNUP_EMAIL_VALIDATION_SUCCESS });
    })
    .catch((e) => {
      let error;
      switch (e.response.status) {
        case 501:
        case 500:
          error = '서버 오류';
          break;
        case 409:
          error = '사용중인 이메일 입니다.';
          break;
        case 422:
          error = '잘못된 정보입력';
          break;
        default:
          error = 'Unknown Error';
      }

      dispatch({
        type: SIGNUP_EMAIL_VALIDATION_FAIL,
        error,
      });
    });
};

export const usernameValidation = (username) => (dispatch) => {
  axios
    .post(
      'https://api.recollect.today/auth/username',
      { username },
      { headers: { 'Content-Type': 'application/json' }, withCredentials: true }
    )
    .then(() => {
      dispatch({ type: SIGNUP_USERNAME_VALIDATION_SUCCESS });
    })
    .catch((e) => {
      let error;
      switch (e.response.status) {
        case 501:
        case 500:
          error = '서버 오류';
          break;
        case 409:
          error = '사용중인 유저네임 입니다.';
          break;
        case 422:
          error = '잘못된 정보입력';
          break;
        default:
          error = 'Unknown Error';
      }
      dispatch({
        type: SIGNUP_USERNAME_VALIDATION_FAIL,
        error,
      });
    });
};

export const loginInitialize = () => ({ type: LOGIN_INITIALIZE });

export const loginThunk = (userinfo) => async (dispatch) => {
  try {
    console.log('여기까지');
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
    console.log(result);

    const accessToken = result.headers.authorization;

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

  isSignupSuccess: {
    email: false,
    username: false,
    overall: false,
  },
  signupError: {
    email: null,
    username: null,
    overall: null,
  },
};

export const signReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGNUP_INITIALIZE:
      return {
        ...state,
        isSignupSuccess: {
          email: false,
          username: false,
          overall: false,
        },
        signupError: {
          email: null,
          username: null,
          overall: null,
        },
      };

    case SIGNUP_SUCCESS:
      return {
        ...state,
        isSignupSuccess: {
          ...state.isSignupSuccess,
          overall: true,
        },
        signupError: {
          email: null,
          username: null,
          overall: null,
        },
      };

    case SIGNUP_FAIL:
      return {
        ...state,
        isSignupSuccess: {
          ...state.isSignupSuccess,
          overall: false,
        },
        signupError: {
          ...state.signupError,
          overall: action.error,
        },
      };

    case SIGNUP_EMAIL_VALIDATION_SUCCESS:
      return {
        ...state,
        isSignupSuccess: {
          ...state.isSignupSuccess,
          email: true,
        },
        signupError: {
          ...state.signupError,
          email: null,
        },
      };

    case SIGNUP_EMAIL_VALIDATION_FAIL:
      return {
        ...state,
        isSignupSuccess: {
          ...state.isSignupSuccess,
          email: false,
        },
        signupError: {
          ...state.signupError,
          email: action.error,
        },
      };

    case SIGNUP_USERNAME_VALIDATION_SUCCESS:
      return {
        ...state,
        isSignupSuccess: {
          ...state.isSignupSuccess,
          username: true,
        },
        signupError: {
          ...state.signupError,
          username: null,
        },
      };
    case SIGNUP_USERNAME_VALIDATION_FAIL:
      return {
        ...state,
        isSignupSuccess: {
          ...state.isSignupSuccess,
          username: false,
        },
        signupError: {
          ...state.signupError,
          username: action.error,
        },
      };

    case EMAIL_VALIDATION_INITIALIZE:
      return {
        ...state,
        isSignupSuccess: {
          ...state.isSignupSuccess,
          email: false,
        },
      };

    case USERNAME_VALIDATION_INITIALIZE:
      return {
        ...state,
        isSignupSuccess: {
          ...state.isSignupSuccess,
          username: false,
        },
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
