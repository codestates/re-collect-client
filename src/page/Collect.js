import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import UnreadAlarm from '../components/UnreadAlarm';
import BottomPopup from '../components/BottomPopup';
import Recollect from '../components/Recollect';
import ToCollectBtn from '../components/ToCollectBtn';
import BookmarksContainer from '../components/BookmarksContainer';
import { SearchBookmark } from '../components/SearchBookmark';
import CategoryEditModal from '../components/CategoryEditModal';

export default function Collect() {
  const { isCategoryEdit } = useSelector((state) => state.categoryReducer);
  const [categoryEdit, setCategoryEdit] = useState(false);
  const [recollectView, setRecollectView] = useState(false);
  const [searchInput, setSearchInput] = useState('');

  ///새로고침시 최상단이동//
  useEffect(() => {
    window.onbeforeunload = function () {
      window.scrollTo(0, 0);
    };
  }, []);

  useEffect(() => {
    setCategoryEdit(isCategoryEdit);
  }, [isCategoryEdit]);

  const recollectViewHandler = () => {
    setRecollectView(!recollectView);
  };

  return (
    <>
      {categoryEdit && <CategoryEditModal />}
      {/* 검색어 입력수가 0이 아닌경우, 검색어와 일치하는 북마크 랜딩  */}
      {recollectView ? (
        <>
          <ToCollectBtn viewHandler={recollectViewHandler} />
          <Recollect />
        </>
      ) : (
        <>
          <div className='collectview'>
            <Sidebar />
            <div className='collectview__right'>
              <div className='collectview__title'>collect</div>
              <div className='collectview__nav'>
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
