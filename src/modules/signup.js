import axios from 'axios';

const SIGNUP_INITIALIZE = 'SIGNUP_INITIALIZE';
const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
const SIGNUP_FAIL = 'SIGNUP_FAIL';

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

const initialState = {
  isSuccess: false,
  tempData: {
    email: '',
    username: '',
  },
  error: null,
};

export const signupReducer = (state = initialState, action) => {
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

    default:
      return state;
  }
};
