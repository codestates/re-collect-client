import React, { useEffect } from 'react';
import BigBookmark from './BigBookmark';
import { useSelector, useDispatch } from 'react-redux';
import { recollect } from '../actions/getRecollect';

function Recollect() {
  const { bookmarks } = useSelector(
    (state) => state.bookmarkReducer.userBookmarks
  );
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');
  const { unreadBookmarks } = useSelector((state) => state.recollectReducer);

  useEffect(() => {
    if (accessToken) {
      dispatch(recollect(bookmarks));
    }
  }, []);

  return (
    <div className="recollect">
      <div className="recollect__title">Recollect</div>
      <div className="recollect__bookmarks">
        {unreadBookmarks.length !== 0 ? (
          unreadBookmarks.map((unread) => {
            return (
              <BigBookmark
                key={unread.id}
                text={unread.text}
                color={unread.color}
                importance={unread.importance}
                id={unread.id}
                url={unread.url}
              />
            );
          })
        ) : (
          <div className="recollect__skeleton">
            <img src="logo_cut.png" className="logoPng" />
            <p>리콜렉트할 북마크가 없어요!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Recollect;
