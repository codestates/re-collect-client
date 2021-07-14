import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useInView } from 'react-intersection-observer';
import CategoryBox from './CategoryBox';
import CollectBookmark from './CollectBookmark';
import {
  getBookmark,
  getGuestBookmark,
  editBookmark,
  editGuestBookmark,
} from '../modules/bookmark';
import { dragBookmark, dragBookmarkToLast } from '../modules/dragBookmark';
import { notify } from '../modules/notification';
import { useSelector, useDispatch } from 'react-redux';

function BookmarksContainer() {
  const accessToken = localStorage.getItem('accessToken');

  const guestBookmarks = useSelector(
    (state) => state.bookmarkReducer.guestBookmarks
  );

  const reducedbookmarks = useSelector(
    (state) => state.bookmarkReducer.userBookmarks.reducedbookmarks
  );
  const dispatch = useDispatch();

  const [list, setList] = useState([]);
  const [dragging, setDragging] = useState(false);

  ///무한스크롤////
  const [loading, setLoading] = useState(true);
  const [previtems, setPrevItems] = useState(0);
  const [items, setItems] = useState(8);

  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget;
    console.log(scrollTop, 'scrolltop'); //scrollTop: 이미 스크롤된 높이(영역)
    console.log(clientHeight, 'clientheight'); //clientHeight: 눈에 보이는 높이
    console.log(scrollHeight, 'scrollheight'); //scrollHeight: 스크롤될 수 있는 collectview__bookmarks 높이

    if (scrollTop + clientHeight >= scrollHeight) {
      //setLoading(true);
      setItems(items + 4);
      console.log(items);
    }
  };

  // useEffect(() => {
  //   const loadBookmarks = async (page) => {
  //     setLoading(true);
  //     const newItems = await getBookmark();
  //     setList((prev) => [...prev, ...newItems]);
  //     setLoading(false);
  //   };

  //   loadBookmarks();
  // }, [page]);
  ///무한스크롤////

  useEffect(() => {
    if (accessToken) {
      dispatch(getBookmark());
    } else {
      setLoading(true);
      dispatch(getGuestBookmark());
    }
  }, []);

  useEffect(() => {
    if (accessToken) {
      console.log('여기서확인', reducedbookmarks);
      setList(reducedbookmarks);
    } else {
      setList(guestBookmarks.reducedbookmarks.slice(previtems, items)); //8개씩 끊어서 보여줌
      setLoading(false); //로딩 false
    }
  }, [items, reducedbookmarks, guestBookmarks]);

  // ///무한스크롤////
  //const collectViewRef = useRef('');
  const collectViewRef = useCallback((node) => {
    if (node !== null) {
      const scrollHeight = node.scrollHeight;
      console.log(scrollHeight);
    }
  }, []);
  // ///무한스크롤////

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handleDragStart = (e, item) => {
    dragItemNode.current = { target: e.target, item };
    dragItemNode.current.target.addEventListener('dragend', handleDragEnd);
    dragItem.current = item;

    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnter = (e, targetItem) => {
    if (dragItemNode.current.target === e.target) return;

    setList((oldList) => {
      //For Deep Copy
      let newList = oldList.map((grp) => {
        const newBoomarks = grp.bookmarks.map((bookmark) => ({
          ...bookmark,
        }));
        return { ...grp, bookmarks: newBoomarks };
      });

      //드래그 해온 북마크를 원래 북마크들 사이로 낑겨 넣는 역할

      newList[targetItem.grpI].bookmarks.splice(
        targetItem.itemI,
        0,
        newList[dragItem.current.grpI].bookmarks.splice(
          dragItem.current.itemI,
          1
        )[0]
      );

      dragItem.current = targetItem;

      return newList;
    });
  };

  const handleDragEnd = (e) => {
    const original = dragItemNode.current;
    const changing = dragItem.current;

    const params = {
      categoryId: changing.grp.id,
      dragId: original.item.grp.bookmarks[original.item.itemI].id,

      originalCategory: original.item.grp.title,
      changingCategory: changing.grp.title,
    };

    if (accessToken) {
      if (changing.grp.bookmarks.length === changing.itemI + 1) {
        dispatch(dragBookmarkToLast(params));
      } else {
        params.dropId = changing.grp.bookmarks[changing.itemI + 1].id;
        dispatch(dragBookmark(params));
      }
    } else {
      dispatch(notify('로그인하지 않으면 순서가 저장되지 않습니다', 2000));
    }

    setDragging(false);

    dragItem.current = null;
    dragItemNode.current.target.removeEventListener('dragend', handleDragEnd);
    dragItemNode.current = null;
  };

  const getStyles = (item) => {
    if (
      dragItem.current.grpI === item.grpI &&
      dragItem.current.itemI === item.itemI
    ) {
      return 'categorybox__bookmark current';
    }
    return 'categorybox__bookmark';
  };

  return (
    <>
      {list.length === 0 ? (
        <span className="collectview__thereIsNothingText">
          저장된 북마크가 없습니다.
          <br />
          왼쪽 추가하기 버튼을 눌러 북마크를 추가하세요
        </span>
      ) : (
        <div
          className="collectview__bookmarks"
          ref={collectViewRef}
          onScroll={handleScroll}
        >
          {' '}
          {list.map((grp, grpI) => (
            <CategoryBox
              key={grp.id}
              title={grp.title}
              dragEnterHandler={
                dragging && !grp.bookmarks.length
                  ? (e) => {
                      handleDragEnter(e, { grp, grpI, itemI: 0 });
                    }
                  : null
              }
            >
              {grp.bookmarks.map((item, itemI) => (
                <CollectBookmark
                  key={item.id}
                  className={`${
                    dragging
                      ? getStyles({ grpI, itemI })
                      : 'categorybox__bookmark'
                  }`}
                  data={{
                    item,
                    category: { value: grp.title, label: grp.title },
                  }}
                  draggable="true"
                  handleDragStart={(e) =>
                    handleDragStart(e, { grp, grpI, itemI })
                  }
                  handleDragEnter={
                    dragging
                      ? (e) => {
                          handleDragEnter(e, { grp, grpI, itemI });
                        }
                      : null
                  }
                ></CollectBookmark>
              ))}
            </CategoryBox>
          ))}
          {loading && <div className="loading">Loading ...</div>}
        </div>
      )}
    </>
  );
}

export default BookmarksContainer;
