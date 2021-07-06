import React, { useState, useEffect, useRef } from 'react';
import CategoryBox from './CategoryBox';
import CollectBookmark from './CollectBookmark';

function BookmarksContainer({ data }) {
  const [list, setList] = useState(data);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    setList(data);
  }, [setList, data]);

  const dragItem = useRef();
  const dragItemNode = useRef();

  const handleDragStart = (e, item) => {
    dragItemNode.current = { target: e.target, item: item };
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
    console.log('드래그 겹쳐진 녀석', dragItem.current);
    console.log('떨어진 녀석', dragItemNode.current.item);
    console.log(
      '떨어진 녀석 원래 있던곳 상태?',
      dragItemNode.current.item.grp.bookmarks
    );

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
    <div className="collectview__bookmarks">
      {list.map((grp, grpI) => (
        <CategoryBox
          key={grp.category}
          title={grp.category}
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
                dragging ? getStyles({ grpI, itemI }) : 'categorybox__bookmark'
              }`}
              url={item.url}
              color={item.color}
              importance={item.importance}
              draggable="true"
              handleDragStart={(e) => handleDragStart(e, { grp, grpI, itemI })}
              handleDragEnter={
                dragging
                  ? (e) => {
                      handleDragEnter(e, { grp, grpI, itemI });
                    }
                  : null
              }
            >
              {item.text}
            </CollectBookmark>
          ))}
        </CategoryBox>
      ))}
    </div>
  );
}

export default BookmarksContainer;
