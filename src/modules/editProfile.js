import { initialState } from "./initialState";

const GET_PROFILE_INFO = "GET_PROFILE_INFO";
const EDIT_USERNAME = "EDIT_USERNAME";
const EDIT_PWD = "EDIT_PWD";
const EDIT_COMPANY = "EDIT_COMPANY";
const EDIT_GITREPO = "EDIT_GITREPO";
const GET_FAVORITE = "GET_FAVORITE";
const DEL_ACCOUNT = "DEL_ACCOUNT";

export const getProfileInfo = (profileInfo) => {
  return {
    type: GET_PROFILE_INFO,
    payload: profileInfo,
  };
};

export const editUsername = () => {
  return {
    type: EDIT_USERNAME,
    payload: {
      username: 'change username',
    },
  };
};

export const editPwd = () => {
  return {
    type: EDIT_PWD,
    payload: {
      id: 1,
    },
  };
};

export const editCompany = () => {
  return {
    type: EDIT_COMPANY,
    payload: {
      id: 1,
    },
  };
};

export const editGitRepo = () => {
  return {
    type: EDIT_GITREPO,
    payload: {
      id: 1,
    },
  };
};

export const getFavorite = () => {
  return {
    type: GET_FAVORITE,
    payload: {
      id: 1,
    },
  };
};

export const delAccount = () => {
  return {
    type: DEL_ACCOUNT,
    payload: {
      id: 1,
    },
  };
};



const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_INFO:
      return; Object.assign({}, state, {
        profileInfo: [...state.profileInfo, action.payload]
      })
    case EDIT_USERNAME:
      return;
    case EDIT_PWD:
      return;
    case EDIT_COMPANY:
      return;
    case EDIT_GITREPO:
      return;
    case GET_FAVORITE:
      return;
    case DEL_ACCOUNT:
      return;
    default:
      return state;
  }
};

export default profileReducer;