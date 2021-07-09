const initialState = {
  user: {
    isLogin: false,
    error: null,
  },

  tempBookmark: {
    isEdit: false,
    isLoading: false,
    data: null,
    error: null,
  },

  guestBookmarks: {
    id: 3,
    category: ['카테고리를 추가하세요'],
    bookmarks: [
      {
        category: '카테고리를 추가하세요 ',
        id: 0,
        text: '새로운 북마크를 추가하세요 1',
        url: 'https://www.google.com/',
        color: '#214bc8',
        importance: 1,
        visitCounts: 1,
      },
      {
        category: '카테고리를 추가하세요 ',
        id: 1,
        text: '새로운 북마크를 추가하세요 2',
        url: 'https://www.google.com/',
        color: '#214bc8',
        importance: 1,
        visitCounts: 0,
      },
      {
        category: '카테고리를 추가하세요 ',
        id: 2,
        text: '새로운 북마크를 추가하세요 3',
        url: 'https://www.google.com/',
        color: '#214bc8',
        importance: 1,
        visitCounts: 0,
      },
    ],
    reducedbookmarks: [
      {
        category: '카테고리를 추가하세요',
        bookmarks: [
          {
            category: '카테고리를 추가하세요 ',
            id: 0,
            text: '새로운 북마크를 추가하세요 1',
            url: 'https://www.google.com/',
            color: '#214bc8',
            importance: 1,
            visitCounts: 1,
          },
          {
            category: '카테고리를 추가하세요 ',
            id: 1,
            text: '새로운 북마크를 추가하세요 2',
            url: 'https://www.google.com/',
            color: '#214bc8',
            importance: 1,
            visitCounts: 0,
          },
          {
            category: '카테고리를 추가하세요 ',
            id: 2,
            text: '새로운 북마크를 추가하세요 3',
            url: 'https://www.google.com/',
            color: '#214bc8',
            importance: 1,
            visitCounts: 0,
          },
        ],
      },
    ],
  },

  users: [1, 2, 3],

  userBookmarks: {
    category: [],
    bookmarks: [],
    reducedbookmarks: [],
    error: null,
  },
};
export default initialState;
