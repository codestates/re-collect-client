import React, { useState, useEffect, useRef } from 'react';
import CategoryBox from '../components/CategoryBox';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import UnreadAlarm from '../components/UnreadAlarm';
import BottomPopup from '../components/BottomPopup';
import Recollect from '../components/Recollect';
import ToCollectBtn from '../components/ToCollectBtn';
import CollectBookmark from '../components/CollectBookmark';

export default function Collect() {
  const [recollectView, setRecollectView] = useState(false);

  const recollectViewHandler = () => {
    setRecollectView(!recollectView);
  };

  // 북마크 불러오기 → 카테고리 별로 묶고 그 안에서 또 저장된 순서대로 정렬 그리고 화면에 뿌려준다
  // 북마크 작성 ⇒ input 입력내용, category 입력내용 인식
  // 북마크 작성 정보 전송
  // 북마크 수정 정보 전송
  // 북마크 드래그앤드롭시 카테고리 변경내용, 카테고리 박스 내 순서 변경 내용 서버로 전송
  // 북마크 검색
  // 북마크 카테고리 조회
  // 안 읽은 북마크 모으기

  return (
    <>
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
                <SearchBar />
              </div>
              <div className="collectview__bookmarks">
                <CategoryBox id="box_1">
                  <CollectBookmark id="bookmark_1">
                    이것은 북마크 1 입니다.
                  </CollectBookmark>
                </CategoryBox>
                <CategoryBox id="box_2">
                  <CollectBookmark id="bookmark_2">
                    이것은 북마크 2 입니다.
                  </CollectBookmark>
                  <CollectBookmark id="bookmark_3">
                    이것은 북마크 3 입니다.
                  </CollectBookmark>
                  <CollectBookmark id="bookmark_4">
                    이것은 북마크 4 입니다.
                  </CollectBookmark>
                  <CollectBookmark id="bookmark_5">
                    이것은 북마크 5 입니다.
                  </CollectBookmark>
                </CategoryBox>
              </div>
            </div>
          </div>
          <BottomPopup />
        </>
      )}
    </>
  );
}
