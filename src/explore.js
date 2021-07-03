import React, { useEffect } from "react";
import ExploreProfile from "./components/ExploreProfile";
import { IsValidateEmail } from "./validation";

function Explore(props) {
  // Open-Popup
  const isOpen = () => {
    const popup = document.querySelector(".modalWrapper");
    const bkg = document.querySelector(".exploreContainer");
    popup.style.display = "flex";
    bkg.style.backgroundColor = "rgba(0, 0, 0, 0.6)";
  };
  // Close-Popup
  const isClose = () => {
    const popup = document.querySelector(".modalWrapper");
    const bkg = document.querySelector(".exploreContainer");
    popup.style.display = "none";
    bkg.style.backgroundColor = "white";
  };
  // Validation check
  const isValid = () => {
    const emailForSubscribe = document.querySelector(".emailForSubscribe")
      .value;
    if (IsValidateEmail(emailForSubscribe)) {
      isClose();
    } else {
      const error = document.querySelector(".errorMessage");
      error.style.display = "flex";
    }
  };

  useEffect(() => {
    isOpen();
    return () => {
      isClose();
    };
  });

  return (
    <div>
      {/* Modal 팝업 */}
      <div className="modalWrapper">
        <div className="closeBtn" onClick={isClose}>
          <i className="fas fa-times"></i>
        </div>
        <div className="contents">
          <p>
            아직 준비중인 서비스 입니다 <br /> 기대해주세요!
          </p>
          <input className="emailForSubscribe" placeholder="Email" />
          <button onClick={isValid}>업데이트 소식받기</button>
          <div className="errorMessage"> 이메일을 확인해주세요 </div>
        </div>
      </div>

      {/* 메인 컨텐츠 */}
      <div className="exploreContainer">
        {/* Search 검색바  */}
        <div className="searchContainer">
          <div className="exploreHeader"> Explore </div>
          <div className="searchBar">
            <input type="text" placeholder="search" />
            <button>
              <i className="fas fa-search"></i>
            </button>
          </div>
          <div className="exploreSearchRecommendation">
            <div className="recommendTitle"> Recommendation </div>
            <div className="recommendTags">
              <span className="recommendTag"> 프론트엔드 해외취업 </span>
              <span className="recommendTag"> JWT토큰 </span>
              <span className="recommendTag"> 비동기 이해하기 </span>
              <span className="recommendTag"> 그림으로 보는 알고리즘 </span>
              <span className="recommendTag"> 호주 리드개발자가 되기까지</span>
            </div>
          </div>
        </div>

        {/* Profile 캐러셀  */}
        <ExploreProfile />

        {/* Interesting Bookmark */}
        <div className="interestingBookmarksCategory">
          <p> Interesting Bookmarks</p>
          <ul>
            <li> 리액트 상태관리 </li>
            <li> AWS s3 정복하기 </li>
            <li> 천재개발자가 자주들어가는 블로그 </li>
            <li> Git 명령어 모음 </li>
            <li> 리액트 훅 vs 리덕스 </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Explore;
