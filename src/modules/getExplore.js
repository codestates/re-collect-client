import initialState from "./initialState";
import axios from "axios";

export const GET_INFO = "GET_INFO";

// Action
export const getExploreInfo = () => (dispatch) => {
  axios
    .get("https://api.recollect.today/explore")
    .then((res) => {
      dispatch({
        type: GET_INFO,
        payload: {
          users: res.data.users,
        },
      });
    })
    .catch((err) => console.log("Error to get Explore info"));
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
