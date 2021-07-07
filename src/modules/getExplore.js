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
const getExploreReducer = (state = initialState, action) => {
  switch (action.type) {
    case "GET_INFO":
      return Object.assign({}, state, {
        users: action.payload,
      });
    default:
      return null;
  }
};

export default getExploreReducer;
