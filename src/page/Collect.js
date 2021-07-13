import React, { useState, useEffect, useRef } from "react";
import CategoryBox from "../components/CategoryBox";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import UnreadAlarm from "../components/UnreadAlarm";
import BottomPopup from "../components/BottomPopup";
import Recollect from "../components/Recollect";
import ToCollectBtn from "../components/ToCollectBtn";
import BookmarksContainer from "../components/BookmarksContainer";
import { SearchBookmark } from "../components/SearchBookmark";

import { useSelector, useDispatch } from "react-redux";
import { recollect } from "../modules/getRecollect";

export default function Collect() {
  const [recollectView, setRecollectView] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const recollectViewHandler = () => {
    setRecollectView(!recollectView);
  };
  return (
    <>
      {/* 검색어 입력수가 0이 아닌경우, 검색어와 일치하는 북마크 랜딩  */}
      {recollectView ? (
        <>
          <ToCollectBtn viewHandler={recollectViewHandler} />
          <Recollect />
        </>
      ) : (
        <>
          <div className="collectview">
            <Sidebar />
            <div className="collectview__right">
              <div className="collectview__title">collect</div>
              <div className="collectview__nav">
                <UnreadAlarm viewHandler={recollectViewHandler} />
                <SearchBar setSearchInput={setSearchInput} />
              </div>
              {searchInput.length !== 0 ? (
                <SearchBookmark searchInput={searchInput} />
              ) : (
                <BookmarksContainer />
              )}
            </div>
          </div>
          <BottomPopup />
        </>
      )}
    </>
  );
}
