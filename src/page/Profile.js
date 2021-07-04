import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import BigBookmark from "../components/BigBookmark";

function Profile() {

  //get/profile 유저정보(유저네임,이메일,createdAt) 겟//
  //유저네임 아이콘 클릭시 유저네임 변경 팝업? or input 태그로 전환 필요 patch//
  //패스워드 변경 클릭시 패스워드 변경 모달 patch//
  //깃헙,company 추가입력 어디에?// get/profile(gitRepo,company)가능
  //계정삭제 클릭시 계정삭제 모달 delete//
  //클라이언트 또만나요validation check// 
  //most popular recollect get/collect 요청 후 최고 visitCounts 북마크 노출// 

  return (
    <div className="profile-container">
      
      <div className="profile-container__inner profile-container__inner--left">
        <div className="profilebox">
          <div className="profilebox__photo">
            <FontAwesomeIcon icon={faUserCircle} className="photo-icon"/>
          </div>
          <div className="profilebox__userinfo">
            <h1>유저네임
              <FontAwesomeIcon icon={faPen} 
              className="edit-username"
              onClick
              />
            </h1>
            <p>collector@recollect.today</p>
            <p>Jonined Recollect on 2021.06.22</p>
          </div>
          <div className="profilebox__follow">
            <p>28<br />Recollects</p>
            <p>214<br />Following</p>
            <p>370<br />Followers</p>
          </div>
          <div className="profilebox__btns">
            <button>패스워드 변경</button>
            <button>계정 삭제</button>
          </div>
        </div>
      </div>

      <div className="slicebox"></div>
      <div className="slicebox-row"></div>
      <div className="profile-container__inner profile-container__inner--right">
        <div className="popular-recollect">
          <h1>Your Most Popular Recollect</h1>
          <BigBookmark id="popular-bigbookmark"/>
        </div>
      </div>
    </div>
  );
}

export default Profile;