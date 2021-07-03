import React, { useState, useEffect } from "react";
import ExploreProfileList from "./ExploreProfileList";
import { userInfoLists } from "./Explore_temp";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight  } from '@fortawesome/free-solid-svg-icons';

function ExploreProfile(props) {
  const [index, setIndex] = useState(0);

  const prevBtnClick = () => {
    if (index === 0) return;
    setIndex(index - 1);
  };

  const setMaxIdx = (num) => {
    if (userInfoLists.length % num === 0) {
      return userInfoLists.length / num - 1;
    } else {
      return Math.floor(userInfoLists.length / num);
    }
  };

  const nexBtnClick = () => {
    const lists = document.querySelector(".searchProfileLists");
    console.log(lists.clientWidth);
    if (lists.clientWidth === 1182) {
      if (index === setMaxIdx(4)) return;
    } else if (lists.clientWidth === 900) {
      if (index === setMaxIdx(3)) return;
    } else if (lists.clientWidth === 592) {
      if (index === setMaxIdx(2)) return;
    } else if (lists.clientWidth === 295) {
      if (index === setMaxIdx(1)) return;
    }
    setIndex(index + 1);
  };

  useEffect(() => {
    const lists = document.querySelector(".searchProfileLists");
    lists.style.transform = `translate3d(-${
      lists.clientWidth * index
    }px, 0, 0)`;
  });

  return (
    <div className="exploreProfileCarousal">
      <div className="prevBtn" onClick={prevBtnClick}>
        <FontAwesomeIcon icon={faArrowLeft} />
      </div>

      <div className="searchProfileWrapper">
        <div className="searchProfileLists">
          {userInfoLists.map((el) => (
            // console.log(el.id)
            <ExploreProfileList />
          ))}
        </div>
      </div>
      <div className="nextBtn" onClick={nexBtnClick}>
        <FontAwesomeIcon icon={faArrowRight} />
      </div>
    </div>
  );
}

export default ExploreProfile;
