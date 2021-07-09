export default function reduceBookmarkTest(bookmark, category) {
  const reducedBookmark = category.map((ctgr) => ({
    category: ctgr,
    bookmarks: [],
  }));

  reducedBookmark.map((grp) => {
    bookmark.map((bmk) => {
      if (bmk.category === grp.category) {
        grp.bookmarks.push(bmk);
      }
    });
  });

  return reducedBookmark;
}
