import React, { useEffect } from "react";
//import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import BigBookmark from "../components/BigBookmark";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { getProfileInfo, editUsername, editPwd, editCompany, editGitRepo, getFavorite, delAccount } from "../modules/editProfile";

function Profile(props) {
  //get/profile 유저정보(유저네임,이메일,createdAt) 겟//
  //유저네임 아이콘 클릭시 유저네임 변경 팝업? or input 태그로 전환 필요 patch//
  //패스워드 변경 클릭시 패스워드 변경 모달 patch//
  //깃헙,company 추가입력 어디에?// get/profile(gitRepo,company)가능
  //계정삭제 클릭시 계정삭제 모달 delete//
  //클라이언트 또만나요validation check//
  //most popular recollect get/collect 요청 후 최고 visitCounts 북마크 노출//
  const state = useSelector((state) => state.profileReducer);
  const { profile } = state;
  const dispatch = useDispatch();

  const getProfile = async () => {
    const accessToken = window.localStorage.getItem('Token');
    await axios
      .get("https://api.recollect.today/profile", {
        headers: { authorization: accessToken },
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        dispatch(getProfileInfo(res));
      })
      .catch((err) => {
        console.error(err.message);
      });
  };

  const handleInputValue = (key) => (e) => {
    console.log(e.target.value);
    //dispatch(editUsername({[key]: e.target.value}));
  }

  useEffect(() => {
    //getProfile();
    handleInputValue();
  },[])


  return (
    <div className="profile-container">
      <div className="profile-container__inner profile-container__inner--left">
        <div className="profilebox">
          <div className="profilebox__photo">
            <FontAwesomeIcon icon={faUserCircle} className="photo-icon" />
          </div>
          <div className="profilebox__userinfo">
            <div className="usernamebox">
              <input type="text" placeholder={profile.username} 
              onChange={handleInputValue('username')}/>
              <FontAwesomeIcon icon={faPen} className="edit-info" 
                onClick={editUsername}/>
            </div>

            <p>{profile.email}</p>
            <p>Jonined Recollect on {profile.created_at}</p>
          </div>
          <div className="profilebox__follow">
            <p>
              28<br />Recollects
            </p>
            <p>
              214<br />Following
            </p>
            <p>
              370<br />Followers
            </p>
          </div>
          <div className="profilebox__companyngitrepo">
            <div className="profilebox__companyngitrepo__inner">
              <input type="text" placeholder="Currently Working at ..." 
              onChange={handleInputValue('company')}/>
              <FontAwesomeIcon icon={faPen} className="edit-info" />
            </div>
            <div className="profilebox__companyngitrepo__inner">
              <input type="text" placeholder="My Github address" 
              onChange={handleInputValue('gitRepo')}/>
              <FontAwesomeIcon icon={faPen} className="edit-info"  />
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
