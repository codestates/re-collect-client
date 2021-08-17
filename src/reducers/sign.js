import {
  LOGIN_INITIALIZE,
  LOGIN_SUCCESS,
  LOGIN_FAIL
} from "../actions/signInOut";
import {
  SIGNUP_INITIALIZE, 
  SIGNUP_SUCCESS, 
  SIGNUP_FAIL,
  SIGNUP_EMAIL_VALIDATION_SUCCESS,
  SIGNUP_EMAIL_VALIDATION_FAIL,
  SIGNUP_USERNAME_VALIDATION_SUCCESS,
  SIGNUP_USERNAME_VALIDATION_FAIL,
  EMAIL_VALIDATION_INITIALIZE,
  USERNAME_VALIDATION_INITIALIZE,
} from "../actions/signUp";


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
