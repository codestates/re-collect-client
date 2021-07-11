import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faCheck, faLaptop } from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import FavoriteBookmark from '../components/FavoriteBookmark';

import { useSelector, useDispatch } from 'react-redux';
import {
  getProfile,
  editUsername,
  editCompany,
  editGitRepo,
  getFavorite,
} from '../modules/editProfile';

function Profile(props) {
  const state = useSelector((state) => state.profileReducer);
  const { profile } = state;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfile());
    console.log('useeffect get 요청 실행');
  }, [dispatch]);

  const [errorMessage, setErrorMessage] = useState('');

  // const [inputReadMode, setInputReadMode] = useState({
  //   usernameMode: true,
  //   companyMode: true,
  //   gitRepoMode: true,
  // });
  const [usernameInputReadMode, setUsernameInputReadMode] = useState(true);
  const [companyInputReadMode, setCompanyInputReadMode] = useState(true);
  const [gitRepoInputReadMode, setGitRepoInputReadMode] = useState(true);

  const userInputRef = useRef('');
  const companyInputRef = useRef('');
  const gitRepoInputRef = useRef('');

  /*유저네임 인풋 활성화 후 체크 버튼 눌렀을 때 유저네임 변경patch */
  const usernameInputActive = (e) => {
    setUsernameInputReadMode(!usernameInputReadMode);
    userInputRef.current.readOnly = !userInputRef.current.readOnly;
    userInputRef.current.disabled = !userInputRef.current.disabled;

    if (e.currentTarget.getAttribute('name') === 'usernamecheck') {
      console.log(e.currentTarget.getAttribute('name'), 'username target');
      // if(inputValue.username === ''){
      //   return ; //공백인 경우 에러메세지 유효성 검사
      // }
      dispatch(editUsername(userInputRef.current.value));
    }
  };

  /*회사 인풋 활성화 후 체크 버튼 눌렀을 때 회사 변경patch */
  const companyInputActive = (e) => {
    setCompanyInputReadMode(!companyInputReadMode);
    companyInputRef.current.readOnly = !companyInputRef.current.readOnly;
    companyInputRef.current.disabled = !companyInputRef.current.disabled;

    if (e.currentTarget.getAttribute('name') === 'companycheck') {
      // if(inputValue.company === ''){
      //   return ; //긴 공백인 경우 에러메세지
      // }
      dispatch(editCompany(companyInputRef.current.value));
    }
  };

  /*깃레포 인풋 활성화 후 체크 버튼 눌렀을 때 깃레포 변경patch */
  const gitRepoInputActive = (e) => {
    setGitRepoInputReadMode(!gitRepoInputReadMode);
    gitRepoInputRef.current.readOnly = !gitRepoInputRef.current.readOnly;
    gitRepoInputRef.current.disabled = !gitRepoInputRef.current.disabled;

    if (e.currentTarget.getAttribute('name') === 'gitrepocheck') {
      //pattern = /\s/g;
      // if(inputValue.gitrepo === '공백'){
      //   setErrorMessage('공백은 입력하실 수 없습니다.')
      //   return ; //긴 공백인 경우 에러메세지
      // }
      dispatch(editGitRepo(gitRepoInputRef.current.value));
    }
  };

  console.log('render');

  // useEffect(() => {
  //   dispatch(getProfile());
  //   console.log('useeffect get 요청 실행')
  // }, [dispatch]);

  return (
    <div className="profile-container">
      <div className="profile-container__inner profile-container__inner--left">
        <div className="profilebox">
          <div className="profilebox__photo">
            <FontAwesomeIcon icon={faUserCircle} className="photo-icon" />
          </div>
          <div className="profilebox__userinfo">
            <div className="usernamebox">
              <input
                type="text"
                name="username"
                placeholder={profile.username}
                readOnly
                disabled
                ref={userInputRef}
              />
              <FontAwesomeIcon
                icon={usernameInputReadMode ? faPen : faCheck}
                className="edit-info"
                name={usernameInputReadMode ? 'usernamepen' : 'usernamecheck'}
                onClick={usernameInputActive}
              />
              <div className="errorMessage">{errorMessage}</div>
            </div>
            <p>{profile.email}</p>
            <p>Jonined Recollect on {profile.createdAt.slice(0, 10)}</p>
          </div>
          <div className="profilebox__follow">
            <p>
              {profile.recollectcount}
              <br />
              Recollects
            </p>
            <p>
              -<br />
              Following
            </p>
            <p>
              -<br />
              Followers
            </p>
          </div>
          <div className="profilebox__companyngitrepo">
            <div className="profilebox__companyngitrepo__inner">
              <FontAwesomeIcon icon={faLaptop} />
              <input
                type="text"
                name="company"
                readOnly
                disabled
                placeholder={
                  profile.company
                    ? `Working at ${profile.company}`
                    : 'Working at...'
                }
                ref={companyInputRef}
              />
              <FontAwesomeIcon
                icon={companyInputReadMode ? faPen : faCheck}
                className="edit-info"
                name={companyInputReadMode ? 'companypen' : 'companycheck'}
                onClick={companyInputActive}
              />
              <div className="errorMessage">{errorMessage}</div>
            </div>
            <div className="profilebox__companyngitrepo__inner">
              <FontAwesomeIcon icon={faGithub} />
              <input
                type="text"
                name="gitrepo"
                readOnly
                disabled
                placeholder={profile.gitrepo ? profile.gitrepo : '-'}
                ref={gitRepoInputRef}
              />
              <FontAwesomeIcon
                icon={gitRepoInputReadMode ? faPen : faCheck}
                className="edit-info"
                name={gitRepoInputReadMode ? 'gitrepopen' : 'gitrepocheck'}
                onClick={gitRepoInputActive}
              />
              <div className="errorMessage">{errorMessage}</div>
            </div>
          </div>
          <div className="profilebox__btns">
            <button
              onClick={() => {
                props.setModalMode('changePwd');
              }}
            >
              비밀번호 변경
            </button>
            <button
              onClick={() => {
                props.setModalMode('delAccount');
              }}
            >
              계정 삭제
            </button>
          </div>
        </div>
      </div>

      <div className="slicebox"></div>
      <div className="slicebox-row"></div>
      <div className="profile-container__inner profile-container__inner--right">
        <div className="popular-recollect">
          <h1>My Favorite Recollect</h1>
          <FavoriteBookmark favorite={profile.favorite} />
        </div>
      </div>
    </div>
  );
}

export default Profile;
