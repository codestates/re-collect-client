import { initialState } from "./initialState";

export const GET_INFO = "GET_INFO";

// Action
export const getExploreInfo = (data) => {
  return {
    type: GET_INFO,
    payload: {
      users: data.users,
    },
  };
};

// Reducer
export const getExploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INFO":
      return Object.assign({}, state, {
        users: action.payload,
      });
    default:
      return null;
  }
};

// export default getExploreReducer;

// 데이터 받을때에는 그냥 authorization만
// 요청 보낼때만 토큰에 Bearer 부쳐서 보내기

// Todo
// 1. localStrage
// 2. redux
// 3. unreadBookmark 구현
// 4 .search 구현하기 (먼저 찾아보기)
// 3. node mailer 읽어보기
