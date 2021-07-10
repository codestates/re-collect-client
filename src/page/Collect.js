import React, { useState, useEffect, useRef } from 'react';
import CategoryBox from '../components/CategoryBox';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import UnreadAlarm from '../components/UnreadAlarm';
import BottomPopup from '../components/BottomPopup';
import Recollect from '../components/Recollect';
import ToCollectBtn from '../components/ToCollectBtn';
import BookmarksContainer from '../components/BookmarksContainer';

import { getBookmark } from '../modules/getBookmark';
import { useSelector, useDispatch } from 'react-redux';
import { recollect } from '../modules/getRecollect';

export default function Collect() {
  const [recollectView, setRecollectView] = useState(false);

  const dispatch = useDispatch();

  const recollectViewHandler = () => {
    setRecollectView(!recollectView);
    dispatch(recollect());
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
              <BookmarksContainer />
            </div>
          </div>
          <BottomPopup />
        </>
      )}
    </>
  );
}
