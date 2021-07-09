export default function bookmarkConverter(bookmark, isGuest, getState) {
  const category = bookmark.category.value;
  const color = colorConverter(bookmark.color);
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

function colorConverter(color) {
  const colorObj = {
    blue: '#214bc8',
    red: '#f24626',
    green: '#0eae61',
  };

  if (color === '') return colorObj.blue;

  return colorObj[color];
}
