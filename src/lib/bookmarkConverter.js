export default function bookmarkConverter(bookmark, isGuest) {
  let category;
  if (!bookmark.category.value) {
    category = bookmark.category === '' ? '카테고리 미지정' : bookmark.category;
  } else {
    category =
      bookmark.category.value === ''
        ? '카테고리 미지정'
        : bookmark.category.value;
  }

  const color = bookmark.color === '' ? '#214bc8' : bookmark.color;
  const importance = bookmark.importance ? 1 : 0;

  if (isGuest) {
    return {
      ...bookmark,
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
