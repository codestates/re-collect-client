import React, { useState, useEffect, useRef } from "react";
import CategoryBox from "../components/CategoryBox";
import Sidebar from "../components/Sidebar";
import SearchBar from "../components/SearchBar";
import UnreadAlarm from "../components/UnreadAlarm";
import BottomPopup from "../components/BottomPopup";
import Recollect from "../components/Recollect";
import ToCollectBtn from "../components/ToCollectBtn";
import BookmarksContainer from "../components/BookmarksContainer";

// 지우님  "카테고리 별로 묶고 그 안에서 또 저장된 순서대로 정렬" 한 결과가 아래 fakeData 형식이면 될 것 같습니다!

const fakeData = [
  {
    category: "this is a test category 1 ",
    bookmarks: [
      {
        id: 1,
        text: "recollect 1",
        url: "www.",
        color: "#214bc8",
        importance: 0,
        visitCounts: 3,
      },
    ],
  },
  {
    category: "this is a test category 2",
    bookmarks: [
      {
        id: 2,
        text: "recollect 2",
        url: "www.",
        color: "#214bc8",
        importance: 1,
        visitCounts: 3,
      },
    ],
  },
  {
    category: "this is a test category 3",
    bookmarks: [
      {
        id: 3,
        text: "recollect 3",
        url: "https://www.google.com",
        color: "#214bc8",
        importance: 1,
        visitCounts: 3,
      },
      {
        id: 4,
        text: "recollect 4",
        url: "www.",
        color: "#214bc8",
        importance: 0,
        visitCounts: 3,
      },
      {
        id: 5,
        text: "recollect 5",
        url: "www.",
        color: "#214bc8",
        importance: 1,
        visitCounts: 3,
      },
    ],
  },
];

export default function Collect() {
  const [recollectView, setRecollectView] = useState(false);
  const [data, setData] = useState(fakeData);

  const recollectViewHandler = () => {
    setRecollectView(!recollectView);
  };

  return (
    <>
      {recollectView ? (
        <>
          <ToCollectBtn viewHandler={recollectViewHandler} />
          <Recollect />
          {/* Todo: unreadBookmarks를 걸러낸 후 프롭스로 전달 */}
        </>
      ) : (
        <>
          <div className="collectview">
            <Sidebar />
            <div className="collectview__right">
              <div className="collectview__title">collect</div>
              <div className="collectview__nav">
                <UnreadAlarm viewHandler={recollectViewHandler} />
                <SearchBar />
              </div>
              <BookmarksContainer data={data} />
            </div>
          </div>
          <BottomPopup />
        </>
      )}
    </>
  );
}
