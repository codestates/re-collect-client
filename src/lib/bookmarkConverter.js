export default function bookmarkConverter(bookmark, isGuest, getState) {
  const category =
    bookmark.category === '' ? '카테고리미지정' : bookmark.category.value;
  const color = bookmark.color === '' ? '#214bc8' : bookmark.color;
  const importance = bookmark.importance ? 1 : 0;

  if (isGuest) {
    let { id } = getState().addBookmarkReducer.guestBookmarks;

    return {
      ...bookmark,
      id: id,
      category,
      color,
      importance,
      visitCounts: 0,
    };
  }

  return {
    ...bookmark,
    category,
    color,
    importance,
  };
}
