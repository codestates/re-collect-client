import React, { useState, useEffect, useRef} from "react";
//import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faCheck, faLaptop } from "@fortawesome/free-solid-svg-icons";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import BigBookmark from "../components/BigBookmark";

import { useSelector, useDispatch } from "react-redux";
import {
  getProfile,
  editUsername,
  editCompany,
  editGitRepo,
  getFavorite,
  editPwd,
  delAccount,
} from "../modules/editProfile";

function Profile(props) {

  const state = useSelector((state) => state.profileReducer);
  const { profile } = state;
  const dispatch = useDispatch();

  // const [inputReadMode, setInputReadMode] = useState({
  //   usernameMode: true,
  //   companyMode: true,
  //   gitRepoMode: true,
  // });
  const [usernameInputReadMode, setUsernameInputReadMode] = useState(true);
  const [companyInputReadMode, setCompanyInputReadMode] = useState(true);
  const [gitRepoInputReadMode, setGitRepoInputReadMode] = useState(true);

  const userInputRef = useRef("");
  const companyInputRef = useRef("");
  const gitRepoInputRef = useRef("");
  //console.log(inputRef.current, 'ref current???')

  const [inputValue, setInputValue] = useState({
    username: '',
    company: '',
    gitrepo: '',
  });

  //-------------onchange event 랜더링 
  const handleInputValue = (e) => {
    const { value, name } = e.target;
    //console.log(value, 'inputvalue')
    e.preventDefault();
    //console.log(inputValue, "inputValue init");
      setInputValue({
        ...inputValue, //복사
        [name]: value, //name키를 가진 값에 value 할당.
      })      


  };

/*유저네임 인풋 활성화 후 체크 버튼 눌렀을 때 유저네임 변경patch */
  const usernameInputActive = (e) => {
    //const usernameInput = document.getElementsByName("username");
    //usernameInput[0].readOnly = !usernameInput[0].readOnly;

    setUsernameInputReadMode(!usernameInputReadMode);
    // setInputReadMode({
    //   ...inputReadMode,
    //   !usernameMode,
    // })
     userInputRef.current.readOnly = !userInputRef.current.readOnly;
     userInputRef.current.disabled = !userInputRef.current.disabled;

    console.log(usernameInputReadMode, "= userreadmode");
    if (e.currentTarget.getAttribute("name") === "usernamecheck") {
      console.log(e.currentTarget.getAttribute("name"), 'username target');
      
      dispatch(editUsername(inputValue.username));
      // console.log(userInputRef.current.value, 'user ref value???????');
      //const userchange = userInputRef.current.value;
      //dispatch(editUsername(userchange));
      //userInputRef.current.value = ""; //초기화시점 체크 필요
      // setInputValue({
      //   username: '',
      //   company: '',
      //   gitRepo: '',
      // })
    }

  };


  /*회사 인풋 활성화 후 체크 버튼 눌렀을 때 회사 변경patch */
  const companyInputActive = (e) => {
    //const companyInput = document.getElementsByName("company");
    //companyInput[0].readOnly = !companyInput[0].readOnly;

    companyInputRef.current.readOnly = !companyInputRef.current.readOnly;
    companyInputRef.current.disabled = !companyInputRef.current.disabled;

    setCompanyInputReadMode(!companyInputReadMode);

    if (e.currentTarget.getAttribute("name") === "companycheck") {
      console.log(e.currentTarget.getAttribute("name"), 'company target');
      dispatch(editCompany(inputValue.company));
      //dispatch(editCompany(companyInputRef.current.value));
      //console.log(companyInputRef.current.value, 'company ref value');
      //companyInputRef.current.value = "";
    }
  };


  /*깃레포 인풋 활성화 후 체크 버튼 눌렀을 때 깃레포 변경patch */
  const gitRepoInputActive = (e) => {
    //const gitRepoInput = document.getElementsByName("gitRepo");
    //gitRepoInput[0].readOnly = !gitRepoInput[0].readOnly;

    setGitRepoInputReadMode(!gitRepoInputReadMode);

    gitRepoInputRef.current.readOnly = !gitRepoInputRef.current.readOnly;
    gitRepoInputRef.current.disabled = !gitRepoInputRef.current.disabled;
    
    if (e.currentTarget.getAttribute("name") === "gitrepocheck") {
      console.log(e.currentTarget.getAttribute("name"), 'gitrepo target');
      dispatch(editGitRepo(inputValue.gitrepo));
      // dispatch(editGitRepo(gitRepoInputRef.current.value));
      // console.log(gitRepoInputRef.current.value, 'gitRepo ref value');
      // gitRepoInputRef.current.value = "";
    }
  };

  console.log("render");

  useEffect(() => {
    dispatch(getProfile());
    console.log('useeffect get 요청 실행')
  }, []); 

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
                onChange={handleInputValue}
                ref={userInputRef}
              />
              <FontAwesomeIcon
                icon={usernameInputReadMode ? faPen : faCheck}
                className="edit-info"
                name={usernameInputReadMode ? "usernamepen" : "usernamecheck"}
                onClick={usernameInputActive}
              />
            </div>
            <p>{profile.email}</p>
            <p>Jonined Recollect on {profile.createdAt.slice(0,10)}</p>
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
                  profile.company ? `Working at ${profile.company}` : "Working at..."
                }
                onChange={handleInputValue}
                ref={companyInputRef}
              />
              <FontAwesomeIcon
                icon={companyInputReadMode ? faPen : faCheck}
                className="edit-info"
                name = {companyInputReadMode ? "companypen" : "companycheck"}
                onClick={companyInputActive}
              />
            </div>
            <div className="profilebox__companyngitrepo__inner">
              <FontAwesomeIcon icon={faGithub} />
              <input
                type="text"
                name="gitrepo"
                readOnly
                disabled
                placeholder={profile.gitrepo ? profile.gitrepo : "-"}
                onChange={handleInputValue}
                ref={gitRepoInputRef}
              />
              <FontAwesomeIcon
                icon={gitRepoInputReadMode ? faPen : faCheck}
                className="edit-info"
                name = {gitRepoInputReadMode ? "gitrepopen" : "gitrepocheck"}
                onClick={gitRepoInputActive}
              />
            </div>
          </div>
          <div className="profilebox__btns">
            <button
              onClick={() => {
                props.setModalMode("changePwd");
              }}
            >
              비밀번호 변경
            </button>
            <button
              onClick={() => {
                props.setModalMode("delAccount");
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
          <BigBookmark id="popular-bigbookmark" />
        </div>
      </div>
    </div>
  );
}

export default Profile;
