import GET_NEW_TOKEN from "../actions/getNewToken";

export const getNewToken = (action) => {
  switch (action.type) {
    case GET_NEW_TOKEN:
      const newAccessToken = action.payload;
      localStorage.setItem(`accessToken`, newAccessToken);
      return;
    default:
      return;
  }
};
