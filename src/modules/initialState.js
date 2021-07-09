import { faLessThanEqual } from '@fortawesome/free-solid-svg-icons';

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
    id: 0,
    category: [],
    bookmarks: [],
    reducedbookmarks: [],
  },

  users: [1, 2, 3],
  profile: {
    username: 'init유저네임',
    password: '패스워드',
    email: 'initial@recollect.today',
    company: 'Developer at Team Collector',
    gitRepo: 'github.com/re-collect',
    created_at: '2021.07.07',
  },
};
export default initialState;
