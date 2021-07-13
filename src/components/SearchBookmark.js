import React from "react";
import { useSelector } from "react-redux";
import BigBookmark from "../components/BigBookmark";

export function SearchBookmark({ searchInput }) {
  const { bookmarks } = useSelector(
    (state) => state.bookmarkReducer.userBookmarks
  );

  const searchingBookmark = bookmarks.filter((el) =>
    el.text.includes(searchInput)
  );

  return (
    <div className="searching">
      <div className="searching__bookmarks">
        {searchingBookmark.length !== 0 ? (
          searchingBookmark.map((bookmark) => (
            <BigBookmark
              id={bookmark.id}
              text={bookmark.text}
              color={bookmark.color}
              importance={bookmark.importance}
            />
          ))
        ) : (
          <div className="skeleton">
            <p>검색어와 일치하는 북마크가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
