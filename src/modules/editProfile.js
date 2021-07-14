import axios from 'axios';
import { notify } from './notification';

const initialState = {
  profile: {
    username: '',
    email: '',
    company: '',
    gitrepo: '',
    createdAt: '',
    recollectcount: 0,
    favorite:           {
      category: '카테고리를 추가하세요',
      categoryId: null,
      bookmarkId: 0,
      text: '새로운 북마크를 추가하세요',
      url: '',
      importance: 0,
      color: '#214bc8',
      visitCounts: 1,
    },
    error: null,
  },
};

const GET_PROFILE = 'GET_PROFILE';
const GET_PROFILE_SUCCESS = 'GET_PROFILE_SUCCESS';
const GET_PROFILE_FAIL = 'GET_PROFILE_FAIL';

const EDIT_USERNAME = 'EDIT_USERNAME';
const EDIT_USERNAME_SUCCESS = 'EDIT_USERNAME_SUCCESS';
const EDIT_USERNAME_FAIL = 'EDIT_USERNAME_FAIL';

const EDIT_COMPANY = 'EDIT_COMPANY';
const EDIT_COMPANY_SUCCESS = 'EDIT_COMPANY_SUCCESS';
const EDIT_COMPANY_FAIL = 'EDIT_COMPANY_FAIL';

const EDIT_GITREPO = 'EDIT_GITREPO';
const EDIT_GITREPO_SUCCESS = 'EDIT_GITREPO_SUCCESS';
const EDIT_GITREPO_FAIL = 'EDIT_GITREPO_FAIL';

const EDIT_PWD = 'EDIT_PWD';
const EDIT_PWD_SUCCESS = 'EDIT_PWD_SUCCESS';
const EDIT_PWD_FAIL = 'EDIT_PWD_FAIL';

const GET_FAVORITE = 'GET_FAVORITE';

const DEL_ACCOUNT = 'DEL_ACCOUNT';
const DEL_ACCOUNT_SUCCESS = 'DEL_ACCOUNT_SUCCESS';
const DEL_ACCOUNT_FAIL = 'DEL_ACCOUNT_FAIL';

export const getProfile = () => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  axios
    .get('https://api.recollect.today/profile', {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res);

      const favorite = res.data.bookmark.reduce((prev, curr) => {
        return prev.visitCounts > curr.visitCounts ? prev : curr;
      },);

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
      //dispatch(notify('로드실패.'));
    });
};

export const editUsername = (username) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  axios
    .patch(
      'https://api.recollect.today/profile/username',
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
      dispatch(notify('유저네임을 변경했습니다.'));
    })
    .catch((err) => {

      // console.log(err.message);
      // console.log(err, 'err');
      // console.log(err.response, 'err.response');
      if(err.response.message === 'already exist'){
        dispatch(notify('이미 사용중인 유저네임입니다.'));
        return;
      }
      dispatch({ type: EDIT_USERNAME_FAIL, error: err.message });
      dispatch(notify('유저네임 변경 실패'))
    });
};

export const editCompany = (company) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log('컴패니수정하지 뭐하니?');
  axios
    .patch(
      'https://api.recollect.today/profile/company',
      {
        company: company, 
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
      dispatch(notify('직장정보를 변경했습니다.'));
    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: EDIT_COMPANY_FAIL, error: err.message });
      dispatch(notify('직장정보 변경 실패'));
    });
};

export const editGitRepo = (gitrepo) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  console.log(gitrepo, '깃레포 너는 뭐니?');
  axios
    .patch(
      'https://api.recollect.today/profile/gitrepo',
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
      dispatch(notify('깃허브 주소를 변경했습니다.'));
    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: EDIT_GITREPO_FAIL, error: err.message });
      dispatch(notify('깃허브 주소 변경 실패'));
    });
};


export const editPwd = (pwdInfo) => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  axios
    .patch(
      'https://api.recollect.today/profile/pwd',
      {
        pwd: pwdInfo.password,
        newPwd: pwdInfo.newpassword 
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
      dispatch(notify('비밀번호를 변경했습니다.'));

    })
    .catch((err) => {
      console.error(err.message);
      dispatch({ type: EDIT_PWD_FAIL, error: err.message });
    });
};

export const delAccount = () => (dispatch) => {
  const accessToken = localStorage.getItem('accessToken');
  axios
    .delete('https://api.recollect.today/profile', {
      headers: { authorization: `Bearer ${accessToken}` },
      withCredentials: true,
    })
    .then((res) => {
      console.log(res.data.message);
      dispatch({
        type: DEL_ACCOUNT_SUCCESS,
      });
      dispatch(notify("계정을 삭제했습니다."));
      localStorage.removeItem('accessToken');
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
    case GET_PROFILE_FAIL:
      return {
        ...state,
        profile: {...state.profile, error: action.error},
      };
    case EDIT_USERNAME_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    case EDIT_USERNAME_FAIL:
      return {
        ...state,
        profile: { ...state.profile, error: action.error },
      };
    case EDIT_COMPANY_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    case EDIT_COMPANY_FAIL:
      return {
        ...state,
        profile: {...state.profile, error: action.error},
      };
    case EDIT_GITREPO_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    case EDIT_GITREPO_FAIL:
      return {
        ...state,
        profile: {...state.profile, error: action.error},
      };
    case EDIT_PWD_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
      };
    case EDIT_PWD_FAIL:
      return {
        ...state,
        profile: {...state.profile, error: action.error},
      };
    case DEL_ACCOUNT_SUCCESS:
      return {
        ...state,
        profile: { ...state.profile },
    };
    case DEL_ACCOUNT_FAIL:
      return {
        ...state,
        profile: {...state.profile, error: action.error},
      };
    default:
      return state;
  }
};
