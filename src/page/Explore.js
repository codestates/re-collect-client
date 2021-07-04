import React, { useEffect } from "react";
import ExploreProfile from "../components/ExploreProfile";
import { IsValidateEmail } from "../util/validation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes, faSearch } from "@fortawesome/free-solid-svg-icons";
import BigBookmark from "../components/BigBookmark";

function Explore(props) {
  return (
    <div>
      {/* 메인 컨텐츠 */}
      <div className="exploreContainer">
        {/* Search 검색바  */}
        <div className="searchContainer">
          <div className="exploreHeader"> Explore </div>
          <div className="searchBar">
            <input type="text" placeholder="search" />
            <button>
              <FontAwesomeIcon icon={faSearch} />
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
            <BigBookmark />
            <BigBookmark />
            <BigBookmark />
            <BigBookmark />
            <BigBookmark />
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Explore;
