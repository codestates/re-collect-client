const initialState = {
  tempBookmark: {
    isEdit: false,
    isLoading: false,
    data: null,
    error: null,
  },

  guestBookmarks: {
    bookmarkId: 3,
    categoryId: 1,
    category: ['카테고리를 추가하세요'],
    bookmarks: [
      {
        categoryId: 0,
        bookmarkId: 0,
        text: '새로운 북마크를 추가하세요 1',
        url: 'https://www.google.com/',
        importance: 1,
        color: '#214bc8',
        visitCounts: 1,
        position: 1,
      },
      {
        categoryId: 0,
        bookmarkId: 1,
        text: '새로운 북마크를 추가하세요 2',
        url: 'https://www.google.com/',
        importance: 1,
        color: '#214bc8',
        visitCounts: 1,
        position: 2,
      },
      {
        categoryId: 0,
        bookmarkId: 2,
        text: '새로운 북마크를 추가하세요 3',
        url: 'https://www.google.com/',
        importance: 1,
        color: '#214bc8',
        visitCounts: 1,
        position: 3,
      },
    ],
    reducedbookmarks: [
      {
        id: 0,
        title: '카테고리를 추가하세요',
        bookmarks: [
          {
            categoryId: 0,
            bookmarkId: 0,
            text: '새로운 북마크를 추가하세요 1',
            url: 'https://www.google.com/',
            importance: 1,
            color: '#214bc8',
            visitCounts: 1,
            position: 1,
          },
          {
            categoryId: 0,
            bookmarkId: 1,
            text: '새로운 북마크를 추가하세요 2',
            url: 'https://www.google.com/',
            importance: 1,
            color: '#214bc8',
            visitCounts: 1,
            position: 2,
          },
          {
            categoryId: 0,
            bookmarkId: 2,
            text: '새로운 북마크를 추가하세요 3',
            url: 'https://www.google.com/',
            importance: 1,
            color: '#214bc8',
            visitCounts: 1,
            position: 3,
          },
        ],
      },
    ],
  },

  unreadBookmarks: null,
  userBookmarks: {
    isLoading: false,
    category: [],
    bookmarks: [],
    reducedbookmarks: [],
    error: null,
  },
};
export default initialState;
