export const initialState = {
  user: {
    username: '',
    isLogin: false,
    error: null,
  },
  tempBookmark: {
    loading: false,
    data: null,
    error: null,
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
