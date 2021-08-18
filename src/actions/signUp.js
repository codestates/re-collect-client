import _axios from '../lib/axiosConfig';

export const SIGNUP_INITIALIZE = 'SIGNUP_INITIALIZE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_FAIL = 'SIGNUP_FAIL';

export const SIGNUP_EMAIL_VALIDATION_SUCCESS =
  'SIGNUP_EMAIL_VALIDATION_SUCCESS';
export const SIGNUP_EMAIL_VALIDATION_FAIL = 'SIGNUP_EMAIL_VALIDATION_FAIL';
export const SIGNUP_USERNAME_VALIDATION_SUCCESS =
  'SIGNUP_USERNAME_VALIDATION_SUCCESS';
export const SIGNUP_USERNAME_VALIDATION_FAIL =
  'SIGNUP_USERNAME_VALIDATION_FAIL';

export const EMAIL_VALIDATION_INITIALIZE = 'EMAIL_VALIDATION_INITIALIZE';
export const USERNAME_VALIDATION_INITIALIZE = 'USERNAME_VALIDATION_INITIALIZE';

export const signupInitialize = () => ({
  type: SIGNUP_INITIALIZE,
});

export const signupThunk = (signUpInfo) => async (dispatch) => {
  const { username, pwd } = signUpInfo;
  const email = signUpInfo.email + '@' + signUpInfo.emailService.value;
  try {
    const result = await _axios.post(
      '/signup',
      {
        username,
        pwd,
        email,
      },
      {
        headers: { 'Content-Type': 'application/json' },
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
  _axios
    .post(
      '/auth/email',
      { email },
      { headers: { 'Content-Type': 'application/json' } }
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
  _axios
    .post(
      '/auth/username',
      { username },
      { headers: { 'Content-Type': 'application/json' } }
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
