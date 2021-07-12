export default function bookmarkConverter(bookmark, isGuest, isEdit) {
  const category = bookmark.category;
  const color = bookmark.color === '' ? '#214bc8' : bookmark.color;
  const importance = bookmark.importance ? 1 : 0;

  //isEdit 여부
  // -------------------------
  //카테고리에 __isNew__가 존재하고 true일때
  // categoryTitle을 보내고 categoryId는 미지정
  // -------------------------
  // 카테고리가 바뀌지 않았을 때
  // categoryTitle 과 categoryId를 둘다 보내준다

  if (isEdit) {
    const { color, importance, url, text, category, categoryId } = bookmark;
    if (category.__isNew__) {
      return {
        color,
        importance,
        url,
        text,
        categoryTitle: category.value,
      };
    }
    return {
      color,
      importance,
      url,
      text,
      categoryId,
      categoryTitle: category.value,
    };
  } else {
    const { color, importance, url, text, category } = bookmark;
    return {
      color,
      importance,
      url,
      text,
      category: category.value,
    };
  }
}
