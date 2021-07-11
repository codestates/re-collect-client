import React from "react";
import { useSelector } from "react-redux";
import BigBookmark from "../components/BigBookmark";

export function SearchBookmark({ searchInput }) {
  const { bookmarks } = useSelector(
    (state) => state.getBookmarkReducer.userBookmarks
  );

  const searchingBookmark = bookmarks.filter((el) =>
    el.text.includes(searchInput)
  );

  return (
    <div className="searching">
      <div className="searching__bookmarks">
        {searchingBookmark.map((bookmark) => (
          <BigBookmark
            // style={{ width: `150px` }}
            id={bookmark.id}
            text={bookmark.text}
            color={bookmark.color}
            importance={bookmark.importance}
          />
        ))}
      </div>
    </div>
  );
}
