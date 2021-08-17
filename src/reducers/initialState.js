const initialState = {
  tempBookmark: {
    isEdit: false,
    isLoading: false,
    data: null,
    error: null,
  },

  guestBookmarks: {
    bookmarkId: 3,
    category: { 0: "카테고리를 추가하세요" },
    bookmarks: [
      {
        category: "카테고리를 추가하세요",
        categoryId: 0,
        id: 0,
        text: "새로운 북마크를 추가하세요 1",
        url: "https://www.google.com/",
        importance: 1,
        color: "#214bc8",
        visitCounts: 1,
        position: 1,
      },
      {
        category: "카테고리를 추가하세요",
        categoryId: 0,
        id: 1,
        text: "새로운 북마크를 추가하세요 2",
        url: "https://www.google.com/",
        importance: 1,
        color: "#214bc8",
        visitCounts: 1,
        position: 2,
      },
      {
        category: "카테고리를 추가하세요",
        categoryId: 0,
        id: 2,
        text: "새로운 북마크를 추가하세요 3",
        url: "https://www.google.com/",
        importance: 1,
        color: "#214bc8",
        visitCounts: 1,
        position: 3,
      },
    ],
    reducedbookmarks: [
      {
        id: 0,
        title: "카테고리를 추가하세요",
        bookmarks: [
          {
            category: "카테고리를 추가하세요",
            categoryId: 0,
            id: 0,
            text: "새로운 북마크를 추가하세요 1",
            url: "https://www.google.com/",
            importance: 1,
            color: "#214bc8",
            visitCounts: 1,
            position: 1,
          },
          {
            category: "카테고리를 추가하세요",
            categoryId: 0,
            id: 1,
            text: "새로운 북마크를 추가하세요 2",
            url: "https://www.google.com/",
            importance: 1,
            color: "#214bc8",
            visitCounts: 1,
            position: 2,
          },
          {
            category: "카테고리를 추가하세요",
            categoryId: 0,
            id: 2,
            text: "새로운 북마크를 추가하세요 3",
            url: "https://www.google.com/",
            importance: 1,
            color: "#214bc8",
            visitCounts: 1,
            position: 3,
          },
        ],
      },
    ],
  },
  unreadBookmarks: [],
  userBookmarks: {
    reducedbookmarks: [],
    category: [],
    bookmarks: [],
    isLoading: false,
    error: null,
  },
  profile: {
    username: '',
    email: '',
    company: '',
    gitrepo: '',
    createdAt: '',
    recollectcount: 0,
    favorite: {
      category: '카테고리를 추가하세요',
      categoryId: null,
      bookmarkId: 0,
      text: '새로운 북마크를 추가하세요',
      url: '',
      importance: 0,
      color: '#214bc8',
      visitCounts: 0,
    },
    error: null,
  },
};
export default initialState;
