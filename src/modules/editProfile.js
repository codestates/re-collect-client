import axios from "axios";

const initialState = {
  profile: {
    username: "init유저네임",
    password: "패스워드",
    email: "initial@recollect.today",
    company: "",
    gitRepo: "",
    created_at: "2021.07.07",
    recollectcount: 0,
    //favorite: {},
    error: null,
  },
};

const GET_PROFILE = "GET_PROFILE";
const GET_PROFILE_SUCCESS = "GET_PROFILE_SUCCESS";
const GET_PROFILE_FAIL = "GET_PROFILE_FAIL";

const EDIT_USERNAME = "EDIT_USERNAME";
const EDIT_USERNAME_SUCCESS = "EDIT_USERNAME_SUCCESS";
const EDIT_USERNAME_FAIL = "EDIT_USERNAME_FAIL";

const EDIT_COMPANY = "EDIT_COMPANY";
const EDIT_COMPANY_SUCCESS = "EDIT_COMPANY_SUCCESS";
const EDIT_COMPANY_FAIL = "EDIT_COMPANY_FAIL";

const EDIT_GITREPO = "EDIT_GITREPO";
const EDIT_GITREPO_SUCCESS = "EDIT_GITREPO_SUCCESS";
const EDIT_GITREPO_FAIL = "EDIT_GITREPO_FAIL";

const EDIT_PWD = "EDIT_PWD";
const GET_FAVORITE = "GET_FAVORITE";
const DEL_ACCOUNT = "DEL_ACCOUNT";

const accessToken = localStorage.getItem("accessToken");

export const getProfile = () => async (dispatch) => {
  await axios
    .get("https://api.recollect.today/profile", {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);
      dispatch({
        type: GET_PROFILE_SUCCESS,
        profile: {
          username: res.user.username,
          email: res.user.email,
          company: res.user.company,
          gitRepo: res.user.gitRepo,
          created_at: res.user.created_at,
          recollectcount: res.bookmark.length - 1,
          // favorite: visitCounts 가 제일 많은 res.bookmark객체 1개,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: GET_PROFILE_FAIL, error: err.message });
    });
};

export const editUsername = (inputValue) => async (dispatch) => {
  await axios
    .patch(
      "https://api.recollect.today/profile/username",
      {
        username: inputValue.username, //input.value
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: EDIT_USERNAME_SUCCESS,
      });
    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: EDIT_USERNAME_FAIL, error: err.message });
    });
};

export const editCompany = (inputValue) => async (dispatch) => {
  await axios
    .patch(
      "https://api.recollect.today/profile/company",
      {
        company: inputValue.company, //input.value
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: EDIT_COMPANY_SUCCESS,
      });
    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: EDIT_COMPANY_FAIL, error: err.message });
    });
};


export const editGitRepo = (inputValue) => async (dispatch) => {
  await axios
    .patch(
      "https://api.recollect.today/profile/gitrepo",
      {
        gitRepo: inputValue.gitRepo, //input.value
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: EDIT_GITREPO_SUCCESS,
      });
    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: EDIT_GITREPO_FAIL, error: err.message });
    });
};

// export const getFavorite = () => {
//   return {
//     type: GET_FAVORITE,
//     payload: {
//       id: 1,
//     },
//   };
// };

// export const editPwd = () => {
//   return {
//     type: EDIT_PWD,
//     payload: {
//       id: 1,
//     },
//   };
// };

// export const delAccount = () => {
//   return {
//     type: DEL_ACCOUNT,
//     payload: {
//       id: 1,
//     },
//   };
// };

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };
    case EDIT_USERNAME_SUCCESS:
      return{
        ...state,
        profile: action.profile,
      }
    case EDIT_COMPANY_SUCCESS:
      return{
        ...state,
        profile: action.profile,
      }
    case EDIT_GITREPO_SUCCESS:
      return{
        ...state,
        profile: action.profile,
      }
    case GET_FAVORITE:
      return;
    case EDIT_PWD:
      return;
    case DEL_ACCOUNT:
      return;
    default:
      return state;
  }
};

//export default profileReducer;
