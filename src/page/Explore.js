import React, { useEffect } from "react";
import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import ExploreProfileList from "../components/ExploreProfileList";
import BigBookmark from "../components/BigBookmark";
import { useSelector, useDispatch } from "react-redux";
import { getExploreInfo } from "../modules/getExplore";
import SlickArrow from "../components/SlickArrow";

export default function SimpleSlider(props) {
  const settings = {
    dots: true, // 캐러셀이미지가 몇번째인지 알려주는 점을 보여줄지 정한다.
    infinite: true, // loop를 만들지(마지막 이미지-처음 이미지-중간 이미지들-마지막 이미지)
    speed: 500, // 애미메이션의 속도, 단위는 milliseconds
    slidesToShow: 4, // 한번에 몇개의 슬라이드를 보여줄 지
    arrows: true, // 옆으로 이동하는 화살표 표시 여부
    slidesToScroll: 1, // 한번 스크롤시 몇장의 슬라이드를 넘길지
    prevArrow: <SlickArrow direction={faArrowLeft} />,
    nextArrow: <SlickArrow direction={faArrowRight} />,

    responsive: [
      // 반응형 웹 구현 옵션
      {
        breakpoint: 1200, //화면 사이즈 1200px
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 900, //화면 사이즈 900px
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600, //화면 사이즈 600px
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const dispatch = useDispatch();
  const state = useSelector((state) => state.getExploreReducer);
  const fakeData = [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }];

  // 더미데이터 요청 //
  useEffect(() => {
    dispatch(getExploreInfo());
  }, []);

  return (
    <div className="exploreContainer">
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
      <div className="exploreProfileCarousal">
        <Slider {...settings}>
          {/* users데이터를 받아와서 렌덜할시 끊기는 오류가 있어서 fakeData사용 */}
          {state === null
            ? fakeData.map((el) => {
                return (
                  <ExploreProfileList
                    className="explore"
                    key={el.id}
                    user={el}
                    id="carousel"
                  />
                );
              })
            : state.users.users.map((userInfo) => {
                return (
                  <ExploreProfileList
                    className="explore"
                    key={userInfo.id}
                    user={userInfo}
                    id="carousel"
                  />
                );
              })}
        </Slider>
      </div>
      {/* bookmark 더미데이터 initialState에 넣어두는게 맞을지? */}
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
  );
}
