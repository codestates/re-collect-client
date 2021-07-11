import axios from "axios";

const initialState = {
  profile: {
    username: "",
    //password: '',
    email: "",
    company: "",
    gitrepo: "",
    createdAt: "",
    recollectcount: 0,
    favorite: {},
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
const EDIT_PWD_SUCCESS = "EDIT_PWD_SUCCESS";
const EDIT_PWD_FAIL = "EDIT_PWD_FAIL";

const GET_FAVORITE = "GET_FAVORITE";

const DEL_ACCOUNT = "DEL_ACCOUNT";
const DEL_ACCOUNT_SUCCESS = "DEL_ACCOUNT_SUCCESS";
const DEL_ACCOUNT_FAIL = "DEL_ACCOUNT_FAIL";

const accessToken = localStorage.getItem("accessToken");

export const getProfile = () => async (dispatch) => {
  await axios
    .get("https://api.recollect.today/profile", {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);

      const favorite = res.data.bookmark.reduce((prev, curr) => {
        return prev.visitCounts > curr.visitCounts ? prev : curr;
      })

      dispatch({
        type: GET_PROFILE_SUCCESS,
        profile: {
          username: res.data.user.username,
          email: res.data.user.email,
          company: res.data.user.company,
          gitrepo: res.data.user.gitRepo, //대문자여야함
          createdAt: res.data.user.createdAt,
          recollectcount: res.data.bookmark.length,
          favorite: favorite,
        },
      });
    })
    .catch((err) => {
      dispatch({ type: GET_PROFILE_FAIL, error: err.message });
    });
};

export const editUsername = (username) => async (dispatch) => {
  //console.log(userInputRef.current, '유저인풋이 뭐니?');
  console.log(username, "유저인풋이 뭐니?");
  //console.log(userchange, '유저인풋이 뭐니?');

    await axios
      .patch(
        "https://api.recollect.today/profile/username",
        {
          username: username, //input.value
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
      .then(() => {
        dispatch(getProfile());
      })
      .catch((err) => {
        console.error(err.message);
        dispatch({ type: EDIT_USERNAME_FAIL, error: err.message });
      });
};

export const editCompany = (company) => async (dispatch) => {
  await axios
    .patch(
      "https://api.recollect.today/profile/company",
      {
        company: company, //input.value
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
    .then(() => {
      dispatch(getProfile());
    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: EDIT_COMPANY_FAIL, error: err.message });
    });
};

export const editGitRepo = (gitrepo) => async (dispatch) => {
  console.log(gitrepo, "깃레포 너는 뭐니?");
  await axios
    .patch(
      "https://api.recollect.today/profile/gitrepo",
      {
        gitrepo: gitrepo, //input.value
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
    .then(() => {
      dispatch(getProfile());
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

export const editPwd = (pwdInfo) => async (dispatch) => {
  await axios
    .patch(
      "https://api.recollect.today/profile/pwd",
      {
        pwd: pwdInfo.newpassword, //일단 새비번 문자열만 보냄.
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res);
      dispatch({
        type: EDIT_PWD_SUCCESS,
      });
    })
    .then(() => {
      dispatch(getProfile());
    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: EDIT_PWD_FAIL, error: err.message });
    });
};


export const delAccount = () => async (dispatch) => {
  await axios
    .del(
      "https://api.recollect.today/profile",
      {
        headers: { authorization: `Bearer ${accessToken}` },
        withCredentials: true,
      }
    )
    .then((res) => {
      console.log(res.data.message);
      dispatch({
        type: DEL_ACCOUNT_SUCCESS,
      });
    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: DEL_ACCOUNT_FAIL, error: err.message });
    });
};

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROFILE_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };
    case EDIT_USERNAME_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    case EDIT_COMPANY_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    case EDIT_GITREPO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    case GET_FAVORITE:
      return;
    case EDIT_PWD_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    case DEL_ACCOUNT_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    default:
      return state;
  }
};

//export default profileReducer;
