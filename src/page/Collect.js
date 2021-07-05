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
