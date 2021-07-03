import React, { useState, useEffect, useRef } from 'react';
import CategoryBox from '../components/CategoryBox';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import UnreadAlarm from '../components/UnreadAlarm';
import BottomPopup from '../components/BottomPopup';
import Recollect from '../components/Recollect';
import ToCollectBtn from '../components/ToCollectBtn';

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
                <CategoryBox />
                <CategoryBox />
                <CategoryBox />
                <CategoryBox />
                <CategoryBox />
                <CategoryBox />
                <CategoryBox />
                <CategoryBox />
                <CategoryBox />
              </div>
            </div>
          </div>
          <BottomPopup />
        </>
      )}
    </>
  );
}
