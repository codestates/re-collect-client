export const reducebookmark = (state, action) => {
  const arr = action.category.map((ctgry) => {
    return { category: ctgry, bookmarks: [] };
  });

  arr.map((el) => {
    action.bookmarks.map((bookmarkEl) => {
      if (el.category === bookmarkEl.category) {
        el.bookmarks.push(bookmarkEl);
      }
    });
  });

  return {
    ...state,
    userBookmarks: {
      ...state.userBookmarks,
      isLoading: false,
      category: action.category,
      bookmarks: action.bookmarks,
      reducedbookmarks: arr,
    },
  };
};
